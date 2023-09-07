package com.example.project.cashRegister;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cashregister")
public class CashRegisterController {
    @Autowired
    private CashRegisterService cashRegisterService;

    @GetMapping("/getall")
    List<CashRegisterDTO> getAllCashRegisters() {
        return cashRegisterService.listAll();
    }

    @PostMapping("/save")
    private String saveCashRegister(@RequestBody CashRegisterDTO cashRegisterDTO) {
        cashRegisterService.saveCashRegister(cashRegisterDTO);
        return cashRegisterDTO.getId();
    }

    @GetMapping("/delete/{id}")
    private void deleteCashRegister(@PathVariable("id") String id) {
        cashRegisterService.deleteCashRegister(id);
    }

    @GetMapping("/search/{id}")
    private CashRegisterDTO getCashRegister(@PathVariable(name = "id") String id) {
        return cashRegisterService.getCashRegisterById(id);
    }

    @PostMapping("/updatebalance/{id}")
    private Double updateCashRegisterBudget(@PathVariable(name = "id") String id, @RequestParam Double balance) {
        return cashRegisterService.updateCashRegisterBalance(id, balance);
    }

    @PostMapping("/update/{id}")
    private CashRegister update(@RequestBody CashRegisterDTO cashRegister, @PathVariable(name = "id") String id) {
        cashRegister.setId(id);
        cashRegisterService.saveCashRegister(cashRegister);
        return CashRegisterMapperIMPL.toDocument(cashRegister);
    }
    
}
