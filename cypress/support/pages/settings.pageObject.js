import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .clear()
      .type(password);
  }

  typeUsername(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  typeBio(newBio) {
    this.bioField
      .clear()
      .type(newBio);
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }
}

export default SettingsPageObject;
