import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getFizzBuzzInput() {
    return element(by.id('input-no'));
  }

  getPlayButton() {
    return element(by.id('play-button'));
  }

  getResultCard() {
    return element(by.id('result-card'));
  }

  getErrorCard() {
    return element(by.id('error-card'));
  }
}
