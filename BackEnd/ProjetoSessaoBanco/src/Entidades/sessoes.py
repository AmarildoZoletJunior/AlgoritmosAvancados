import hashlib
import random

from Database.sqlServer import SQLServer


class Sessoes():
    def gerar_sequencia_unicos(self):
        digitos_unicos = random.sample(range(10), 10)
        return ''.join(map(str, digitos_unicos))

    def GerarSessoes(self):
        dados = [self.gerar_sequencia_unicos() for _ in range(1000)]
        for dado in dados:
            valor_aleatorio = str(random.randint(0, 999999999))  # Altere conforme necessário
            hash_obj = hashlib.sha256(valor_aleatorio.encode())
            hash_calculado = hash_obj.hexdigest()
            db = SQLServer()
            db.inserirSessoes(hash_calculado,dado)
        
    def BuscarSessaoValida(self):
        db = SQLServer()   
        db.LiberarSessoes()
        linha = db.buscarDado('Sessoes','hash,ordem',f'disponivel = 1')
        hashRetorno = linha[0][0]
        OrdemRetorno = linha[0][1]
        db.AtualizarRegistro('Sessoes','disponivel = 0, ultima_vez_usado = GETDATE()',f"hash = '{hashRetorno}'")
        return hashRetorno,OrdemRetorno