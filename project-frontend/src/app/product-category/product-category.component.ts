import { Component } from '@angular/core';
import { ProductCategory } from '../productCategory';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ProductCategoryService } from '../product-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {

  tempId: string = "";

  registerForm = this.fb.group({
    name: [''],
    productCategory: [null]
  })

  ProductCategoryArray : ProductCategory[] = [];

  name: string = "";
  categoryId: string = "";
  productCategory: ProductCategory | null = null;

  currentCID = "";

  visible:boolean = false

  messages: Message[]=[];

  productCategories: ProductCategory[] = [];
  selectedProductCategory: ProductCategory | null =this.productCategories[0];

  ngOnInit(): void {
    this.productCategoryService.getAllProductCategory().subscribe((data: any) => {
      this.ProductCategoryArray = data;
  });
    this.loadProductCategories();
  }

  loadProductCategories() {
    this.productCategoryService.getAllProductCategory().subscribe((productCategories: ProductCategory[]) => {
      this.productCategories = productCategories;
    });
  }

  constructor(private productCategoryService: ProductCategoryService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder, private router: Router) {
    this.getAllProductCategory();
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
       name: ['', [Validators.required, Validators.maxLength(30)] ],
       productCategory: [null ]
    });
  }

  getAllProductCategory() {
    this.productCategoryService.getAllProductCategory().subscribe(ProductCategoryArray => {
      this.ProductCategoryArray = this.ProductCategoryArray
      console.log(ProductCategoryArray);
      
    })
  }

  update(data: any) {
    this.tempId = data.id;
    this.productCategoryService.search(data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
    });

    this.name = data.name;
    if ( data.categoryId != null) {
    var index = this.productCategories.findIndex(x => x.id === data.productCategory.id);
    this.categoryId = data.categoryId;
    this.selectedProductCategory = this.productCategories[index]
   } else {
    this.selectedProductCategory = null;
   }
   
   this.currentCID = data.id;

    this.router.navigate(['/newcategory'], {
      queryParams: {
        tempId: this.tempId,
        name: this.name,
        categoryId: this.categoryId
      }
    });

    
  }
  


  register()
  {
  
    let bodyData;
    if (this.selectedProductCategory != null) {
    bodyData = {
      "name" : this.name,
      "categoryId" : this.selectedProductCategory.id
    };
    }else{

    bodyData = {
      "name" : this.name,
    };
    }
 
    this.productCategoryService.register(bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllProductCategory();
 
        this.name = '';
        this.categoryId = '';
    });
  }

  setUpdate(data: any)
  {
    this.name = data.name;
    if ( data.categoryId != null) {
    var index = this.productCategories.findIndex(x => x.id === data.productCategory.id);
    this.categoryId = data.categoryId;
    this.selectedProductCategory = this.productCategories[index]
   } else {
    this.selectedProductCategory = null;
   }
   
   this.currentCID = data.id;
   this.visible = !this.visible
   
  }

  UpdateRecords()
  {
    let bodyData;
    if (this.selectedProductCategory != null) {
    bodyData = {
      "name" : this.name,
      "categoryId" : this.selectedProductCategory.id
    };
    }else{

    bodyData = {
      "name" : this.name,
    };
    }

    if((this.name.length>30)){
      this.messages = [{ severity: 'warn', summary: 'Waning', detail: 'Product category name can not be more than 30 characters!' }];
      return;
    }
    
    this.productCategoryService.UpdateRecords( this.currentCID , bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllProductCategory();
 
        this.name = '';
        this.categoryId = '';
    });
  }

  save()
  {
    if(this.currentCID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
       this.currentCID = '';
       //this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Category Updated Successfully' }];
      }      
  }
 

  delete(productCategory: ProductCategory):void
  {
    this.ProductCategoryArray = this.ProductCategoryArray.filter(h => h !== productCategory);

    this.productCategoryService.delete(productCategory.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllProductCategory();
    });

    this.name = '';
    this.categoryId = '';

    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Category Deleted Successfully' }];
  }

  reloadPage() {
    window.location.reload();
 }

 confirm(productCategory: ProductCategory) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(productCategory)
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
