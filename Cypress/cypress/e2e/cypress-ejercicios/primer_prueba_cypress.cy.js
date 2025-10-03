/// <reference types="cypress" />

describe("Primer prueba de Cypress de UNTREF", () => {
    beforeEach(() => {
        // Interceptar cualquier petición a dominios de Optimizely (incluye subdominios dinámicos)
        cy.intercept('GET', /log\.optimizely\.com/, { statusCode: 200, body: '' }).as('Optimizely');

        // Interceptar cualquier endpoint que contenga /event (incluye query strings)
        cy.intercept('GET', /\/event/, { statusCode: 200, body: '' }).as('event');

        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it("Prueba de ejecución de Cypress", () => {
        cy.visit("https://the-internet.herokuapp.com/login");
        cy.get("#username").type("tomsmith");
        cy.get("#password").type("SuperSecretPassword!");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/secure");
        cy.get("#flash").should("contain.text", "You logged into a secure area!");
    });
});
