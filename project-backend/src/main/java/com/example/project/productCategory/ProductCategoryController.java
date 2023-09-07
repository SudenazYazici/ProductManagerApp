package com.example.project.productCategory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/category")
public class ProductCategoryController {
    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping("/getall")
    List<ProductCategoryDTO> getAllProductCategories() {
        return  productCategoryService.listAll();
    }

    @PostMapping("/save")
    private String saveProductCategory(@RequestBody ProductCategoryDTO productCategoryDTO) {
        productCategoryService.saveProductCategory(productCategoryDTO);
        return productCategoryDTO.getId();
    }

    @GetMapping("/delete/{id}")
    private void removeCategory(@PathVariable("id") String id) {
        productCategoryService.deleteProductCategory(id);
    }

    @GetMapping("/search/{id}")
    private ProductCategoryDTO getProductCategory(@PathVariable(name = "id") String id) {
        return productCategoryService.getProductCategoryById(id);
    }

    @PostMapping("/update/{id}")
    private ProductCategory update(@RequestBody ProductCategoryDTO productCategory, @PathVariable(name = "id") String id) {
        productCategory.setId(id);
        productCategoryService.saveProductCategory(productCategory);
        return ProductCategoryMapperIMPL.toDocument(productCategory);
    }
    
}
