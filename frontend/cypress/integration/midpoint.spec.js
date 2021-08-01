import { ID } from '../../src/constants/test';

describe('HomePage & MidpointPage', () => {
  before(() => {
    cy.visit('http://localhost:9000');
    sessionStorage.clear();
  });

  const participants = [
    { name: '하루', addressSearchKeyword: '잠실', fixture: 'addressSearchJamsil.json' },
    { name: '심바', addressSearchKeyword: '대치', fixture: 'addressSearchDaechi.json' },
  ];

  it('참석자 목록 추가 기능', () => {
    cy.wrap(participants).each((p, i) => {
      cy.addParticipant(p);

      cy.get(`ul[data-testid=${ID.PARTICIPANT_LIST}]`).contains('li', participants[i].name);

      i === 0
        ? cy.get(`button[data-testid='${ID.MIDPOINT_FINDER}']`).should('be.disabled')
        : cy.get(`button[data-testid='${ID.MIDPOINT_FINDER}']`).should('be.enabled');
    });
  });
});
