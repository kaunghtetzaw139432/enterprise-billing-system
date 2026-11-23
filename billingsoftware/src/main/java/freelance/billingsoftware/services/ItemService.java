package freelance.billingsoftware.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import freelance.billingsoftware.io.ItemRequest;
import freelance.billingsoftware.io.ItemResponse;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
