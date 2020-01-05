import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Product } from '../../Object/Product';
import { FormGroup, FormBuilder } from '@angular/forms'; 
import{ApiService} from '../../api.service'


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {

  angForm: FormGroup;
  id = null;
  name = null
  @Input() set product(val:Product){

    this.id= val.id;
    this.name = val.name;
    console.log(this.id,this.name);
  }
  @Output() productCreated = new EventEmitter();
  @Output() productUpdated = new EventEmitter();

  
  constructor(private fb: FormBuilder,private apiService:ApiService) {
    this.createForm();
  }
  
  createForm() {
    this.angForm = this.fb.group({
      name: ['']
    });
  }

  onClickSubmit() {
    
    if(this.id){
      this.apiService.updateProduct(this.id,this.angForm.value.name).subscribe(
        (result:Product) =>this.productUpdated.emit(result),
        error => console.log(error)
      )
    }else{
      this.apiService.createProduct(this.angForm.value.name).subscribe(
        (result:Product) => this.productCreated.emit(result),
        error => console.log(error)
      )
    }
    
  }

}
