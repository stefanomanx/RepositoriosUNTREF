require("cypress-xpath")

describe("Segunda prueba de Cypress de UNTREF", () => {
    beforeEach(() => {
        // Interceptar cualquier petición a dominios de Optimizely (incluye subdominios dinámicos)
        cy.intercept('GET', /log\.optimizely\.com/, { statusCode: 200, body: '' }).as('OPTIMIZELY');

        // Interceptar cualquier endpoint que contenga /event (incluye query strings)
        cy.intercept('GET', /\/event/, { statusCode: 200, body: '' }).as('EVENTO');

        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it("Prueba de ejecución de Cypress", () => {
        cy.visit("https://the-internet.herokuapp.com/login");
        cy.get("#username").type("tomsmith");
        cy.get("#password").type("SuperSecretPassword!");
        cy.xpath("//button[@type='submit']").click();
        cy.screenshot("Evidencia_1").as('CAPTURA');

        cy.url().should("include", "/secure").as('ASERCIÓN');
        cy.get("#flash").should("contain.text", "You logged into a secure area!").as('ASERCIÓN');
    });

    it("Comandos: select y click", () => {
        cy.visit("https://blazedemo.com/");
        cy.get("select[name='fromPort']").select("San Diego");
        cy.get("select[name='toPort']").select("Buenos Aires");
        cy.xpath("//input[@type='submit']").click();
        cy.screenshot("Evidencia_2").as('CAPTURA');

        cy.contains("Flights from San Diego to Buenos Aires:").should("be.visible").as('ASERCIÓN');
    });

    it("Comandos: check y uncheck", () => {
        cy.visit("https://validaciones.rodrigovillanueva.com.mx/Radios_Ok.html");
        cy.get("input[value='opcion1']").check().should("be.checked").as('ASERCIÓN');
        cy.get("input[value='opcion2']").check().should("be.checked").as('ASERCIÓN');
        cy.get("input[value='opcionA']").check().should("be.checked").as('ASERCIÓN');
        cy.get("input[value='opcionB']").check().should("be.checked").as('ASERCIÓN');
        cy.get("input[value='opcionB']").uncheck().should("not.be.checked").as('ASERCIÓN');

        cy.screenshot("Evidencia_3").as('CAPTURA');
    });

    it("Comandos: dropdown y select", () => {
        cy.visit("https://the-internet.herokuapp.com/dropdown");
        cy.get('#dropdown').select('1').should('have.value', '1').as('ASERCIÓN');
        cy.get('#dropdown').select('2').should('have.value', '2').as('ASERCIÓN');

        cy.screenshot('Evidencia_4').as('CAPTURA');
    });

    it('Comandos: focus y blur', () => {
        cy.visit('https://the-internet.herokuapp.com/inputs');
        cy.get('input[type="number"]').focus().should('be.focused').as('ASERCIÓN');
        cy.get('input[type="number"]').blur().should('not.be.focused').as('ASERCIÓN');

        cy.screenshot('Evidencia_5').as('CAPTURA');
    });

    it('Comandos: dblclick y rightclick', () => {
        cy.visit('https://the-internet.herokuapp.com/context_menu');
        // Doble clic: usar un elemento cualquiera, el sitio no tiene dblclick demo
        cy.get('body').dblclick();
        cy.get('#hot-spot').rightclick().should(() => {
            // No-op assert, sólo demostración; el sitio muestra alert que aceptamos
        });

        cy.screenshot('Evidencia_6').as('CAPTURA');
    });

    it('Comandos: scrollTo y trigger', () => {
        cy.visit('https://the-internet.herokuapp.com/large');
        cy.scrollTo('bottom');
        cy.xpath('//*[@id="page-footer"]/div/div/a').trigger('mouseover');

        cy.screenshot('Evidencia_7').as('CAPTURA');
    });

    it('Comandos: submit y wait', () => {
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('SuperSecretPassword!');
        cy.get('form').submit();
        cy.wait(500);
        cy.url().should('include', '/secure').as('ASERCIÓN');

        cy.screenshot('Evidencia_8').as('CAPTURA');
    });

    it('Comando: invoke', () => {
        cy.visit('https://the-internet.herokuapp.com/');
        // Invocar y verificar longitud mayor a 10
        cy.get('h1').invoke('text').then((txt) => {
            expect(txt.length).to.be.greaterThan(10);

        cy.screenshot('Evidencia_9').as('CAPTURA');
        });
    });

});