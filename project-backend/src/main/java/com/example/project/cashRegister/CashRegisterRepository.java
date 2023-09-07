package com.example.project.cashRegister;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CashRegisterRepository extends MongoRepository<CashRegister, String>{
    
}
