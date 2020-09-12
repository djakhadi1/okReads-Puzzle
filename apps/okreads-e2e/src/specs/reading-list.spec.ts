import { $, $$, browser, ExpectedConditions } from 'protractor';
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

  it('Then: I should undo addition in my reading list', async () => {
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
    const items = await $$('[data-testing="reading-list-container"]');
    expect(items.length).to.be.equal(1, 'at leat one');
  });

  it('Then: I should set marked as finished in my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const readinglistAdd = await $('#wantToRead_0');
    await readinglistAdd.click();
    const items = await $$('[data-testing="reading-list-container"]');
    if (items.length > 0) {
      const readingListToggle = await $('[data-testing="toggle-reading-list"]');
      await readingListToggle.click();
      const btnMarkAsFinish = await $('#markasFinish_0');
      //await btnMarkAsFinish.getAttribute('disabled').toBe(true)
      await btnMarkAsFinish.click();
      const buttonText = await readinglistAdd.getText();
      expect(buttonText).to.be.equal('Finished', 'Should equal');
    }
  });
});
