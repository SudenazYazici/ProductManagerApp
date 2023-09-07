package com.example.project.operation;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.project.cashRegister.CashRegister;
import com.example.project.product.Product;

import lombok.Data;

@Data
@Document(collection = "operations")
public class Operation {
    @Id
    public String id;
    @Field
    public Product product;
    @Field
    public String type;
    @Field
    public Date date;
    @Field
    public Integer amount;
    @Field
    public CashRegister cashRegister;
}
