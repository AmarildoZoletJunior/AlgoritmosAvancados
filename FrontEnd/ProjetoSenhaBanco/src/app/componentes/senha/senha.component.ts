import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginReponse } from 'src/app/service/interface/login-reponse';
import { LoginService } from 'src/app/service/services/login/login.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss']
})
export class SenhaComponent {
  senha: string = '';
  senhaAPI: string = '';
  botoesSuperiores: any[] = [];
  botoesInferiores: any[] = [];
  regexNumeros = /[^\d]+/g;
  mostrarModalErro: boolean = false
  formulario: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 

    this.formulario = this.formBuilder.group({
      senha: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(5), Validators.maxLength(5)]],
    });

  }

  ngOnInit(): void {
    const hashEsperado = this.cookieService.get('hash');
    const hashAtual = this.activatedRoute.snapshot.paramMap.get('sessaoid');

    if (hashAtual !== hashEsperado) {
      this.router.navigate(['/']);
    }
    
    const OrdemAPI = this.cookieService.get('ordem');

    this.botoesSuperiores = [
      { texto: OrdemAPI.substring(0, 1) + ' e ' + OrdemAPI.substring(1, 2) },
      { texto: OrdemAPI.substring(2, 3) + ' e ' + OrdemAPI.substring(3, 4) },
      { texto: OrdemAPI.substring(4, 5) + ' e ' + OrdemAPI.substring(5, 6) }
    ];

    this.botoesInferiores = [
      { texto: OrdemAPI.substring(6, 7) + ' e ' + OrdemAPI.substring(7, 8) },
      { texto: OrdemAPI.substring(8, 9) + ' e ' + OrdemAPI.substring(9, 10) },
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
          const confirmacao = window.confirm("Login efetuado com sucesso!");      
          if (confirmacao){
            this.router.navigate(['/login'])
          }
        },
        (error: any) => {
          const confirmacao = window.confirm("SENHA INCORRETA!");      
          if (confirmacao){
            this.router.navigate(['/login'])
          }
        }
      );
    }
  }
}