import { ID } from '../../src/constants/test';
import { API_URL } from '../../src/constants/api';

describe('HomePage & MidpointPage', () => {
  before(() => {
    cy.visit('http://localhost:9000');
    sessionStorage.clear();

    const $noticeModalCloseButton = cy.get(`button[data-testid=${ID.NOTICE_MODAL_CLOSE_BUTTON}]`);

    if ($noticeModalCloseButton) {
      $noticeModalCloseButton.click();
    }
    // TODO: 모달 표시여부 상관없이 대응 가능하도록 수정
    /*
    const noticeModalCloseButtonSelector = `button[data-testid=${ID.NOTICE_MODAL_CLOSE_BUTTON}]`;
    cy.get('button').then(($buttons) => {
      if ($buttons.find(noticeModalCloseButtonSelector).length) {
        cy.get(noticeModalCloseButtonSelector).click();
      }
    });
    */
  });

  const participants = [
    { name: '하루', addressSearchKeyword: '잠실', fixture: 'addressSearchJamsil.json' },
    { name: '심바', addressSearchKeyword: '대치', fixture: 'addressSearchDaechi.json' },
  ];

  it('참석자 목록 추가 기능', () => {
    cy.wrap(participants).each((p, i) => {
      cy.addParticipant(p);

      cy.get(`ul[data-testid=${ID.PARTICIPANT_LIST}]`).contains('li', participants[i].name);
    });
  });

  it('중간 지점 찾기 기능', () => {
    cy.intercept('POST', `**/${API_URL.MIDPOINT}`, { fixture: 'midpoint.json' });
    cy.fixture('midpoint').then((midpoint) => {
      cy.intercept('GET', `**/${API_URL.CATEGORY('지하철역', midpoint)}/*`, { fixture: 'midpointStation.json' });
      cy.intercept('GET', `**/${API_URL.CATEGORY('카페', midpoint)}/*`, { fixture: 'midpointCafe.json' });
      cy.intercept('GET', `**/${API_URL.CATEGORY('음식점', midpoint)}/*`, { fixture: 'midpointDining.json' });
      cy.intercept('GET', `**/${API_URL.CATEGORY('문화시설', midpoint)}/*`, { fixture: 'midpointParty.json' });
    });

    cy.get(`button[data-testid=${ID.MIDPOINT_FINDER}]`).click();

    cy.location().should((location) => expect(location.pathname).to.eq('/midpoint'));
    cy.wait(2000);
    cy.get(`[data-testid=${ID.PIN_STATION}]`).should('have.length', 1).should('be.visible');
    cy.get(`[data-testid=${ID.PIN_PARTICIPANT}]`).should('have.length', participants.length).should('be.visible');

    cy.get(`li[data-testid=${ID.CHIP_CAFE}]`).click();
    cy.wait(2000);
    cy.get(`[data-testid=${ID.PIN_CAFE}]`).its('length').should('gte', 1);

    cy.get(`li[data-testid=${ID.CHIP_DINING}]`).click();
    cy.wait(2000);
    cy.get(`[data-testid=${ID.PIN_DINING}]`).its('length').should('gte', 1);
    cy.get(`[data-testid=${ID.PIN_CAFE}]`).its('length').should('gte', 1);

    cy.get(`li[data-testid=${ID.CHIP_DEFAULT}]`).click();
    cy.wait(2000);
    cy.get(`[data-testid=${ID.PIN_DINING}]`).should('not.exist');
    cy.get(`[data-testid=${ID.PIN_CAFE}]`).should('not.exist');
    cy.get(`[data-testid=${ID.PIN_STATION}]`).should('have.length', 1).should('be.visible');
    cy.get(`[data-testid=${ID.PIN_PARTICIPANT}]`).should('have.length', participants.length).should('be.visible');
  });
});
