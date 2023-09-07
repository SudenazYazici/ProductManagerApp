package com.example.project.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;

    public void saveProduct(ProductDTO productDTO) {
        Product product = ProductMapperIMPL.toDocument(productDTO);
        productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> listAll() {
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : this.productRepository.findAll()) {
            ProductDTO productDTO = new ProductDTO();
            productDTO = ProductMapperIMPL.toDTO(product);
            
            productDTOs.add(productDTO);
        }
        return productDTOs;
    }

    public ProductDTO getProductById(String id) {
        Optional<Product> optional = productRepository.findById(id);
        if(optional.isPresent()){
            return ProductMapperIMPL.toDTO(optional.get());
        }
        return null;
    }

    public Double updateProductPrice(String id, Double price) {
        Optional<Product> optional = productRepository.findById(id);
        if(optional.isPresent()) {
            Product product = optional.get();
            Double currentPrice = product.getPrice();
            Double updatedPrice = currentPrice + price;
            product.setPrice(updatedPrice);
            productRepository.save(product);
            return updatedPrice;
        }
        return null;
        
    }

    public Integer updateProductAmount(String id, Integer amount) {
        Optional<Product> optional = productRepository.findById(id);
        if (optional.isPresent()) {
            Product product = optional.get();
            Integer currentAmount = product.getAmount();
            Integer updatedAmount = currentAmount + amount;
            product.setAmount(updatedAmount);
            productRepository.save(product);
            return updatedAmount;
        }
        return null;
    }
    
}
