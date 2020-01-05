import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {Routes , RouterModule} from '@angular/router';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {ApiService} from '../api.service'
import { CookieService } from 'ngx-cookie-service';


const routes: Routes = [
  {path: 'auth', component: AuthComponent}
];
@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    RouterModule
  ],
  providers:[
    ApiService,
    CookieService 
  ]
})
export class AuthModule { }
