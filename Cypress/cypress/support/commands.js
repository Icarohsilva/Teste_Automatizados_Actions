import homePage from '../pages/HomePage';
import loginPage from '../pages/LoginPage';

/**
 * @memberof cy
 * @method login
 * @description Realiza o login na plataforma Americanas.
 * @param {string} email - O email do usuário, obtido de Cypress.env()
 * @param {string} password - A senha do usuário, obtida de Cypress.env()
 */
Cypress.Commands.add(
  'login',
  (email = Cypress.env('USER_EMAIL'), password = Cypress.env('USER_PASSWORD')) => {
    cy.session(
      [email, password],
      () => {
        homePage.visit();
        homePage.goToLogin();
        loginPage.fillEmail(email);
        loginPage.fillPassword(password);
        loginPage.submit();

        // Valida que o login foi bem-sucedido
        homePage.elements.welcomeMessage().should('contain.text', 'olá');
      },
      {
        cacheAcrossSpecs: true,
      }
    );
  }
);
