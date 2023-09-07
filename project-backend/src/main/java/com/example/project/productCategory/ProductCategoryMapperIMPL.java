package com.example.project.productCategory;

public class ProductCategoryMapperIMPL {
    public static ProductCategoryDTO toDTO(ProductCategory productCategory) {
        ProductCategoryDTO productCategoryDTO = new ProductCategoryDTO();

        productCategoryDTO.setId(productCategory.getId());
        productCategoryDTO.setName(productCategory.getName());
        productCategoryDTO.setCategoryId(productCategory.getCategoryId());

        return productCategoryDTO;
    }

    public static ProductCategory toDocument(ProductCategoryDTO productCategoryDTO) {
        ProductCategory productCategory = new ProductCategory();

        productCategory.setId(productCategoryDTO.getId());
        productCategory.setName(productCategoryDTO.getName());
        productCategory.setCategoryId(productCategoryDTO.getCategoryId());

        return productCategory;
    }
    
}
