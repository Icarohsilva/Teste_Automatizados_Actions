// ***********************************************************
// This is a support file that is loaded automatically before your test files.
// You can use this file to load global configurations and behaviors that modify Cypress.
// You can change the location of this file or turn off automatically serving support files with the
// 'supportFile' configuration option.
// You can read more here: https://on.cypress.io/configuration
// ***********************************************************

// Importa o arquivo de comandos customizados
import './commands';
import 'cypress-iframe';

const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}


Cypress.on('uncaught:exception', (err, runnable) => {
  // Agora verificamos se a mensagem de erro é a de 'email' OU a nova de 'Unexpected token'
  if (
    err.message.includes("Cannot read properties of undefined (reading 'email')") ||
    err.message.includes("Unexpected token '.'")
  ) {
    console.log('Cypress detected and ignored an application error: ', err);
    // Retornar false impede que o Cypress falhe o teste para qualquer um desses erros.
    return false;
  }
});