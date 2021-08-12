import { ID } from '../../src/constants/test';
import { API_URL } from '../../src/constants/api';

Cypress.Commands.add('addParticipant', ({ fixture, name, addressSearchKeyword }) => {
  cy.intercept('GET', `**/${API_URL.ADDRESS_SEARCH}/*`, { fixture });

  cy.get(`input[data-testid=${ID.PARTICIPANT_NAME}]`).type(name);
  cy.get(`input[data-testid=${ID.PARTICIPANT_ADDRESS}]`).click();

  cy.get(`input[data-testid=${ID.ADDRESS_SEARCH}]`).type(addressSearchKeyword);
  cy.get(`input[data-testid=${ID.ADDRESS_SEARCH}]`).siblings('button').click();

  cy.wait(2000);
  cy.get(`ul[data-testid=${ID.ADDRESS_SEARCH}]`).children().first().click();

  cy.get(`button[data-testid=${ID.PARTICIPANT_ADD_BUTTON}]`).click();
});
