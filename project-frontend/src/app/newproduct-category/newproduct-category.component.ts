import { Component } from '@angular/core';
import { Message, TreeNode } from 'primeng/api';
import { ProductCategoryService } from '../product-category.service';
import { ProductCategory } from '../productCategory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newproduct-category',
  templateUrl: './newproduct-category.component.html',
  styleUrls: ['./newproduct-category.component.css']
})
export class NewproductCategoryComponent {

  categoryMap: { [id: string]: ProductCategory } = {};
  rootCategories: ProductCategory[] = [];
  
  registerForm = this.fb.group({
    name: [''],
    productCat: [null]
  })

  productCategoryId: string = "";

  productCategory: ProductCategory = new ProductCategory();

  messages: Message[] = [];

  productCategories: ProductCategory[] = [];

  visibleButton: boolean = false;

  categoryId:string | undefined;

  constructor(
    private productCategoryService: ProductCategoryService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
       name: ['', [Validators.required, Validators.maxLength(30)] ],
       productCat: [null ]
    });
  }

  ngOnInit() {
    this.productCategoryId = this.route.snapshot.paramMap.get("id") ?? "";

    if (this.productCategoryId != "") {
      this.findProductCategory();
      this.visibleButton = true;
    }
    
    this.loadProducts();
  }

  findProductCategory() {
    this.productCategoryService.search(this.productCategoryId).subscribe(res => {
      if (res != null) {
        console.log(res)
        this.productCategory = {...res}
        this.categoryId = res.productCategory?.id
        console.log(this.productCategory);
        
      } else {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Product category bulunamadı' }];
      }
    },err=> {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Beklenmedik bir hata meydana geldi' }];
    })
  }

  loadProducts() {
    this.productCategoryService.getAllProductCategory().subscribe((productCategories: ProductCategory[]) => {
    this.productCategories = productCategories;
    this.rootCategories = [];

    // Kategorileri bir haritada depolayarak hızlı erişim sağlama
    for (const category of productCategories) {
        category.children = [];
        this.categoryMap[category.id != undefined ? category.id:""] = category;

        if (!this.categoryMap[category.categoryId != undefined ? category.categoryId:""]) {
            // Kök düğüme eklenmeyen alt kategoriler
            this.rootCategories.push(category);
        }
    }
    console.log(this.rootCategories);
    

    // Parent-child ilişkilerini kurma
    for (const category of productCategories) {
        if (this.categoryMap[category.categoryId != undefined ? category.categoryId:""]) {
          if(this.categoryMap[category.categoryId != undefined ? category.categoryId:""].children != undefined){
            this.categoryMap[category.categoryId != undefined ? category.categoryId:""].children?.push(category);
          } 
        }
    }
      console.log(productCategories);
    });
  }

  register() {
    this.productCategoryService.register(this.productCategory).subscribe((resultData: any) => {
      console.log(resultData);
      if (this.productCategoryId != "") {
        this.productCategory = new ProductCategory();
      }
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Added Successfully' }];
    });
  }

  UpdateRecords() {
    console.log(this.productCategory);
    
    this.productCategoryService.UpdateRecords(this.productCategoryId, this.productCategory).subscribe((resultData: any) => {
      console.log(resultData);

      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Updated Successfully' }];
    });
  }

  save() {
    this.productCategory.categoryId = this.categoryId
    if (this.productCategoryId == "") {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }

  reloadPage() { // if reloaded, the message ('Product Category Added Successfully') is not shown
    window.location.reload();
  }

  

}
