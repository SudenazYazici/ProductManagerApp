package com.example.project.productCategory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryService {
    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public void saveProductCategory(ProductCategoryDTO productCategoryDTO) {
        ProductCategory productCategory = ProductCategoryMapperIMPL.toDocument(productCategoryDTO);
        productCategoryRepository.save(productCategory);
    }

    public void deleteProductCategory(String id) {
        productCategoryRepository.deleteById(id);
    }

    public List<ProductCategoryDTO> listAll() {
        List<ProductCategoryDTO> productCategoryDTOS = new ArrayList<>();
        for (ProductCategory productCategory : this.productCategoryRepository.findAll()) {
            ProductCategoryDTO productCategoryDTO = new ProductCategoryDTO();
            productCategoryDTO = ProductCategoryMapperIMPL.toDTO(productCategory);
            if(productCategoryDTO.categoryId != null){
                ProductCategoryDTO headProductCategoryDTO = getProductCategoryById(productCategory.categoryId);
                productCategoryDTO.setProductCategory(headProductCategoryDTO);
            }
            productCategoryDTOS.add(productCategoryDTO);
        }
        return productCategoryDTOS;
    }

    public ProductCategoryDTO getProductCategoryById(String id) {
        ProductCategoryDTO productCategoryDTO = ProductCategoryMapperIMPL.toDTO(productCategoryRepository.findById(id).get());
        if(productCategoryDTO.getCategoryId() != null){
        productCategoryDTO.setProductCategory(ProductCategoryMapperIMPL.toDTO(productCategoryRepository.findById(productCategoryDTO.getCategoryId()).get()));
    }
        return productCategoryDTO;
    }
    
}
