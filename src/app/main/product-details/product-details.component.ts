import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Product} from '../../Object/Product'
import { ApiService} from '../../api.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;
  @Output() updateRating = new EventEmitter<Product>();
  rateHovered = 0;

  constructor( private apiService:ApiService) { }

  ngOnInit() {
  }

  rateHover(rate:number){
    this.rateHovered= rate;
  }

  rateClicked(rate:number){
    this.apiService.rateProduct(rate,this.product.id).subscribe(
      (result:Product)=>this.getDetails(),
      error=> console.log(error)
    );
  }

  getDetails(){
    this.apiService.getProduct(this.product.id).subscribe(
      result=>{
        this.updateRating.emit(result);
      },
      error=> console.log(error)
    );
  }

}
