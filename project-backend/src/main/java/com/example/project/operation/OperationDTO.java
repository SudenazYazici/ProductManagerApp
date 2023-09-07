package com.example.project.operation;

import java.util.Date;

import com.example.project.cashRegister.CashRegisterDTO;
import com.example.project.product.ProductDTO;

import lombok.Data;

@Data
public class OperationDTO {
    public String id;
    public ProductDTO product;
    public String type;
    public Date date;
    public Integer amount;
    public CashRegisterDTO cashRegister;
    
}
