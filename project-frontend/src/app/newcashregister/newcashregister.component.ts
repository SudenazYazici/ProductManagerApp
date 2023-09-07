import { Component } from '@angular/core';
import { CashregisterService } from '../cashregister.service';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CashRegister } from '../cashregister';

@Component({
  selector: 'app-newcashregister',
  templateUrl: './newcashregister.component.html',
  styleUrls: ['./newcashregister.component.css']
})
export class NewcashregisterComponent {

  registerForm = this.fb.group({
    name: [''],
    balance: ['']
  })

  cashRegisterId: string = "";
  
  cashRegister: CashRegister = new CashRegister();

  messages: Message[]=[];

  visibleButton: boolean = false;

  constructor(private cashRegisterService: CashregisterService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.cashRegisterId = this.route.snapshot.paramMap.get("id") ?? "";

    if (this.cashRegisterId != "") {
      this.findCashRegister();
      this.visibleButton = true;
    }
  }

  findCashRegister() {
    this.cashRegisterService.search(this.cashRegisterId).subscribe(res => {
      if (res != null) {
        this.cashRegister = res
      } else {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Cash Register bulunamadı' }];
      }
    },err=> {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Beklenmedik bir hata meydana geldi' }];
    })
  }


  createForm() {
    this.registerForm = this.fb.group({
       name: ['', [Validators.required, Validators.maxLength(30)] ],
       balance: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
  }

  register() {
    this.cashRegisterService.register(this.cashRegister).subscribe((resultData: any) => {
      console.log(resultData);
      if (this.cashRegisterId != "") {
        this.cashRegister = new CashRegister();
      }
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Cash Register Added Successfully' }];
    });
  }

  UpdateRecords() {
    this.cashRegisterService.UpdateRecords(this.cashRegisterId, this.cashRegister).subscribe((resultData: any) => {
      console.log(resultData);

      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Cash Register Updated Successfully' }];
    });
  }

  save() {
    if (this.cashRegisterId == "") {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }

}
