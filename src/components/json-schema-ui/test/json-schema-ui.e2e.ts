import { newE2EPage } from '@stencil/core/testing';

describe('json-schema-ui', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<json-schema-ui></json-schema-ui>');

    const element = await page.find('json-schema-ui');
    expect(element).toHaveClass('hydrated');
  });
});
