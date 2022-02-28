describe('Web Automation', function () {
    it('Verify response payload', function () {

        cy.intercept('POST', '/api/accommodation/property/search').as('searchAPI');

        cy.visit("https://next-staging.almosafer.com/mweb/chalets/search?cityId=24&lang=en");

        cy.get('[data-testid=searchResults_PropertyCard_0_name]').then(($div) => {
            let propertyName = $div.text();
            cy.wait('@searchAPI').then(($func) => {
                let response = $func.response.body.properties;
                let propertyId = Object.keys(response)[0];
                expect(response[propertyId].nameEn, 'nameEn is matched').to.eq(propertyName);
            });

        });

    });

        it('Verify request payload', function () {

            let username =  "966788131428";
            let password = "Test@123";

            cy.intercept('POST', 'api/c2c-host/user/login').as('loginAPI');

            cy.visit("https://host-staging.almosafer.com/mweb/account/login?lang=en");

            cy.get('[data-testid=login_phoneNumberInput_input]').type(username);
            cy.get('[data-testid=login_passwordInput_input]').type(password);
            cy.get('[data-testid=login_cta]').click();

            cy.wait('@loginAPI').then(($login) => {
                let payload = $login.request.body;
                expect(payload.username, 'username matched').to.eq(username);
                expect(payload.password, 'password matched').to.eq(password);
            });


        });
    

});