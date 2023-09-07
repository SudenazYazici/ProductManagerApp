package com.example.project.operation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.cashRegister.CashRegisterRepository;
import com.example.project.product.ProductRepository;

@Service
public class OperationService {
    @Autowired
    private OperationRepository operationRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CashRegisterRepository cashRegisterRepository;

    public void saveOperation(OperationDTO operationDTO) {
        Operation operation = OperationMapperIMPL.toDocument(operationDTO);
        operationRepository.save(operation);
    }

    public void deleteOperation(String id) {
        operationRepository.deleteById(id);
    }
    
    public List<OperationDTO> listAll() {
        List<OperationDTO> operationDTOs = new ArrayList<>();
        for (Operation operation : this.operationRepository.findAll()) {
            OperationDTO operationDTO = new OperationDTO();
            operationDTO = OperationMapperIMPL.toDTO(operation);
            
            operationDTOs.add(operationDTO);
        }
        return operationDTOs;
    }

    public OperationDTO getOperationById(String id) {
        Optional<Operation> optional = operationRepository.findById(id);
        if(optional.isPresent()){
            return OperationMapperIMPL.toDTO(optional.get());
        }
        return null;
    }

    public String buyProduct(OperationDTO operationDTO) {
        Operation operation = OperationMapperIMPL.toDocument(operationDTO);
        if ( operation.getProduct().getPrice() * operation.getAmount() > operation.getCashRegister().getBalance()) {
            return "The balance is not enough!";
        }
        operation.getProduct().setAmount(operation.getProduct().getAmount() + operation.getAmount());
        operation.getCashRegister().setBalance(operation.getCashRegister().getBalance() - operation.getProduct().getPrice() * operation.getAmount());
        productRepository.save(operation.getProduct());
        cashRegisterRepository.save(operation.getCashRegister());
        operationRepository.save(operation);
        return "Product bought successfully.";
    }

    public String sellProduct(OperationDTO operationDTO) {
        Operation operation = OperationMapperIMPL.toDocument(operationDTO);
        if (operation.getAmount() > operation.getProduct().getAmount()) {
            return "There is not enough product!";
        }
        operation.getProduct().setAmount(operation.getProduct().getAmount() - operation.getAmount());
        operation.getCashRegister().setBalance( operation.getCashRegister().getBalance() + operation.getProduct().getPrice() * operation.getAmount());
        productRepository.save(operation.getProduct());
        cashRegisterRepository.save(operation.getCashRegister());
        operationRepository.save(operation);
        return "Product sold successfully.";
    }

    /* public boolean isValid(Product product, CashRegister cashRegister, String amount) {
        if (Integer.parseInt(amount) > product.amount) {
            return false;
        } else if ( product.price * Integer.parseInt(amount) > cashRegister.balance) {
            return false;
        }
        return true;
    } */
}
