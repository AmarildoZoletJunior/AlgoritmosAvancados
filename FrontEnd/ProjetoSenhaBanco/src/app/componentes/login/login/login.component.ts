import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessaoService } from 'src/app/service/services/sessao/sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  hash: string = '';
  mostrarModalErro: boolean = false;
  MensagemErro: String = 'Erro'

  constructor(
    private router: Router,
    private RequisicaoSessao: SessaoService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {    
    this.cookieService.deleteAll();
    this.formulario = this.formBuilder.group({
      agencia: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6), Validators.maxLength(6)]],
      conta: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    
  }

  proximo(): void {
    if (this.formulario.valid) {
      this.RequisicaoSessao.buscarSessao().subscribe(x => {
        this.hash = x.Hash;
        this.cookieService.set('hash', x.Hash, 1, '/', undefined, false, 'Lax');
        this.cookieService.set('ordem', x.Ordem, 1, '/', undefined, false, 'Lax');
        this.cookieService.set('conta', this.formulario.value.conta);
        this.cookieService.set('agencia', this.formulario.value.agencia);
        this.router.navigate(['/senha/', this.hash]);
      },(erros : HttpErrorResponse) => {
        this.mostrarModalErro = true
        this.MensagemErro = erros.statusText 
      });
    } else {  
      if (this.formulario.get('agencia')?.value.trim().length < 6) {
        this.formulario.get('agencia')?.setErrors({ minlength: true });
      }
      if (this.formulario.get('conta')?.value.trim().length < 6) {
        this.formulario.get('conta')?.setErrors({ minlength: true });
      }

      if (this.formulario.get('agencia')?.value.trim().length > 6) {
        this.formulario.get('agencia')?.setErrors({ maxlength: true });
      }
      if (this.formulario.get('conta')?.value.trim().length > 6) {
        this.formulario.get('conta')?.setErrors({ maxlength: true });
      }
      if (!this.contemApenasNumeros('conta') && !(this.formulario.get('conta')?.value.trim().length < 6)) {
        this.formulario.get('conta')?.setErrors({ pattern: true });
      }
      if (!this.contemApenasNumeros('agencia') && !(this.formulario.get('agencia')?.value.trim().length < 6)){
        this.formulario.get('agencia')?.setErrors({ pattern: true });
      }

      console.log('Formulário inválido. Corrija os erros.');
    }
  }
  contemApenasNumeros(campo: string): boolean {
    const valor = this.formulario.get(campo)?.value;
    return !isNaN(Number(valor)) && !isNaN(parseFloat(valor));
  }
}


