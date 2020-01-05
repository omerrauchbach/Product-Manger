import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Product} from './Object/Product'
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = 'http://127.0.0.1:8000/';
  badeUrlProduct = `${this.baseUrl}api/products/`;
  userUrl = `${this.baseUrl}api/users/`;
  
  headers:HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    //"Access-Control-Allow-Origin": "*",
    //"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    //"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" 
  });
  
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService
  ) { }

  getProducts(){
    return this.httpClient.get<Product[]>(this.badeUrlProduct,{headers:this.getAuthHeaders()});   
  }

  getProduct(id: number){
    return this.httpClient.get<Product>(`${this.badeUrlProduct}${id}/`,{headers: this.getAuthHeaders()});
  }

  getUsers(){
    const ans= this.httpClient.get(this.userUrl,{headers:this.getAuthHeaders()});
    console.log(ans);
    return ans;
  }

  createProduct(name:string){
    const body =JSON.stringify({name:name});
    return this.httpClient.post(`${this.badeUrlProduct}`,body,{headers: this.getAuthHeaders()}); 
  }

  updateProduct(id:number,name:string){
    console.log(id,name);
    const body =JSON.stringify({id:id,name:name});
    return this.httpClient.put(`${this.badeUrlProduct}${id}/`,body,{headers: this.getAuthHeaders()}); 
  }

  rateProduct(rate:number,productId:number){
    const body =JSON.stringify({stars:rate});
    return this.httpClient.post(`${this.badeUrlProduct}${productId}/rate_product/`,body,{headers: this.getAuthHeaders()}); 
  }

  deleteProduct(id:number){   
    const body =JSON.stringify({id:id});
    return this.httpClient.delete(`${this.badeUrlProduct}${id}/`,{headers: this.getAuthHeaders()}); 
  }

  loginUser(authData){
    console.log("login: ",authData);
    //const body =JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`,authData,{headers: this.headers});
  }

  registerUser(authData){
    console.log("register: ",authData);
    //const body =JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`,authData,{headers: this.headers});
  }

  getAuthHeaders(){
   
    const token = this.cookie.get('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
       Authorization: `Token ${token}`
    })
  }
}
