package com.example.project.productCategory;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "productCategory")
public class ProductCategory {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String categoryId;
    @Field
    @DBRef
    public ProductCategory productCategory;
}
