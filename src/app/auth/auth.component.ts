import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import {ApiService} from '../api.service'
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'

export interface Token{
  token:string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm : FormGroup;
  registerMode =false;
  constructor(private fb: FormBuilder, private apiService:ApiService,
    private cookie:CookieService , private router:Router) { 
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      username:  '',
      password:  ''
    });
  }

  ngOnInit() {
    const userToken= this.cookie.get('token');
    console.log(userToken);
    if(userToken){
      this.router.navigate(['/products'])
    }
  }

  onClickSubmit() {

   if(!this.registerMode){
    this.loginUser();
    }
    else{
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser()
        },
        error => console.log("onClickSubmit",error)
      );
    }
  }

  loginUser(){
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result:Token) => {
        console.log(result);
        this.cookie.set('token',result.token);
        this.router.navigate(['/products']);
      },
      error => console.log("onClickSubmit",error)
    );
  }
 

}
