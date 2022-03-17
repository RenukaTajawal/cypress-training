it('Enter the details and verify request payload', function () {
    let username = "966788131428";
    let password = "Test@123";

    cy.visit("https://host-staging.almosafer.com/mweb/account/login?lang=en");
    cy.get('[data-testid=login_phoneNumberInput_input]').type(username);
    cy.get('[data-testid=login_passwordInput_input]').type(password);

    cy.intercept('POST', 'api/c2c-host/user/login').as('loginAPI');
    cy.get('[data-testid=login_cta]').click();
    cy.wait('@loginAPI').then(($login) => {
        let payload = $login.request.body;
        expect(payload.username, 'username matched').to.eq(username);
        expect(payload.password, 'password matched').to.eq(password);
    });
});