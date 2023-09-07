import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NewproductComponent } from './newproduct/newproduct.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CashregisterComponent } from './cashregister/cashregister.component';
import { ButtonModule } from 'primeng/button';
import { NewcashregisterComponent } from './newcashregister/newcashregister.component';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { NewproductCategoryComponent } from './newproduct-category/newproduct-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { ReportComponent } from './report/report.component';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeModule } from 'primeng/tree';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NewproductComponent,
    CashregisterComponent,
    NewcashregisterComponent,
    ProductCategoryComponent,
    NewproductCategoryComponent,
    BuyProductComponent,
    SellProductComponent,
    ReportComponent,
    TreeNodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    MessagesModule,
    BrowserAnimationsModule,
    CardModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    OrganizationChartModule,
    TreeModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
