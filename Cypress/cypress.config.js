const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.americanas.com.br',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    setupNodeEvents(on, config) {
      // A tarefa 'log' para imprimir no terminal está correta.
      on('task', {
        log(message) {
          console.log(`[LOG] ${message}`); // [LOG] para diferenciar no terminal
          return null;
        },
      });

      // Carrega as variáveis de ambiente para o Cypress
      config.env = {
        ...config.env,
        ...process.env,
      };

      return config;
    },
  },
  // Aumenta o tempo limite padrão para comandos
  defaultCommandTimeout: 10000,
  // Desativa a segurança web do Chrome
  chromeWebSecurity: false,
});
