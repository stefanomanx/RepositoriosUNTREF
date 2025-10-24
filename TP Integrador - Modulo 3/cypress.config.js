const { defineConfig } = require('cypress');

// Configuración mínima para que Cypress encuentre las specs creadas
// Ajusta `specPattern` si mueves los tests a otra carpeta.
module.exports = defineConfig({
  e2e: {
    // Tus tests están en la carpeta 'Cypress/cypress/e2e' dentro del proyecto
    specPattern: 'Cypress/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // desactivar supportFile si no lo tienes creado (o apunta al archivo correspondiente)
    supportFile: false,
  },
});
