package com.example.project.product;

import com.example.project.productCategory.ProductCategoryMapperIMPL;

public class ProductMapperIMPL {
    
    public static ProductDTO toDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();

        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDetail(product.getDetail());
        productDTO.setPrice(product.getPrice());
        productDTO.setAmount(product.getAmount());
        productDTO.setProductCategory(ProductCategoryMapperIMPL.toDTO(product.getProductCategory()));

        return productDTO;
    }

    public static Product toDocument(ProductDTO productDTO) {
        Product product = new Product();

        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setDetail(productDTO.getDetail());
        product.setPrice(productDTO.getPrice());
        product.setAmount(productDTO.getAmount());
        product.setProductCategory(ProductCategoryMapperIMPL.toDocument(productDTO.getProductCategory()));

        return product;
    }
}
