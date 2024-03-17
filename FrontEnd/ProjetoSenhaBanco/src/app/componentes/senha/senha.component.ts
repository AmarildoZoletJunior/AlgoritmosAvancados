import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginReponse } from 'src/app/service/interface/login-reponse';
import { SessaoReponse } from 'src/app/service/interface/sessao-reponse';
import { LoginService } from 'src/app/service/services/login/login.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss']
})
export class SenhaComponent {
  senha: string = '';
  senhaAPI: string = '';
  senhaLegnt: number = 0;
  senhaAPILengt: number = 0;
  botoesSuperiores: any[] = [];
  botoesInferiores: any[] = [];
  regexNumeros = /[^\d]+/g;
  mensagemAutenticacao: string = '';
  mostrarModal: boolean = false;
  mostrarModalErro: boolean = false

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const hashEsperado = this.cookieService.get('hash');
    const hashAtual = this.activatedRoute.snapshot.paramMap.get('sessaoid');

    if (hashAtual !== hashEsperado) {
      this.router.navigate(['/']);
    }

    const retornoAPI = this.cookieService.get('ordem');

    this.botoesSuperiores = [
      { texto: retornoAPI.substring(0, 1) + ' e ' + retornoAPI.substring(1, 2) },
      { texto: retornoAPI.substring(2, 3) + ' e ' + retornoAPI.substring(3, 4) },
      { texto: retornoAPI.substring(4, 5) + ' e ' + retornoAPI.substring(5, 6) }
    ];

    this.botoesInferiores = [
      { texto: retornoAPI.substring(6, 7) + ' e ' + retornoAPI.substring(7, 8) },
      { texto: retornoAPI.substring(8, 9) + ' e ' + retornoAPI.substring(9, 10) },
      { texto: '->' }
    ];
  }

  Deletar(): void {
    this.senha = this.senha.substring(0, this.senha.length - 1);
    this.senhaAPI = this.senhaAPI.substring(0, this.senhaAPI.length - 2);
  }

  acaoBotao(botao: any): void {
    this.senhaAPI += botao.texto.replace(this.regexNumeros, '');
    
    if (botao.texto != '->') {
      this.senha += '1'; 
    }

    const dados = {
      Agencia: this.cookieService.get('agencia'),
      Conta: this.cookieService.get('conta'),
      Senha: this.senhaAPI
    };

    if (botao.texto === '->') {
      this.loginService.autenticar(dados)
      .subscribe(
        (response: LoginReponse) => {
          console.log(response)
          this.mostrarModal = true
        },
        (error: any) => {
          this.mostrarModalErro = true
        }
      );
    }
  }
}