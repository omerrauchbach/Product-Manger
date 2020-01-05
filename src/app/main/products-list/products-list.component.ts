import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Product} from '../../Object/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() products : Product[] = [];
  @Output() selectProduct = new EventEmitter<Product>();
  @Output() editedProduct = new EventEmitter<Product>();
  @Output() createProduct = new EventEmitter();
  @Output() deletedProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  productClicked(product:Product){
    this.selectProduct.emit(product);
    
  }

  editProduct(product:Product){
    this.editedProduct.emit(product);
    
  }

  deleteProduct(product:Product){
    this.deletedProduct.emit(product);
  }

  addProduct(){
    this.createProduct.emit();
  }

}
