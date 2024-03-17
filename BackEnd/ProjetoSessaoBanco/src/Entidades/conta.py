from passlib.hash import pbkdf2_sha256

from Database.sqlServer import SQLServer

class Conta:    
    def verificarSenha(self,agencia,conta,senha) -> bool:
        db = SQLServer()   
        print(senha)
        linhas = db.buscarDados('Usuarios','senha',f'agencia = {agencia} and conta = {conta}')
        if len(linhas) <= 0:
            return False, 'Conta não encontrada.'
        hash_senha = linhas[0][0]
        a = [senha[0],senha[1]]
        b = [senha[2],senha[3]]
        c = [senha[4],senha[5]]
        d = [senha[6],senha[7]]
        e = [senha[8],senha[9]]
        for i in a:
            for j in b:
                for k in c:
                    for l in d:
                        for o in e:
                                SenhaFormada = f"{i}{j}{k}{l}{o}"
                                if pbkdf2_sha256.verify(SenhaFormada, hash_senha):
                                    return True,''
        return False,'Senha incorreta.'


        
        
    def cadastrarUsuario(self,agencia,conta,senhaUsuario):
        db = SQLServer()
        senha = senhaUsuario
        hash_senha = pbkdf2_sha256.hash(senha)
        db.inserirDadosUsuario(agencia,conta,hash_senha)