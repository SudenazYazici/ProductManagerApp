import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { CashregisterComponent } from './cashregister/cashregister.component';
import { NewcashregisterComponent } from './newcashregister/newcashregister.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { NewproductCategoryComponent } from './newproduct-category/newproduct-category.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    pathMatch: 'full',
    component: ProductComponent,
  },
  {
    path: 'newproduct/:id',
    pathMatch: 'full',
    component: NewproductComponent,
  },
  {
    path: 'newproduct',
    pathMatch: 'full',
    component: NewproductComponent,
  },
  {
    path: 'cashregister',
    pathMatch: 'full',
    component: CashregisterComponent,
  },
  {
    path: 'newcashregister/:id',
    pathMatch: 'full',
    component: NewcashregisterComponent,
  },
  {
    path: 'newcashregister',
    pathMatch: 'full',
    component: NewcashregisterComponent,
  },
  {
    path: 'category',
    pathMatch: 'full',
    component: ProductCategoryComponent,
  },
  {
    path: 'newcategory/:id',
    pathMatch: 'full',
    component: NewproductCategoryComponent,
  },
  {
    path: 'newcategory',
    pathMatch: 'full',
    component: NewproductCategoryComponent,
  },
  {
    path: 'buyproduct',
    pathMatch: 'full',
    component: BuyProductComponent,
  },
  {
    path: 'sellproduct',
    pathMatch: 'full',
    component: SellProductComponent,
  },
  {
    path: 'operation',
    pathMatch: 'full',
    component: ReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
