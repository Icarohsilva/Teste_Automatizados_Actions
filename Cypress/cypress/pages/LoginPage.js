class LoginPage {
  elements = {
    emailInput: () => cy.get('input[placeholder*="exemplo@mail.com"]'),
    passwordInput: () => cy.get('input[type="password"]'),
    submitButton: () => cy.get('button[type="submit"]').contains('Entrar'),
    errorMessage: () => cy.get('div.vtex-login-2-x-formError'),
  };

  fillEmail(email) {
    this.elements.emailInput().type(email);
  }

  fillPassword(password) {
    this.elements.passwordInput().type(password);
  }

  submit() {
    this.elements.submitButton().click();
  }
}

export default new LoginPage();
