package com.example.project.product;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.project.productCategory.ProductCategory;

import lombok.Data;

@Data
@Document(collection = "products")
public class Product {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public String detail;
    @Field
    public Double price;
    @Field
    public Integer amount;
    @Field
    @DBRef
    public ProductCategory productCategory;
}
