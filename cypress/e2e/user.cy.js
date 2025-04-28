/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import { generateUser, generateUser2 } from '../support/generate';
const signInPage = new SignInPageObject();

describe('User', () => {
  let user;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be able to follow the another user', () => {
    user = generateUser();
    user2 = generateUser2();

    cy.register(user.email, user.username, user.password);
    cy.register(user2.email2, user2.username2, user2.password2);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.wait(2000);

    cy.visit(`/#/@${user2.username2}/`);

    cy.getByDataCy('follow-btn').click();

    cy.getByDataCy('follow-btn').should('contain.text', 'Unfollow');
  });

  it('should be able to unfollow the another user', () => {
    user = generateUser();
    user2 = generateUser2();

    cy.register(user.email, user.username, user.password);
    cy.register(user2.email2, user2.username2, user2.password2);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.wait(2000);

    cy.visit(`/#/@${user2.username2}/`);

    cy.getByDataCy('follow-btn').click();

    cy.getByDataCy('unfollow-btn').click();
    cy.getByDataCy('follow-btn').should('contain.text', 'Follow');
  });
});
