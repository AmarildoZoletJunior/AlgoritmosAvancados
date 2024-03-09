import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessaoService } from 'src/app/service/services/sessao/sessao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  agencia: string = '';
  conta: string = '';
  hash: string = '';
  senhaServer: String = '';

  constructor(private router: Router,private RequisicaoSessao: SessaoService,private cookieService : CookieService) { }

  ngOnInit(): void {
    this.RequisicaoSessao.buscarSessao().subscribe(x => 
      {
        this.hash = x.Hash
        this.router.navigate(['login/',x.Hash])
        this.cookieService.set('ordem',x.Ordem)
      }  
    )
  }

  proximo(): void {
    this.cookieService.set('conta',this.conta)
    this.cookieService.set('agencia',this.agencia)
    this.router.navigate(['/senha/',this.hash]);
  }

}
