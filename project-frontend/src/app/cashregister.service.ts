import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashRegister } from './cashregister';

@Injectable({
  providedIn: 'root'
})
export class CashregisterService {

  url = 'http://localhost:8080/cashregister'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCashRegister(): Observable<CashRegister []> {
    return this.http.get<CashRegister []>(this.url + "/getall")
  }

  search (id: string): Observable<CashRegister> {
    return this.http.get<CashRegister>(this.url + `/search/${id}`)
  }

  register(bodyData: any)
  {
    return this.http.post(this.url + "/save", bodyData, {responseType: 'text'})
  }

  UpdateRecords(currentCRID: any, bodyData: any)
  {
    return this.http.post(this.url + "/update/" + currentCRID, bodyData,{responseType: 'text'})
  }

  delete(data: any): Observable<CashRegister>
  {
    return this.http.get<CashRegister>(this.url + "/delete/" + data, this.httpOptions);
  }

  updateCashRegisterBalance(id: string, balance: number): Observable<number> {
    return this.http.post<number>(this.url + "/updatebalance/" + id + "?balance=" + balance,{responseType: 'text'});
  }
}
