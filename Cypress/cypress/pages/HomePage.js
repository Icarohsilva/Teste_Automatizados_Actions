class HomePage {
  elements = {
    loginButton: () => cy.get('a[href="/login"]'),
    welcomeMessage: () => cy.get('.ButtonLogin_textContainer__7NZHr > :nth-child(1)'),
    searchInput: () => cy.get('input[placeholder="busque aqui seu produto"]'),
    // Novo seletor para os itens mais buscados
    topSearchesList: () => cy.get('[data-fs-search-top="true"]'),
    firstTopSearchItemLink: () =>
      cy.get('[data-fs-search-top-item="true"]').first().find('a'),
  };

  visit() {
    cy.visit('/');
  }

  goToLogin() {
    this.elements.loginButton().click();
    cy.contains('h2', 'login do cliente').should('be.visible');
    cy.contains('button', 'Entrar com email e senha').click();
  }

  searchFor(productName) {
    this.elements
      .searchInput()
      .should('be.visible')
      .clear()
      .type(productName)
      .type('{enter}');
  }

}

export default new HomePage();
