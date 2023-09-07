package com.example.project.operation;

import com.example.project.cashRegister.CashRegisterMapperIMPL;
import com.example.project.product.ProductMapperIMPL;

public class OperationMapperIMPL {
    
    public static OperationDTO toDTO(Operation operation) {
        OperationDTO operationDTO = new OperationDTO();

        operationDTO.setId(operation.getId());
        operationDTO.setProduct(ProductMapperIMPL.toDTO(operation.getProduct()));
        operationDTO.setType(operation.getType());
        operationDTO.setDate(operation.getDate());
        operationDTO.setAmount(operation.getAmount());
        operationDTO.setCashRegister(CashRegisterMapperIMPL.toDTO(operation.getCashRegister()));
        
        return operationDTO;
    }

    public static Operation toDocument(OperationDTO operationDTO) {
        Operation operation = new Operation();

        operation.setId(operationDTO.getId());
        operation.setProduct(ProductMapperIMPL.toDocument(operationDTO.getProduct()));
        operation.setType(operationDTO.getType());
        operation.setDate(operationDTO.getDate());
        operation.setAmount(operationDTO.getAmount());
        operation.setCashRegister(CashRegisterMapperIMPL.toDocument(operationDTO.getCashRegister()));
        
        return operation;
    }
}
