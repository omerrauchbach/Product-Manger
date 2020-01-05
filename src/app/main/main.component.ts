import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Product } from '../Object/Product';
import { User } from '../Object/User';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products : Product[] = [];
  users : User[]=[];
  selectedProducts = null; 
  editedProduct = null;

  constructor(
    private apiService: ApiService,
    private cookie:CookieService,
    private router:Router
  ) { }

 

  ngOnInit() {
    const userToken= this.cookie.get('token');
    if(!userToken){
      this.router.navigate(['/auth']);
    }
    else{
      console.log("ngOnInit Main")
      this.apiService.getUsers().subscribe(
        (data:User[])=>{
            console.log("getUsers: ",data);
            this.users= data['result'];
          },
          error => console.log(error)
      );
      this.apiService.getProducts().subscribe(
        (data:Product[])=>{
        console.log("getProduct: ",data);
          this.products= data['result'];
        },
        error => console.log(error)
      );
    }
  }

  selectProduct(product:Product){
    this.selectedProducts=product;
    this.editedProduct = null;
  }

  editProduct(product:Product){
    this.editedProduct=product;
    this.selectedProducts = null;
  }

  addProduct(){
    this.editedProduct={name:'' };
    this.selectedProducts = null;

  }

  deletedProduct(product:Product){
    console.log("delete");
     this.apiService.deleteProduct(product.id).subscribe(
      data=>{
       this.products=this.products.filter(pro=>pro.id !== product.id);
      }
     
    );

  }

  productUpdated(product:Product){
    const indexProduct =this.products.findIndex(pro=> pro.id=== product.id);
    if(indexProduct >= 0)
      this.products[indexProduct]= product;
  }

  productCreated(product:Product){
    this.products.push(product);
  }

  logout(){
    this.cookie.delete('token');
    this.router.navigate(['/auth']);
  }

}
