// cypress/pages/CheckoutPage.js

class CheckoutPage {
  // O checkout da Americanas/VTEX usa iframes e uma arquitetura mais antiga.
  // Os seletores são mais complexos e podem exigir tempos de espera maiores.

  elements = {
    // Tela /checkout#/cart
    couponInput: () => cy.get('.full-cart > .summary-template-holder > .row-fluid > .span5 > .coupon-column > .coupon > .coupon-form > .coupon-fieldset > div > .coupon-fields > [data-bind="visible: !isCouponTyped()"] > #cart-coupon'),
    addCouponButton: () => cy.get('.full-cart > .summary-template-holder > .row-fluid > .span5 > .coupon-column > .coupon > .coupon-form > .coupon-fieldset > div > .coupon-fields > [data-bind="visible: !isCouponTyped()"] > #cart-coupon-add'),
    couponErrorMessage: () => cy.get('.vtex-front-messages-detail'),
    totalValue: () => cy.get('td.monetary[data-bind*="totalLabel"]'),
    goToPaymentButton: () => cy.get('#cart-to-orderform').should('be.visible'),

    // Tela /checkout#/profile
    profileTitle: () =>
      cy.get('#orderform-title', { timeout: 20000 }).contains('Finalizar compra'),
    goToShippingButton: () => cy.get('#go-to-shipping'),


    // Tela /checkout#/payment
    creditCardOption: () => cy.get('#payment-group-creditCardPaymentGroup'),
    creditCardNumber: () => cy.get('input[name="cardNumber"]'),
    creditCardName: () => cy.get('input[name="ccName"]'),
    creditCardMonth: () => cy.get('select[name="cardExpirationMonth"]'),
    creditCardYear: () => cy.get('select[name="cardExpirationYear"]'),
    creditCardCVC: () =>
      cy.get('input[name="cardExpirationYear"]').parent().parent().next().find('input'),
    submitPaymentButton: () => cy.get('[data-bind="fadeVisible: !window.router.sac.isActive() && window.paymentData.isPaymentButtonVisible(), click: submit, disable: window.checkout.disablePaymentButton"]'),
    paymentErrorModal: () => cy.get('.payment-unauthorized-hello'),
    pixOption: () => cy.get('#payment-group-instantPaymentPaymentGroup'),
    pixQRCode: () => cy.get('.VTEX-PIX_qrcode-image'),
  };

  validateCoupon(couponCode, expectedMessage) {
    this.elements.couponInput().click();
    this.elements.couponInput().type(couponCode);
    this.elements.addCouponButton().click();
    this.elements.couponErrorMessage().should('contain.text', expectedMessage);
  }

  proceedToProfile() {
    this.elements.goToPaymentButton().click();
    
  }

  fillCreditCardData(card) {
      // Defina o seletor do seu iframe aqui
      const iframeSelector = '#iframe-placeholder-creditCardPaymentGroup iframe';

      cy.log('Preenchendo dados do cartão de crédito dentro do iframe...');

      // Aguarda o iframe ser carregado
      cy.iframe(iframeSelector).find('#creditCardpayment-card-0Number').type(card.number);
      cy.iframe(iframeSelector).find('#creditCardpayment-card-0Name').type(card.name);
      cy.iframe(iframeSelector).find('select#creditCardpayment-card-0Brand').select('1');
      cy.iframe(iframeSelector).find('select[name="cardExpirationMonth"]').select(card.expiry_month);
      cy.iframe(iframeSelector).find('select[name="cardExpirationYear"]').select(card.expiry_year);
      cy.iframe(iframeSelector).find('input[id="creditCardpayment-card-0Code"]').type(card.cvc);
      cy.iframe(iframeSelector).find('input[data-testid="holder-document-0"]').type(card.cpf);
      cy.iframe(iframeSelector).contains('button', 'sim, o número está correto').should('be.visible').and('be.enabled').click();
  }

}

export default new CheckoutPage();
