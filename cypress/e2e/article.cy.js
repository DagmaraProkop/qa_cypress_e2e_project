/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  const article = generateArticle();

  function generateArticle() {
    const randomNumber = Math.random().toString().slice(2, 8);
    const title = `Article title${randomNumber}`;
    const description = `This is an ${title} descrition`;
    const body = 'This a a random article';

    return { title, description, body };
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should be created using New Article form', () => {
    cy.getByDataCy('new-article-btn').click();

    articlePage.typeArticle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);

    articlePage.clickPublishBtn();

    cy.get('h1').should('contain.text', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.getByDataCy('new-article-btn').click();

    articlePage.typeArticle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);

    articlePage.clickPublishBtn();

    cy.get('h1').should('contain.text', article.title);

    cy.getByDataCy('username-link').click();

    cy.get('h1').should('contain.text', article.title).click();

    articlePage.clickEditBtn();

    cy.getByDataCy('article-editor').clear();
    articlePage.typeArticle('This is a new title');

    cy.getByDataCy('body-editor').clear();
    articlePage.typeBody('This is a new body');

    articlePage.clickPublishBtn();

    cy.get('h1').should('contain.text', 'This is a new title');
    cy.get('p').should('contain.text', 'This is a new body');
  });

  it('should be deleted using Delete button', () => {
    cy.getByDataCy('new-article-btn').click();

    articlePage.typeArticle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);

    articlePage.clickPublishBtn();

    cy.get('h1').should('contain.text', article.title);

    cy.getByDataCy('username-link').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('h1').should('contain.text', article.title).click();

    articlePage.clickDeleteBtn();

    cy.getByDataCy('username-link').click();

    cy.contains('No articles are here... yet.');
  });
});
