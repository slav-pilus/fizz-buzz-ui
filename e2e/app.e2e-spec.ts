import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('fizz-buzz-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(true);

    page = new AppPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Welcome to FizzBuzz!');
  });

  it('should display result', function () {
    page.getFizzBuzzInput().sendKeys('15');
    page.getPlayButton().click();

    expect(page.getResultCard().isDisplayed()).toBeTruthy();
    expect(page.getErrorCard().isPresent()).toBeFalsy();
  });

  it('should not allow non-numeric input', function () {
    page.getFizzBuzzInput().sendKeys('not a number');
    page.getPlayButton().click();

    browser.sleep(10000);

    expect(page.getResultCard().isPresent()).toBeFalsy();
    expect(page.getErrorCard().isPresent()).toBeFalsy();
  });
});
