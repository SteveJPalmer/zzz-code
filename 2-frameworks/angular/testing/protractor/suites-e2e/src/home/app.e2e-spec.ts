import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await browser.get('http://localhost:4200/')
    expect(await page.getTitleText()).toEqual('This is Page1');
  });

});
