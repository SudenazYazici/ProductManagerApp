package com.example.project.product;

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
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getall")
    List<ProductDTO> getAllProducts() {
        return productService.listAll();
    }

    @PostMapping("/save")
    private String saveProduct(@RequestBody ProductDTO productDTO) {
        productService.saveProduct(productDTO);
        return productDTO.getId();
    }

    @GetMapping("/delete/{id}")
    private void deleteProduct(@PathVariable("id") String id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/search/{id}")
    private ProductDTO getProduct(@PathVariable(name = "id") String id) {
        return productService.getProductById(id);
    }

    @PostMapping("/updateprice/{id}")
    private Double updateProductPrice(@PathVariable(name = "id") String id, @RequestParam Double price) {
        return productService.updateProductPrice(id, price);
    }

    @PostMapping("/updateamount/{id}")
    private Integer updateProductAmount(@PathVariable(name = "id") String id, @RequestParam Integer amount) {
        return productService.updateProductAmount(id, amount);
    }

    @PostMapping("/update/{id}")
    private Product update(@RequestBody ProductDTO product, @PathVariable(name = "id") String id) {
        product.setId(id);
        productService.saveProduct(product);
        return ProductMapperIMPL.toDocument(product);
    }

}
