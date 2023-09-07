import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8080/product'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product []> {
    return this.http.get<Product []>(this.url + "/getall")
  }

  search (id: string): Observable<Product> {
    return this.http.get<Product>(this.url + `/search/${id}`)
  }

  register(bodyData: any)
  {
    return this.http.post(this.url + "/save", bodyData, {responseType: 'text'})
  }

  UpdateRecords(currentID: any, bodyData: any)
  {
    return this.http.post(this.url + "/update/" + currentID, bodyData,{responseType: 'text'})
  }

  delete(data: any): Observable<Product>
  {
    return this.http.get<Product>(this.url + "/delete/" + data, this.httpOptions);
  }

  updatePrice(id: string, price: number): Observable<number> {
    return this.http.post<number>(this.url + "/updateprice/" + id + "?price=" + price,{responseType: 'text'});
  }

  updateAmount(id: string, amount: number): Observable<number> {
    return this.http.post<number>(this.url + "/updateamount/" + id + "?amount=" + amount,{responseType: 'text'});
  }

}
