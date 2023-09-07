import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductCategory } from '../productCategory';
import { ConfirmEventType, ConfirmationService, Message, MessageService } from 'primeng/api';
import { ProductCategoryService } from '../product-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  tempId: string = "";

  registerForm = this.fb.group({
    name: [''],
    detail: [''],
    price: [''],
    amount: [''],
    productCategory: [null]
  })

  ProductArray : Product[] = [];

  ProductCategoryArray : ProductCategory[] = [];

  name: string = "";
  detail: string = "";
  price: number | null = null;
  amount: number | null = null;
  productCategory: ProductCategory | null = null;

  currentID = "";

  visible:boolean = false

  messages: Message[]=[];

  productCategories: ProductCategory[] = [];
  selectedProductCategory: ProductCategory =this.productCategories[0];

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((data: any) => {
      this.ProductArray = data;
  });

  this.productCategoryService.getAllProductCategory().subscribe((data: any) => {
    this.ProductCategoryArray = data;
});
  this.loadProducts();
  }

  loadProducts() {
    this.productCategoryService.getAllProductCategory().subscribe((productCategories: ProductCategory[]) => {
      this.productCategories = productCategories;
    });
  }

  constructor(private productService: ProductService,
     private productCategoryService: ProductCategoryService,
     private confirmationService: ConfirmationService,
     private messageService: MessageService,
     private fb: FormBuilder,
     private router: Router) {
    this.getAllProduct();
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
       name: ['', [Validators.required, Validators.maxLength(30)] ],
       detail: ['', [Validators.required, Validators.maxLength(30)] ],
       price: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
       amount: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")]) ],
       productCategory: [null, Validators.required ]
    });
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(ProductArray => {
      this.ProductArray = this.ProductArray
      console.log(ProductArray);
    })
  }
  
  register()
  {
  
    let bodyData = {
      "name" : this.name,
      "detail" : this.detail,
      "price" : this.price,
      "amount" : this.amount,
      "productCategory" : this.productCategory
    };
 
    this.productService.register(bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllProduct();
 
        this.name = '';
        this.detail = '';
        this.price = null;
        this.amount = null;
        this.productCategory = null;
    });
  }

  setUpdate(data: any)
  {
   this.name = data.name;
   this.detail = data.detail;
   this.price = data.price;
   this.amount = data.amount;

   var index = this.productCategories.findIndex(x => x.name === data.productCategory.name);
   this.productCategory = this.productCategories[index];
   
   this.currentID = data.id;
   this.visible = !this.visible
   
  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "detail" : this.detail,
      "price" : this.price,
      "amount" : this.amount,
      "productCategory" : this.productCategory
    };

    /* if((this.name.length>30)){ // page reloads
      this.messages = [{ severity: 'warn', summary: 'Warning', detail: 'Product name can not be more than 30 characters!' }];
      return;
    }

    if((this.detail.length>30)){
      this.messages = [{ severity: 'warn', summary: 'Warning', detail: 'Product detail can not be more than 30 characters!' }];
      return;
    } */
    
    this.productService.UpdateRecords( this.currentID , bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllProduct();
 
        this.name = '';
        this.detail = '';
        this.price = null;
        this.amount = null;
        this.productCategory = null;
    });
  }

  update(data: any) {
    this.tempId = data.id;
    this.productService.search(data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
    });

    this.name = data.name;
   this.detail = data.detail;
   this.price = data.price;
   this.amount = data.amount;

   var index = this.productCategories.findIndex(x => x.name === data.productCategory.name);
   this.productCategory = this.productCategories[index];
   
   this.currentID = data.id;

    this.router.navigate(['/newproduct'], {
      queryParams: {
        tempId: this.tempId,
        name: this.name,
        detail: this.detail,
        price: this.price,
        amount: this.amount,
        productCategory: this.productCategory

      }
    });
  }

  save()
  {
    if(this.currentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
       this.currentID = '';
       //this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Updated Successfully' }];
      }      
  }
 

  delete(product: Product):void
  {
    this.ProductArray = this.ProductArray.filter(h => h !== product);

    this.productService.delete(product.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllProduct();
    });

    this.name = '';
    this.detail = '';
    this.price = null;
    this.amount = null;
    this.productCategory = null;

    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Deleted Successfully' }];
  }

  reloadPage() {
    window.location.reload();
 }

 confirm(product: Product) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(product)
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          return;
      },
      reject: () => {
        
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
        return;
      }
  });
}

}
