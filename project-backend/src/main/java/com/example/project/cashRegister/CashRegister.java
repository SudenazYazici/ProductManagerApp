package com.example.project.cashRegister;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "safe")
public class CashRegister {
    @Id
    public String id;
    @Field
    public String name;
    @Field
    public Double balance;
}
