Funcionalidade: Autenticação de usuário

  Cenário: Acessar a home e validar elementos principais
    Dado que o usuário acessa a página inicial
    Então o logo da Americanas deve estar visível
    E o botão "olá, faça seu login" deve estar visível

  Cenário: Acessar a tela de login
    Dado que o usuário está na home
    Quando clica em "olá, faça seu login"
    Então a tela de login é exibida com o título "login do cliente"

  Cenário: Exibir formulário de email e senha
    Dado que o usuário está na tela de login
    Quando clica em "Entrar com email e senha"
    Então o formulário de email e senha deve ser exibido

  Cenário: Tentativa de login com campos vazios
    Dado que o formulário de login está visível
    Quando o usuário clica em "Entrar" sem preencher os campos
    Então deve ser exibida a mensagem "Entre com um email válido"

  Cenário: Login com senha incorreta
    Dado que o formulário de login está visível
    Quando preenche o campo email com um valor válido
    E preenche o campo senha com "senha-invalida"
    E clica em "Entrar"
    Então deve ser exibida a mensagem "Usuário e/ou senha incorretos"

  Cenário: Login com dados válidos
    Dado que o formulário de login está visível
    Quando preenche o campo email e senha com dados válidos
    E clica em "Entrar"
    Então o usuário deve ser redirecionado para a home
    E deve ser exibida a saudação com o email do usuário


Funcionalidade: Busca e Filtros de Produtos

  Cenário: Exibir sugestões no campo de busca
    Dado que o usuário está logado
    Quando clica no campo de busca
    Então a seção "mais buscados" deve ser exibida

  Cenário: Buscar item sugerido
    Dado que a seção "mais buscados" está visível
    Quando o usuário clica em "notebooks"
    Então a URL e o título da página devem conter "notebooks"

  Cenário: Exibir histórico de buscas
    Dado que o usuário já buscou por "notebooks"
    Quando clica novamente no campo de busca
    Então "notebooks" deve aparecer no histórico

  Cenário: Buscar produto manualmente
    Quando o usuário digita "Chocolate" e pressiona Enter
    Então os resultados devem exibir produtos relacionados a "Chocolate"

  Cenário: Aplicar filtro de preço
    Dado que o usuário está nos resultados de "Chocolate"
    Quando clica no filtro "R$ 0 - R$ 25"
    Então os produtos devem ser atualizados
    E a URL deve refletir o filtro aplicado

  Cenário: Ordenar produtos por preço
    Quando o usuário seleciona "maiores preços"
    Então a listagem de produtos deve ser reordenada

  Cenário: Validar valor do primeiro produto
    Quando o usuário observa o preço do primeiro item
    Então o valor deve ser menor ou igual a R$ 25,00


Funcionalidade: Fluxo de compra e checkout

  Cenário: Acessar página de detalhes do produto
    Dado que o usuário está nos resultados da busca
    Quando clica no primeiro produto
    Então a página de detalhes (PDP) deve ser exibida

  Cenário: Validar nome e preço do produto
    Dado que a PDP está visível
    Então o nome e o preço devem corresponder ao da listagem

  Cenário: Calcular frete
    Quando o usuário informa o CEP "32042-560" e clica em "ok"
    Então o frete e endereço devem ser exibidos corretamente

  Cenário: Alterar quantidade
    Quando o usuário clica em "+" e depois em "-"
    Então a quantidade deve ser atualizada corretamente

  Cenário: Adicionar produto ao carrinho
    Quando o usuário clica em "Comprar"
    Então o modal lateral "minha cesta" deve ser exibido com as informações do produto

  Cenário: Validar valor total
    Quando o modal "minha cesta" estiver visível
    Então o valor total deve ser igual ao preço do produto

  Cenário: Prosseguir para checkout
    Quando o usuário clica em "continuar"
    Então deve ser redirecionado para a página de checkout

  Cenário: Inserir cupom inválido
    Quando o usuário insere "TesteDesconto" no campo cupom e clica em "Adicionar"
    Então deve ser exibida a mensagem "Cupom TesteDesconto inválido"

  Cenário: Validar total do pedido
    Quando o carrinho está visível
    Então o valor total deve incluir produto + frete

  Cenário: Finalizar pedido e seguir para dados pessoais
    Quando o usuário clica em "Fechar pedido"
    Então é redirecionado para a seção "Finalizar compra"

  Cenário: Validar dados pessoais preenchidos
    Quando a tela "Finalizar compra" é exibida
    Então os campos Email, Nome e Telefone devem estar preenchidos

  Cenário: Validar erros nos campos obrigatórios de entrega
    Quando o usuário clica em "Ir para o pagamento" sem preencher todos os campos
    Então mensagens de "Campo obrigatório" devem ser exibidas

  Cenário: Preencher dados de entrega
    Quando o usuário preenche "Número" com "450" e "Destinatário" com "Icaro Teste"
    Então os campos devem ser aceitos

  Cenário: Avançar para pagamento
    Quando o usuário clica em "Ir para o pagamento"
    Então a seção "Pagamento" deve ser exibida

  Cenário: Inserir vale-presente inválido
    Quando o usuário insere "ValeTeste" e clica em "Adicionar"
    Então a mensagem "Código do gift inválido" deve ser exibida

  Cenário: Erro ao preencher cartão inválido
    Quando o usuário preenche os dados do cartão com número inválido
    E clica em "Finalizar compra"
    Então a mensagem "Confira o número do seu cartão" deve ser exibida

  Cenário: Revisar dados de pagamento
    Quando clica em "Revisar dados ou pagar de outra forma"
    Então o modal de erro é fechado

  Cenário: Selecionar PIX e finalizar
    Quando o usuário escolhe "Pix" e finaliza a compra
    Então o QR Code e as instruções devem ser exibidas corretamente

  Cenário: Visualizar código Copia e Cola
    Quando o usuário clica em "Pagar sem o celular"
    Então o código "Copia e Cola" do Pix deve ser exibido
