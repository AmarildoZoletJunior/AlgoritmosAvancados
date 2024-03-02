import { Component } from '@angular/core';

@Component({
  selector: 'app-senha-da-conta',
  templateUrl: './senha-da-conta.component.html',
  styleUrls: ['./senha-da-conta.component.scss']
})
export class SenhaDaContaComponent {
  senha: string = '';
  botoesSuperiores: any[] = [];
  botoesInferiores: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Simulação de retorno de API para os botões
    this.botoesSuperiores = [
      { texto: '1 e 2' },
      { texto: '3 e 4' },
      { texto: '5 e 6' }
    ];

    this.botoesInferiores = [
      { texto: '7 e 8' },
      { texto: '9 e 0' },
      { texto: '( . )( . )' }
    ];
  }

  acaoBotao(botao: any) {
    // Implemente a ação que deseja executar quando um botão é clicado
    console.log('Botão clicado:', botao.texto);
  }

}

