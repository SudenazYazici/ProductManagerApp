import { Component } from '@angular/core';

import { ProductCategory } from "../productCategory";
import { ProductService } from '../product.service';
import { Message } from 'primeng/api';
import { ProductCategoryService } from '../product-category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {

  registerForm = this.fb.group({
    name: [''],
    detail: [''],
    price: [''],
    amount: [''],
    productCategory: [null]
  })

  messages: Message[] = [];
  productCategories: ProductCategory[] = [];

  productId: string = "";
  selectedCategory: ProductCategory | undefined;

  product: Product = new Product();
  product2: Product = new Product();

  visibleButton: boolean = false;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      detail: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      amount: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      productCategory: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id") ?? "";

    if (this.productId != "") {
      this.findProduct();
      this.visibleButton = true;
    }

    this.loadProductCategories();
  }

  findProduct() {
    this.productService.search(this.productId).subscribe(res => {
      if (res != null) {
        this.product = res
      } else {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Product bulunamadı' }];
      }
    },err=> {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Beklenmedik bir hata meydana geldi' }];
    })
  }

  loadProductCategories() {
    this.productCategoryService.getAllProductCategory().subscribe((categories: ProductCategory[]) => {
      this.productCategories = categories;
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    this.productService.register(this.product).subscribe((resultData: any) => {
      console.log(resultData);
      if (this.productId != "") {
        this.product = new Product();
      }
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Added Successfully' }];
    });
  }

  UpdateRecords() {
    this.productService.UpdateRecords(this.productId, this.product).subscribe((resultData: any) => {
      console.log(resultData);

      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Updated Successfully' }];
    });
  }

  save() {
    console.log(this.product);
    if (this.productId == "") {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }

  /* asd(){
    this.product2 = {...this.product} // product ı kopyalıyo
    this.product2 = this.product // product ın adresini alıyo

    this.product2.name = "mkdsaködasnfö"
  } */

}
