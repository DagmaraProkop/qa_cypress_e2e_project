/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update username', () => {
    cy.getByDataCy('settings-link')
      .click();

    settingsPage.typeUsername(`${user.username}new`);
    settingsPage.clickUpdateBtn();

    homePage.assertHeaderContainUsername(`${user.username}new`);
    settingsPage.clickLogoutBtn();
  });

  it('should provide an ability to update bio', () => {
    cy.getByDataCy('settings-link')
      .click();

    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title')
      .should('contain.text', 'Update successful!');

    cy.contains('OK').click();

    cy.getByDataCy('settings-link')
      .click();

    cy.getByDataCy('bio-settings').should('have.value', 'This is a new bio');
    settingsPage.clickLogoutBtn();
  });

  it('should provide an ability to update an email', () => {
    cy.getByDataCy('settings-link')
      .click();

    settingsPage.typeEmail(`new${user.email}`);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title')
      .should('contain.text', 'Update successful!');

    cy.contains('OK').click();

    settingsPage.clickLogoutBtn();
    signInPage.visit();

    signInPage.typeEmail(`new${user.email}`);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.getByDataCy('settings-link')
      .click();

    cy.getByDataCy('email-settings').should('have.value', `new${user.email}`);
    settingsPage.clickLogoutBtn();
  });

  it('should provide an ability to update password', () => {
    cy.getByDataCy('settings-link')
      .click();

    settingsPage.typePassword(`new${user.password}`);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title')
      .should('contain.text', 'Update successful!');

    cy.contains('OK').click();

    settingsPage.clickLogoutBtn();
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(`new${user.password}`);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
    cy.getByDataCy('settings-link')
      .click();

    settingsPage.clickLogoutBtn();
  });

  it('should provide an ability to log out', () => {
    homePage.assertHeaderContainUsername(user.username);

    cy.getByDataCy('settings-link')
      .click();

    settingsPage.clickLogoutBtn();

    cy.getByDataCy('login-link')
      .should('exist');
  });
});
