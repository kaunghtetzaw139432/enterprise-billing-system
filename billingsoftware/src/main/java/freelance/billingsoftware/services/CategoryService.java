package freelance.billingsoftware.services;

import java.util.List;

import freelance.billingsoftware.io.CategoryRequest;
import freelance.billingsoftware.io.CategoryResponse;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request,String imgUrl);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
