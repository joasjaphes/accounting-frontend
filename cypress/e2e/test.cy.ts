describe('Test landing page', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200');
    cy.get('button').contains('Create account').click()
    cy.get('input[ng-reflect-name="firstname"]').type('Joas');
    cy.get('input[ng-reflect-name="surname"]').type('Japhes');
  })
})