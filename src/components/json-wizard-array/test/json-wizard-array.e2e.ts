import { newE2EPage } from '@stencil/core/testing';

describe('json-wizard-array', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<json-wizard-array></json-wizard-array>');

    const element = await page.find('json-wizard-array');
    expect(element).toHaveClass('hydrated');
  });
});
