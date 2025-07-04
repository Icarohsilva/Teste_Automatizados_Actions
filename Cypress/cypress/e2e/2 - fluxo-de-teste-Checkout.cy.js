// cypress/e2e/seu-arquivo-de-teste.cy.js

import HomePage from '../pages/HomePage';
import searchResultsPage from '../pages/Pesquisa-Produto';
import productPage from '../pages/ProdutoPage';
import checkoutPage from '../pages/CheckoutPage';

describe('Fluxo de Teste de CheckOut - Lojas Americanas (Cartão de Credito e Pix)', () => {

  beforeEach(function() {
    // Carrega a fixture e cria o alias ANTES DE CADA TESTE
    cy.fixture('checkoutData').as('data');

    // O resto da sua configuração de limpeza continua aqui
    cy.clearCookies({ log: true });
    cy.clearLocalStorage({ log:true });
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });

    cy.login();
    cy.visit('/');
  });

  it('Deve verificar e limpar o carrinho antes de iniciar a compra', function () {
    cy.task('log', '--> Verificando e limpando o carrinho...');

    cy.get('[data-testid="cart-toggle"]').click();
    
    cy.get('body').then(($body) => {
      // Verifica se existe algum item no carrinho
      if ($body.find('[data-testid="fs-cart-item"]').length > 0) {
        
        cy.task('log', 'Carrinho contém itens. Removendo...');
        cy.get('[data-testid="fs-cart-item"] [data-testid="fs-icon-button"]').first().click({ multiple: true, force: true });
        cy.get('[data-testid="fs-empty-state"]').should('be.visible').and('contain.text', 'Seu carrinho está vazio');

      } else {
        cy.task('log', 'Carrinho já está vazio. Nenhuma ação necessária.');
        cy.get('[data-testid="fs-empty-state"]').should('be.visible');
      }
    });

    cy.task('log', '--> Fechando a sidebar do carrinho.');
    cy.get('[data-testid="fs-cart-sidebar-button-close"]').click();
  });


  it('Deve buscar produto, aplicar filtros, adicionar ao carrinho e validar o checkout', function () {
    cy.task('log', '--> Executando busca de produto com filtros aplicados...');
    cy.log('Buscando produto:', this.data.produto);
    HomePage.searchFor(this.data.produto);
    searchResultsPage.applyPriceFilter('0-25');
    searchResultsPage.selectFirstProduct();
    cy.wait(5000);

    cy.task('log', '--> Verificando se é necessário calcular o frete...');
    cy.get('body').then(($body) => {
      if ($body.find('.ShippingSuccess_address__0Ktx5:visible').length === 0) {
        cy.task('log', 'Calculando o frete...');
        productPage.calculateShipping(this.data.cep);
      } else {
        cy.task('log', 'Frete já calculado.');
      }
    });

    cy.task('log', '--> Configurando quantidade e adicionando produto ao carrinho...');
    productPage.increaseQuantity('2');
    productPage.decreaseQuantity('1');
    productPage.addToCart();
    cy.wait(5000);
    cy.contains('button', 'continuar').should('be.enabled').click();

    cy.task('log', '--> Validando comportamento com cupom inválido...');
    checkoutPage.validateCoupon(this.data.invalid_coupon, 'inválido');

    cy.task('log', '--> Verificando valor total do carrinho...');
    cy.get('.new-product-price').invoke('text').as('precoProdutoTexto');
    cy.get('.srp-shipping-current-single__price').invoke('text').as('precoFreteTexto');

    cy.then(function () {
      const parsePrice = (text) => parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim());
      const total = parsePrice(this.precoProdutoTexto) + parsePrice(this.precoFreteTexto);
      const totalFormatado = total.toFixed(2).replace('.', ',');

      cy.task('log', `Valor esperado do total: R$ ${totalFormatado}`);
      checkoutPage.elements.totalValue().should('contain.text', totalFormatado);
    });

    cy.task('log', '--> Prosseguindo para perfil e tentativa de pagamento com cartão...');
    checkoutPage.proceedToProfile();
    checkoutPage.elements.profileTitle().should('be.visible');

    if (!Cypress.config('isInteractive')) {
      // Este bloco de código SÓ SERÁ EXECUTADO via terminal.
      cy.task('log', '--> EXECUTANDO EM MODO TERMINAL: Preenchendo dados de entrega...');

      // Adiciona uma espera para garantir que o campo esteja pronto
      cy.get('#ship-number', { timeout: 10000 }).should('be.visible').type("450");
      cy.get('#ship-receiverName').type("Icaro Teste");
      cy.get('#btn-go-to-payment').click();

    } else {
      // Este bloco é opcional, mas útil para saber o que aconteceu na UI interativa
      cy.task('log', '--> EXECUTANDO EM MODO INTERATIVO (UI): Pulando preenchimento extra de entrega.');
    }

    cy.get('#payment-group-creditCardPaymentGroup').click();


    checkoutPage.elements.creditCardOption().should('be.visible');
    cy.wait(3000);
    checkoutPage.fillCreditCardData(this.data.credit_card);
    checkoutPage.elements.submitPaymentButton().click();
    checkoutPage.elements.paymentErrorModal().should('contain.text', 'revise seus dados de pagamento');

    cy.reload();

    cy.task('log', '--> Realizando pagamento via PIX...');
    checkoutPage.elements.pixOption().click();
    checkoutPage.elements.submitPaymentButton().click();
    checkoutPage.elements.pixQRCode().should('be.visible');

    cy.get('.VTEX-PIX__button').click();
    cy.get('.VTEX-PIX__code-preview').invoke('text').then((codigo) => {
      // Usando cy.task para logar o código PIX no terminal
      cy.task('log', `Código PIX gerado: ${codigo}`);
      cy.wrap(codigo).as('codigoPix');
    });
  });
});