package com.example.project.cashRegister;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CashRegisterService {

    private CashRegisterRepository cashRegisterRepository;

    public void saveCashRegister(CashRegisterDTO cashRegisterDTO) {
        CashRegister cashRegister = CashRegisterMapperIMPL.toDocument(cashRegisterDTO);
        cashRegisterRepository.save(cashRegister);
    }

    public void deleteCashRegister(String id) {
        cashRegisterRepository.deleteById(id);
    }

    public List<CashRegisterDTO> listAll() {
        List<CashRegisterDTO> cashRegisterDTOs = new ArrayList<>();
        for (CashRegister cashRegister : this.cashRegisterRepository.findAll()) {
            CashRegisterDTO cashRegisterDTO = new CashRegisterDTO();
            cashRegisterDTO = CashRegisterMapperIMPL.toDTO(cashRegister);
            
            cashRegisterDTOs.add(cashRegisterDTO);
        }
        return cashRegisterDTOs;
    }

    public CashRegisterDTO getCashRegisterById(String id) {
        Optional<CashRegister> optional = cashRegisterRepository.findById(id);
        if(optional.isPresent()){
            return CashRegisterMapperIMPL.toDTO(optional.get());
        }
        return null;
    }

    public Double updateCashRegisterBalance(String id, Double balance) {
        Optional<CashRegister> optional = cashRegisterRepository.findById(id);
        if (optional.isPresent()) {
            CashRegister cashRegister = optional.get();
            Double currentBalance = cashRegister.getBalance();
            Double updatedBalance = currentBalance + balance;
            cashRegister.setBalance(updatedBalance);
            cashRegisterRepository.save(cashRegister);
            return updatedBalance;
        }
        return null;
    }

}
