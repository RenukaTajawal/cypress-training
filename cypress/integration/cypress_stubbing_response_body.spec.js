describe('Web Automation', function () {
    it('Verify UI layer by mocking json response object', function () {
        cy.intercept('GET', '/api/enigma/content/hotels/summaries**', {
            statusCode: 400,
            body: {
                path: "/api/enigma/content/hotels/summaries",
                status: 400,
                error: "Method not allowed",
                errorCodes: ["1004"]
            }
        }).as('mockResponse');

        cy.visit("https://www.almosafer.com/mweb/hotels/Dubai/22-03-2022/23-03-2022/2_adult");

        cy.get('[data-testid="error_SearchInterruptedModal_primaryAction"]').should('be.visible');
    });

});