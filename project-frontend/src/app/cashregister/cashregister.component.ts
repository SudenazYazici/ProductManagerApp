import { Component } from '@angular/core';
import { CashRegister } from '../cashregister';
import { CashregisterService } from '../cashregister.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router'

@Component({
  selector: 'app-cashregister',
  templateUrl: './cashregister.component.html',
  styleUrls: ['./cashregister.component.css']
})
export class CashregisterComponent {

  tempId: string = "";

  registerForm = this.fb.group({
    name: [''],
    balance: ['']
  })

  CashRegisterArray : CashRegister[] = [];

  name: string = "";
  balance: number = 0;

  currentCRID = "";

  visible:boolean = false

  messages: Message[] = [];

  ngOnInit(): void {
    this.cashRegisterService.getAllCashRegister().subscribe((data: any) => {
      this.CashRegisterArray = data;
  });
  }

  constructor(private cashRegisterService: CashregisterService,
    private confirmationService: ConfirmationService, private messageService: MessageService, 
    private fb: FormBuilder, private router: Router) {
    this.getAllCashRegister();
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
       name: ['', [Validators.required, Validators.maxLength(30)] ],
       balance: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
  }

  getAllCashRegister() {
    this.cashRegisterService.getAllCashRegister().subscribe(CashRegisterArray => {
      this.CashRegisterArray = this.CashRegisterArray
      console.log(CashRegisterArray);
      
    })
  }
  
  update(data: any) {
    this.tempId = data.id;
    this.cashRegisterService.search(data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
    });

    this.name = data.name;
   this.balance = data.balance;
   
   this.currentCRID = data.id;

    this.router.navigate(['/newcashregister'], {
      queryParams: {
        tempId: this.tempId,
        name: this.name,
        balance: this.balance

      }
    });

    
  }


  register()
  {
  
    let bodyData = {
      "name" : this.name,
      "balance" : this.balance
    };
 
    this.cashRegisterService.register(bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllCashRegister();
 
        this.name = '';
        this.balance = 0;
    });
  }

  setUpdate(data: any)
  {
   this.name = data.name;
   this.balance = data.balance;
   this.currentCRID = data.id;
   this.visible = !this.visible
   
  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "balance" : this.balance
    };

    if((this.name.length>30)){
      this.messages = [{ severity: 'warn', summary: 'Waning', detail: 'Cash register name can not be more than 30 characters!' }];
      return;
    }
    
    this.cashRegisterService.UpdateRecords( this.currentCRID , bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllCashRegister();
 
        this.name = '';
        this.balance = 0;
    });
  }

  save()
  {
    if(this.currentCRID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
       this.currentCRID = '';
       this.messages = [{ severity: 'success', summary: 'Success', detail: 'Cash Register Updated Successfully' }];
      }      
  }
 

  delete(cashregister: CashRegister):void
  {
    this.CashRegisterArray = this.CashRegisterArray.filter(h => h !== cashregister);

    this.cashRegisterService.delete(cashregister.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllCashRegister();
    });

    this.name = '';
    this.balance = 0;

    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Cash Register Deleted Successfully' }];
  }

  reloadPage() {
    window.location.reload();
 }
  
 confirm(cashRegister: CashRegister) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this cash register?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(cashRegister)
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
