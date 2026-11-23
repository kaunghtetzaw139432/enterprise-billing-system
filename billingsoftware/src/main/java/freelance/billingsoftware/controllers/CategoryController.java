package freelance.billingsoftware.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import freelance.billingsoftware.io.CategoryRequest;
import freelance.billingsoftware.io.CategoryResponse;
import freelance.billingsoftware.services.CategoryService;
import freelance.billingsoftware.services.FileStorageService;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final FileStorageService fileStorageService;

    @GetMapping("/admin/categories")
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> getAllCategories() {
        return categoryService.read();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("bgColor") String bgColor,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) throws IOException {

        String imgUrls = null;
        if (images != null && !images.isEmpty()) {
            imgUrls = fileStorageService.saveMultipleFiles(images);
        }

        CategoryRequest categoryRequest = CategoryRequest.builder()
                .name(name)
                .description(description)
                .bgColor(bgColor)
                .build();
        return categoryService.add(categoryRequest, imgUrls);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found");
        }
    }
}