package com.example.project.cashRegister;

public class CashRegisterMapperIMPL {

    public static CashRegisterDTO toDTO(CashRegister cashRegister) {
        CashRegisterDTO cashRegisterDTO = new CashRegisterDTO();

        cashRegisterDTO.setId(cashRegister.getId());
        cashRegisterDTO.setName(cashRegister.getName());
        cashRegisterDTO.setBalance(cashRegister.getBalance());

        return cashRegisterDTO;
    }

    public static CashRegister toDocument(CashRegisterDTO cashRegisterDTO) {
        CashRegister cashRegister = new CashRegister();

        cashRegister.setId(cashRegisterDTO.getId());
        cashRegister.setName(cashRegisterDTO.getName());
        cashRegister.setBalance(cashRegisterDTO.getBalance());

        return cashRegister;
    }
    
}
