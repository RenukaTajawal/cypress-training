describe('Web Automation', function () {
    it('Verify UI layer by mocking json response object', function () {

        cy.intercept('GET', '/api/accommodation/property/details**', { fixture: 'apiHandler/mock_amenities_lessData.json' }).as('mockSearch');

        cy.visit("https://www.almosafer.com/mweb/chalet/details?propertyId=387&cityId=24&checkIn=24-03-2022&checkOut=25-03-2022&lang=en");
        cy.get('[data-testid="propertyDetails_seeAllAmenitiesClick"]').should('not.exist');

    });
});