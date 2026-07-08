import { newSpecPage } from '@stencil/core/testing';
import { JsonWizardArray } from '../json-wizard-array';

describe('json-wizard-array', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonWizardArray],
      html: `<json-wizard-array></json-wizard-array>`,
    });
    expect(page.root).toEqualHtml(`
      <json-wizard-array>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </json-wizard-array>
    `);
  });
});
