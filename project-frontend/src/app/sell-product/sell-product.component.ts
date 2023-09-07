import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { CashRegister } from '../cashregister';
import { CashregisterService } from '../cashregister.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { OperationService } from '../operation.service';
import { Operation } from '../operation';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent {

  amount: number = 0;
  product: Product | null = null;
  cashRegister: CashRegister | null = null;

  messages: Message[] = [];

  products: Product[] = [];
  selectedProduct: Product =this.products[0];

  cashRegisters: CashRegister[] = [];
  selectedCashRegister: CashRegister = this.cashRegisters[0];

  OperationArray: Operation [] = [];

  visibleProduct: boolean = false;
  visibleCashRegister: boolean = false;
  visibleSale: boolean = false;

  amountAfterSale: number = 0;
  balanceAfterSale: number = 0;

  constructor(private productService: ProductService,
     private cashRegisterService: CashregisterService,
      private operationService: OperationService ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCashRegisters();
  }

  loadProducts() {
    this.productService.getAllProduct().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  loadCashRegisters() {
    this.cashRegisterService.getAllCashRegister().subscribe((cashRegisters: CashRegister[]) => {
      this.cashRegisters = cashRegisters;
    });
  }

  sell()
  {
    let bodyData = {
      "type" : "sell",
      "date" : Date.now(),
      "amount" : this.amount,
      "product": this.selectedProduct,
      "cashRegister": this.selectedCashRegister
    };

    if((this.amount==0) || (this.selectedProduct==null) || (this.selectedCashRegister==null)){
      this.messages = [{ severity: 'warn', summary: 'Warning', detail: 'Make sure to enter all values!' }];
      return;
    }

    if( (this.amount<0)  || (Number.isNaN(Number(this.amount)))  ) {
      this.messages = [{ severity: 'warn', summary: 'Warning', detail: 'Make sure to enter a valid amount!' }];
      return;
    }

    const cashRegisterId = this.selectedCashRegister.id;
    const newBalance = Number(this.selectedProduct.price) * Number(this.amount);

    const productId = this.selectedProduct.id;

    this.operationService.sellProduct(bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        
    });

    if(this.amount > (this.selectedProduct.amount != undefined ? this.selectedProduct.amount:0)  ) {
      this.messages = [{ severity: 'warn', summary: 'Warning', detail: 'There is not enough product!' }];
      return;
    } else {
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Product Sold Successfully' }];
      return;
    }

  }

  checkProduct() {
    let bodyData = {
      "product": this.selectedProduct
    };

    if(this.selectedProduct != null){
      this.visibleProduct = true;
    } else{
      this.visibleProduct = false;
    }
  }
  
  checkCashRegister() {
    let bodyData = {
      "cashRegister": this.selectedCashRegister
    };

    if(this.selectedCashRegister != null){
      this.visibleCashRegister = true;
    } else{
      this.visibleCashRegister = false;
    }
  }

  checkPurchase() {
    let bodyData = {
      "amount" : this.amount,
      "product": this.selectedProduct,
      "cashRegister": this.selectedCashRegister
    };

    if((this.amount!=0) && (this.selectedProduct!=null) && (this.selectedCashRegister!=null)){
      this.visibleSale = true;
      this.amountAfterSale = (this.selectedProduct.amount != undefined ? this.selectedProduct.amount:0) - this.amount;
      this.balanceAfterSale = (this.selectedCashRegister.balance != undefined ? this.selectedCashRegister.balance:0) + (this.selectedProduct.price != undefined ? this.selectedProduct.price:0) * this.amount;
    } else {
      this.visibleSale = false;
    }
  }

}
