import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be correct version number', () => {
    page.navigateTo();
    expect(page.getVersionElem()).toContain('Beta 0.0.1-L');
  });
});
