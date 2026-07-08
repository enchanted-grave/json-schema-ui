import { newE2EPage } from '@stencil/core/testing';

describe('json-wizard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<json-wizard></json-wizard>');

    const element = await page.find('json-wizard');
    expect(element).toHaveClass('hydrated');
  });
});
