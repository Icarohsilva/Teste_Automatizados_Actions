import homePage from '../pages/HomePage';
import loginPage from '../pages/LoginPage';

describe('Autenticação do Usuário', () => {
  beforeEach(() => {
    homePage.visit();
    homePage.goToLogin();
  });

  it('Deve exibir erro ao tentar logar com campos vazios', () => {
    cy.log('Submetendo formulário sem preencher campos...');
    loginPage.submit();
    loginPage.elements.errorMessage().should('contain.text', 'Entre com um email válido');
  });

  it('Deve exibir erro ao tentar logar com senha incorreta', () => {
    loginPage.fillEmail(Cypress.env('CYPRESS_USER'));
    loginPage.fillPassword('senha-incorreta');
    cy.log('Submetendo formulário com senha inválida...');
    loginPage.submit();
    loginPage.elements.errorMessage().should('contain.text', 'Usuário e/ou senha incorretos');
  });

  it('Deve realizar login com sucesso', () => {
    loginPage.fillEmail(Cypress.env('CYPRESS_USER'));
    loginPage.fillPassword(Cypress.env('CYPRESS_PASSWORD'));
    cy.log('Realizando login com credenciais válidas...');
    loginPage.submit();
    cy.url().should('eq', 'https://www.americanas.com.br/');
    homePage.elements.welcomeMessage().should('be.visible').and('contain.text', 'olá');
  });
});
