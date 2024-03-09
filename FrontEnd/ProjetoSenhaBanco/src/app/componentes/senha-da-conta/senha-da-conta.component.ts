import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginData } from 'src/app/service/interface/login-request';
import { LoginService } from 'src/app/service/services/login/login.service';

@Component({
  selector: 'app-senha-da-conta',
  templateUrl: './senha-da-conta.component.html',
  styleUrls: ['./senha-da-conta.component.scss']
})
export class SenhaDaContaComponent {
  senha: string = '';
  botoesSuperiores: any[] = [];
  botoesInferiores: any[] = [];

  constructor(private loginService: LoginService,private cookieService:CookieService) { }

  ngOnInit(): void {
    const retornoAPI = this.cookieService.get('ordem')
    this.botoesSuperiores = [
      { texto: retornoAPI.substring(0,1) + ' e ' + retornoAPI.substring(1,2)},
      { texto: retornoAPI.substring(2,3) + ' e ' + retornoAPI.substring(3,4) },
      { texto: retornoAPI.substring(4,5) + ' e ' + retornoAPI.substring(5,6) }
    ];

    this.botoesInferiores = [
      { texto: retornoAPI.substring(6,7) + ' e ' + retornoAPI.substring(7,8) },
      { texto: retornoAPI.substring(8,9) + ' e ' + retornoAPI.substring(9,10) },
      { texto: '->' }
    ];
  }

  acaoBotao(botao: any) {
    const regexNueros = /[^\d]+/g;
    this.senha += botao.texto.replace(regexNueros,"")  
    const dados: LoginData = {  
      Agencia: this.cookieService.get('agencia'),
      Conta: this.cookieService.get('conta'),
      Senha: this.senha
    };

    if (botao.texto == '->') {
      this.loginService.autenticar(dados)
        .subscribe(response => { console.log('reponse: ', response) },
          error => { console.log('Erro:', error) }
      );
      console.log('ENTER');
    }
    else {
      console.log('Botão clicado:', this.senha);
    }
  }
}

