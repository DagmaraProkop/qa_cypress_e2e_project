import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('email-signup');
  }

  get passwordField() {
    return cy.getByDataCy('password-signup');
  }

  get usernameField() {
    return cy.getByDataCy('username-signup');
  }

  get signUpBtn() {
    return cy.getByDataCy('signup-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }
}

export default SignUpPageObject;
