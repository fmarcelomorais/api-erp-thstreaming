## ERP - TH-STREAMING

-- SISTEMA DE CADASTRO DE CLIENTES -- 
   ## ROTAS DA APLICAÇÃO

   - Usuários do Sistema

   ** [HEADER]
      - Authorization -> token liberado pela resposta da requisição no login de usuário.
   
   *[POST] /user/login 
      - login
      - password
      - key

   *[GET] /user/user
      - id

   *[GET] /user/users
      -

   *[POST] /user/register
      - name
      - phone
      - type
      - login
      - password
   [PATCH] /user/update
      - id

   [DELETE] /user/delete
      - id
   
--
### Funcionalidade

 - CADASTROS
 * Usuário do sistema  - [x]
	[Nome, Telefone, Tipo, login, senha]
 * Clientes - [x]
	[Nome, Telefone, obs]
 * Paineis - [x]
	[Nome, login, senha, url, creditos]
 * Revendedores  - [x]
	[Nome, Telefone, email, obs, dataCompraCredito, creditos]
 * Conta - [x]
	[NomeCliente, Painel, login, senha, statusPg, statusConta, DataAdesao, DataRenovacao, DataVencimento, valorPago]
 * Planos IPTV - [x]
	[Nome, Valor, Periodo]

## Funcionalidades

 * Funcionalidade do Sistema
 - Cadastrar Usuário do sistema.
 - Editar Usuario no sistema
 - Excluir Usuário do sistema.
 
 * Funcionalidades de Clientes
 - Cadastrar Cliente
    - Caso Cliente não esteja cadastrado.
 - Editar Cliente
 - Pesquisar todos os Clientes
 - Pesquisar cliente por: 
    - Nome | Telefone
 - Deletar Cliente
    - Caso Não tenha conta ativa

 * Funcionalidades de Revendedores
 - Cadastrar Revendedor
    - Caso Revendedor não esteja cadastrado.
 - Editar Revendedor
 - Pesquisar todos os Revendedores
 - Pesquisar Revendedor por: 
    - Nome | Telefone | email
 - Deletar Revendedor
    - Caso Não tenha conta ativa
    - Caso esteja com credito == 0

 * Funcionalidades do Painel
 - Cadastrar Painel
    - Caso Painel não esteja cadastrado.
 - Editar Painel
 - Pesquisar todos os Paineis
 - Pesquisar Painel por: 
    - Nome | login
 - Deletar Painel
    - Caso Não tenha Creditos

 * Funcionalidades de Conta
 - Cadastrar Conta
    - Caso Cliente tenha efetuado pagamento.
    - Caso tenha creditos disponiveis
    - 
 - Editar Conta
    - Somente pode editar senha e plano.
 - Pesquisar todas as Contas:
    - Ativas e Inativas
 - Pesquisar Conta por: 
    - Nome do Cliente, Painel, login, senha, statusConta, DataAdesao, DataRenovacao, DataVencimento
 - Deletar Conta
    - Caso a conta esteja Inativa.

 ### FINANCEIRO
