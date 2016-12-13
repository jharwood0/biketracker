import { BiketrackerPage } from './app.po';

describe('biketracker App', function() {
  let page: BiketrackerPage;

  beforeEach(() => {
    page = new BiketrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
