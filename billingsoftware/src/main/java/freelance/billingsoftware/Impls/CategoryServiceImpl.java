package freelance.billingsoftware.Impls;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import freelance.billingsoftware.entities.CategoryEntity;
import freelance.billingsoftware.io.CategoryRequest;
import freelance.billingsoftware.io.CategoryResponse;
import freelance.billingsoftware.repositories.CategoryRepository;
import freelance.billingsoftware.repositories.ItemRepository;
import freelance.billingsoftware.services.CategoryService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private  final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, String imgUrl) { 
        CategoryEntity newCategory = convertToEntity(request, imgUrl); 
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
     Integer itemCount=   itemRepository.countByCategoryId(newCategory.getId());
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request, String imgUrl) { 
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .imgUrl(imgUrl) 
                .build();
    }

    @Override
    @Transactional
    public void delete(String categoryId) {
        CategoryEntity category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        categoryRepository.delete(category);
    }
}