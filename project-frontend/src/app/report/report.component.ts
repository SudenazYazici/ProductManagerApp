import { Component } from '@angular/core';
import { Operation } from '../operation';
import { Product } from '../product';
import { CashRegister } from '../cashregister';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { OperationService } from '../operation.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  OperationArray: Operation [] = [];

  id: string = "";
  product: Product | null = null;
  type: string = "";
  date: Date | null = null;
  amount: number = 0;
  cashRegister: CashRegister | null = null;

  currentID = "";

  visible:boolean = false

  messages: Message[]=[];

  ngOnInit(): void {
    this.operationService.getAllOperation().subscribe((data: any) => {
      this.OperationArray = data.reverse();
  });
  }

  constructor(private operationService: OperationService,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.getAllOperation();
  }

  getAllOperation() {
    this.operationService.getAllOperation().subscribe(OperationArray => {
      this.OperationArray = this.OperationArray
      console.log(OperationArray);
      
    })
  }
  


  register()
  {
  
    let bodyData = {
      "product" : this.product,
      "type" : this.type,
      "date" : this.date,
      "amount" : this.amount,
      "cashRegister" : this.cashRegister
    };
 
    this.operationService.register(bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllOperation();
 
        this.product = null;
        this.type = '';
        this.date = null;
        this.amount = 0;
        this.cashRegister = null;
    });
  }

  setUpdate(data: any)
  {
   this.product = data.product;
   this.type = data.type;
   this.date = data.date;
   this.amount = data.amount;
   this.cashRegister = data.cashRegister;
   
   this.currentID = data.id;
   this.visible = !this.visible
   
  }

  UpdateRecords()
  {
    let bodyData = {
      "product" : this.product,
      "type" : this.type,
      "date" : this.date,
      "amount" : this.amount,
      "cashRegister" : this.cashRegister
    };
    
    this.operationService.UpdateRecords( this.currentID , bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllOperation();
 
        this.product = null;
        this.type = '';
        this.date = null;
        this.amount = 0;
        this.cashRegister = null;
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
       //this.messages = [{ severity: 'success', summary: 'Success', detail: 'Operation Updated Successfully' }];
      }      
  }
 

  delete(operation: Operation):void
  {
    this.OperationArray = this.OperationArray.filter(h => h !== operation);

    this.operationService.delete(operation.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllOperation();
    });

    this.product = null;
    this.type = '';
    this.date = null;
    this.amount = 0;
    this.cashRegister = null;

    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Operation Deleted Successfully' }];
  }

  reloadPage() {
    window.location.reload();
 }

 confirm(operation: Operation) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(operation)
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
