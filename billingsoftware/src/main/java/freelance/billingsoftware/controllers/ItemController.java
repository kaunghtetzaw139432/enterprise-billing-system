package freelance.billingsoftware.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper; 

import freelance.billingsoftware.io.ItemRequest;
import freelance.billingsoftware.io.ItemResponse;
import freelance.billingsoftware.services.ItemService;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping(consumes = { "multipart/form-data" }, value = "/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse createItem(
            @RequestParam("item") String itemJson, 
            @RequestParam(value = "image", required = false) MultipartFile file) { // file အစား image သို့ ပြောင်းထားပါသည်

        try {
            ObjectMapper mapper = new ObjectMapper();
            ItemRequest request = mapper.readValue(itemJson, ItemRequest.class);
            
            return itemService.add(request, file);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse item data: " + e.getMessage());
        }
    }

    @GetMapping("/admin/items")
    public List<ItemResponse> getAllItems() {
        return itemService.fetchItems();
    }

    @DeleteMapping("/admin/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable String itemId) {
        itemService.deleteItem(itemId);
    }
}