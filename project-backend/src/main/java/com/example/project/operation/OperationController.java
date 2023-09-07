package com.example.project.operation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/operation")
public class OperationController {
    @Autowired
    private OperationService operationService;

    @GetMapping("/getall")
    List<OperationDTO> getAllOperations() {
        return operationService.listAll();
    }

    @PostMapping("/save")
    private String saveOperation(@RequestBody OperationDTO operationDTO) {
        operationService.saveOperation(operationDTO);
        return operationDTO.getId();
    }

    @GetMapping("/delete/{id}")
    private void deleteOperation(@PathVariable("id") String id) {
        operationService.deleteOperation(id);
    }

    @GetMapping("/search/{id}")
    private OperationDTO getOperation(@PathVariable(name = "id") String id) {
        return operationService.getOperationById(id);
    }
    
    @PostMapping("/update/{id}")
    private Operation update(@RequestBody OperationDTO operation, @PathVariable(name = "id") String id) {
        operation.setId(id);
        operationService.saveOperation(operation);
        return OperationMapperIMPL.toDocument(operation);
    }

    @PostMapping("/buyproduct")
    private void buyProduct(@RequestBody OperationDTO operation) {
        operationService.buyProduct(operation);
    }

    @PostMapping("/sellproduct")
    private void sellProduct(@RequestBody OperationDTO operation) {
        operationService.sellProduct(operation);
    }

    /* @GetMapping("/isvalid")
    private boolean isValid() {

    } */
}
