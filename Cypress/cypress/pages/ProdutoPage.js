class ProductPage {
  elements = {
    productTitle: () => cy.get('h1[class*="ProductInfoCenter_title"]'),
    productPrice: () => cy.get('div[class*="ProductPrice_productPrice"]'),
    cepInput: () => cy.get('input[data-testid="cep-input"]'),
    cepSubmitButton: () => cy.get('.ShippingInput_flexbox__SZptW > [data-testid="shipping-button"]'),
    shippingInfo: () => cy.get('div[class*="ShippingSuccess_shippingSuccess"]'),
    quantityIncreaseButton: () =>
      cy.get('button[data-testid="quantity-selector-increase"]'),
    quantityDecreaseButton: () =>
      cy.get('button[data-testid="quantity-selector-decrease"]'),
    quantityDisplay: () => cy.get('span[data-quantity-selector-message-value="true"]'),
    buyButton: () => cy.get('button[data-testid="buy-button"]'),
    cartSidebar: () => cy.get('h2').contains('minha cesta'),
  };

  validateProductDetails(productName, productPrice) {
    this.elements.productTitle().should('contain.text', productName.trim());
    this.elements.productPrice().should('contain.text', productPrice.trim());
  }

  calculateShipping(cep) {
    this.elements.cepInput().type(cep);
    this.elements.cepSubmitButton().click();
    this.elements.shippingInfo().should('be.visible');
  }

  increaseQuantity(expectedQuantity) {
    this.elements.quantityIncreaseButton().click();
    this.elements.quantityDisplay().should('contain.text', `${expectedQuantity} unidade`);
  }

  decreaseQuantity(expectedQuantity) {
    this.elements.quantityDecreaseButton().click();
    this.elements.quantityDisplay().should('contain.text', `${expectedQuantity} unidade`);
  }

  addToCart() {
    this.elements.buyButton().click();
    this.elements.cartSidebar().should('be.visible');
  }
}

export default new ProductPage();
