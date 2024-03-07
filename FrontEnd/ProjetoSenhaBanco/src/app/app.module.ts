import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule aqui
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SenhaDaContaComponent } from './componentes/senha-da-conta/senha-da-conta.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './service/services/login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SenhaDaContaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
