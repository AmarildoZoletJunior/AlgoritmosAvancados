import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private RequisicaoSessao: SessaoService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {    
    this.cookieService.deleteAll();
    this.formulario = this.formBuilder.group({
      agencia: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6), Validators.maxLength(6)]],
      conta: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    this.RequisicaoSessao.buscarSessao().subscribe(x => {
      this.hash = x.Hash;
      this.cookieService.set('hash', x.Hash, 1, '/', undefined, false, 'Lax');
      this.cookieService.set('ordem', x.Ordem, 1, '/', undefined, false, 'Lax');
      const hashEsperado = x.Hash;
      const hashAtual = this.activatedRoute.snapshot.paramMap.get('sessaoid');
      if (hashAtual != hashEsperado) {
        this.router.navigate(['/']);
      }
    });
  }

  proximo(): void {
    if (this.formulario.valid) {
      this.cookieService.set('conta', this.formulario.value.conta);
      this.cookieService.set('agencia', this.formulario.value.agencia);
      this.router.navigate(['/senha/', this.hash]);
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


