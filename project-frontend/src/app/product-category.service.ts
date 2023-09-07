import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from './productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  url = 'http://localhost:8080/category'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllProductCategory(): Observable<ProductCategory []> {
    return this.http.get<ProductCategory []>(this.url + "/getall")
  }

  search (id: string): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(this.url + `/search/${id}`)
  }

  register(bodyData: any)
  {
    return this.http.post(this.url + "/save", bodyData, {responseType: 'text'})
  }

  UpdateRecords(currentCID: any, bodyData: any)
  {
    return this.http.post(this.url + "/update/" + currentCID, bodyData,{responseType: 'text'})
  }

  delete(data: any): Observable<ProductCategory>
  {
    return this.http.get<ProductCategory>(this.url + "/delete/" + data, this.httpOptions);
  }
}
