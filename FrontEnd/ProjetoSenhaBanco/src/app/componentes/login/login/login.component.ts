import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  senhaServer: String = '';
  hash: string = '';

  constructor(private router: Router,private RequisicaoSessao: SessaoService,private cookieService : CookieService,private activatedRoute:ActivatedRoute) {    
    this.cookieService.deleteAll()
    this.cookieService.delete('hash') }

  ngOnInit(): void {

   this.RequisicaoSessao.buscarSessao().subscribe(x => 
      {
        this.hash = x.Hash
        this.cookieService.set('hash',x.Hash,1, '/', undefined, false, 'Lax')
        this.cookieService.set('ordem',x.Ordem,1, '/', undefined, false, 'Lax')
        const hashEsperado = x.Hash
        const hashAtual = this.activatedRoute.snapshot.paramMap.get('sessaoid')
        if (hashAtual != hashEsperado){
          this.router.navigate(['/'])
        }
      }  
    )
  }

  proximo(): void {
    this.cookieService.set('conta',this.conta)
    this.cookieService.set('agencia',this.agencia)
    this.router.navigate(['/senha/',this.hash]);
  }

}
