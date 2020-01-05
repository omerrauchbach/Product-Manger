import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {Routes , RouterModule} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ApiService} from '../api.service';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component'



const routes: Routes = [
  {path:'products', component: MainComponent}
];

@NgModule({
  declarations: [MainComponent, ProductsListComponent, ProductFormComponent, ProductDetailsComponent, UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),  
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  exports:[RouterModule],
  providers:[
    ApiService
  ]
    
  
  
})
export class MainModule { }
