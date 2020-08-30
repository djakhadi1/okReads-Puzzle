import { $, $$, browser, ExpectedConditions, element, by } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should able to add in my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const readinglistAdd = await $('#wantToRead_2');
    await readinglistAdd.click();
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const items = await $$('[data-testing="reading-list-container"]');
    expect(items.length).to.be.equal(1, 'at least one');
  });

  it('Then: I should able to view snack bar and add item', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const readinglistAdd = await $('#wantToRead_3');
    await readinglistAdd.click();
    const EC = ExpectedConditions;
    const snackBar = element(by.tagName('simple-snack-bar'));
    browser.wait(EC.visibilityOf(snackBar), 30000);
    element(by.tagName('simple-snack-bar'))
      .getText()
      .then(function(val) {
        expect(val).equal('Added');
        const items = $$('[data-testing="reading-list-container"]');
        expect(items.length).to.be.equal(1, 'at least one');
      });
  });

  it('Then: I should able to undo my action from snack bar', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const readinglistAdd = await $('#wantToRead_5');
    await readinglistAdd.click();
    const afteradditems = await $$('.reading-list-item');

    const EC = ExpectedConditions;
    const snackBar = element(by.css('.mat-simple-snackbar-action'));
    browser.wait(EC.visibilityOf(snackBar), 30000);

    snackBar.click().then(function(val) {
      const afterundoitems = $$('.reading-list-item');
      expect(afterundoitems.length).to.be.equal(afteradditems.length);
    });
  });
});
