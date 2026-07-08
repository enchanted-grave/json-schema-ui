import { newSpecPage } from '@stencil/core/testing';
import { JsonWizard } from '../json-wizard';

describe('json-wizard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonWizard],
      html: `<json-wizard></json-wizard>`,
    });
    expect(page.root).toEqualHtml(`
      <json-wizard>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </json-wizard>
    `);
  });
});
