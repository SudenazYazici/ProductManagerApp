package com.example.project.productCategory;

import lombok.Data;

@Data
public class ProductCategoryDTO {
    public String id;
    public String name;
    public String categoryId;
    public ProductCategoryDTO productCategory;
    
}
