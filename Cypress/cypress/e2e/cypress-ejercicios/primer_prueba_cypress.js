
describe ("Pruebas de Cypress de UNTREF", () => {

    it("prueba de ejecucion de cypress",()=>{

    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!")

})



})