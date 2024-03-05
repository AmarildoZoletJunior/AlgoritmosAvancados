import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SenhaDaContaComponent } from './componentes/senha-da-conta/senha-da-conta.component';
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
