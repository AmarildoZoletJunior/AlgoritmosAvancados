import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule aqui
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './service/services/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { SenhaComponent } from './componentes/senha/senha.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SenhaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }