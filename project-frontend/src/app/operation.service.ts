import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from './operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  url = 'http://localhost:8080/operation'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllOperation(): Observable<Operation []> {
    return this.http.get<Operation []>(this.url + "/getall")
  }

  register(bodyData: any)
  {
    return this.http.post(this.url + "/save", bodyData, {responseType: 'text'})
  }

  UpdateRecords(currentID: any, bodyData: any)
  {
    return this.http.post(this.url + "/update/" + currentID, bodyData,{responseType: 'text'})
  }

  delete(data: any): Observable<Operation>
  {
    return this.http.get<Operation>(this.url + "/delete/" + data, this.httpOptions);
  }

  buyProduct(bodyData: any) {
    return this.http.post(this.url + "/buyproduct", bodyData, {responseType: 'text'})
  }

  sellProduct(bodyData: any) {
    return this.http.post(this.url + "/sellproduct", bodyData, {responseType: 'text'})
  }
}
