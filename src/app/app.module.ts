import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthModule} from './auth/auth.module';
import {MainModule} from './main/main.module';
import { AppComponent } from './app.component';
import {Routes , RouterModule} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ApiService} from './api.service'
import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  {path: '', pathMatch:'full',redirectTo:'auth' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    MainModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  exports:[RouterModule]
  
})
export class AppModule { }
