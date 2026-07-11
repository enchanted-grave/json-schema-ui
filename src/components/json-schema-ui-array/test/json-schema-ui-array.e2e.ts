import { newE2EPage } from '@stencil/core/testing';

describe('json-schema-ui-array', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<json-schema-ui-array></json-schema-ui-array>');

    const element = await page.find('json-schema-ui-array');
    expect(element).toHaveClass('hydrated');
  });
});
