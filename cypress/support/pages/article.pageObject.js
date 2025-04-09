import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-editor');
  }

  get descriptionField() {
    return cy.getByDataCy('description-editor');
  }

  get bodyField() {
    return cy.getByDataCy('body-editor');
  }

  get tagsField() {
    return cy.getByDataCy('tags-editor');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-btn');
  }

  get editBtn() {
    return cy.contains('Edit Article');
  }

  get deleteBtn() {
    return cy.contains('Delete Article');
  }

  typeArticle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  typeTags(tags) {
    this.tagsField
      .type(tags);
  }

  clickPublishBtn() {
    this.publishBtn
      .click();
  }

  clickEditBtn() {
    this.editBtn
      .click();
  }

  clickDeleteBtn() {
    this.deleteBtn
      .click();
  }
}

export default ArticlePageObject;
