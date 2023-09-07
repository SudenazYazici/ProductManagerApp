package com.example.project.product;

import com.example.project.productCategory.ProductCategoryDTO;

import lombok.Data;

@Data
public class ProductDTO {
    
    public String id;
    public String name;
    public String detail;
    public Double price;
    public Integer amount;
    public ProductCategoryDTO productCategory;
}