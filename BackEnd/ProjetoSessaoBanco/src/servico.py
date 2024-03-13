import warnings
from Entidades.conta import Conta
from Database.sqlServer import SQLServer
from Entidades.sessoes import Sessoes
from flask import Flask, jsonify,request
from flask_cors import CORS

warnings.filterwarnings("ignore", category = UserWarning)
app = Flask(__name__)
CORS(app)
sql_server_conn = SQLServer()

@app.route('/Autenticar', methods=['POST'])
def Autenticar():
    try:
        # Senha().cadastrarUsuario('183724','123456','58746')
        # Senha().verificar_parte_senha_entrada()
        dados_json = request.get_json()
        Resultado,Mensagem = Conta().verificarSenha(dados_json['Agencia'],dados_json['Conta'],dados_json['Senha'])
        if Resultado:
            return jsonify({"Mensagem": "Conta autenticada com sucesso."}), int(200)
        else:
            return jsonify({"Mensagem": Mensagem}), int(400)
    except Exception as erro:
        print(erro)
        return 'Ocorreu um erro desconhecido.', 500
        
 
@app.route('/CriarSessoes', methods=['GET'])
def CriarSessoes():
    try:
        Sessoes().GerarSessoes()
        return jsonify({"Mensagem": "Conta autenticada com sucesso."}), int(200)
    except Exception as erro:
        print(erro)
        return 'Ocorreu um erro desconhecido.', 500
    
    
@app.route('/BuscarSessao', methods=['GET'])
def BuscarSessao():
    try:
        endereco_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
        print("Endereço ip" + str(endereco_ip))
        HashRetorno,OrdemRetorno = Sessoes().BuscarSessaoValida()
        return jsonify({"Hash": HashRetorno,'Ordem':OrdemRetorno}), int(200)
    except Exception as erro:
        return 'Ocorreu um erro desconhecido.', 500
        
        
if __name__ == '__main__':
    app.run(debug=True,host='localhost')
