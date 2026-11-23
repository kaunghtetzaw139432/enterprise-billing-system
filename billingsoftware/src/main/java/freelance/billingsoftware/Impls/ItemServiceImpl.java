package freelance.billingsoftware.Impls;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import freelance.billingsoftware.entities.CategoryEntity;
import freelance.billingsoftware.entities.ItemEntity;
import freelance.billingsoftware.io.ItemRequest;
import freelance.billingsoftware.io.ItemResponse;
import freelance.billingsoftware.repositories.CategoryRepository;
import freelance.billingsoftware.repositories.ItemRepository;
import freelance.billingsoftware.services.ItemService;
import freelance.billingsoftware.services.FileStorageService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl = null;
        try {
            if (file != null && !file.isEmpty()) {
                imgUrl = fileStorageService.saveFile(file);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to save file: " + e.getMessage());
        }

        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("No category with that id"));

        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);

        newItem = itemRepository.save(newItem);
        return mapToResponse(newItem);
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {

        ItemEntity item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Item not found"));

        if (item.getImgUrl() != null && !item.getImgUrl().isEmpty()) {
            fileStorageService.deleteFile(item.getImgUrl());
        }

        itemRepository.delete(item);
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
    }

    private ItemResponse mapToResponse(ItemEntity entity) {
        return ItemResponse.builder()
                .itemId(entity.getItemId())
                .name(entity.getName())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .imgUrl(entity.getImgUrl())
                .categoryId(entity.getCategory().getCategoryId())
                .categoryName(entity.getCategory().getName())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}