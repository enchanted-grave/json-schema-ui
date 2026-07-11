import { newSpecPage } from '@stencil/core/testing';
import { JsonSchemaUI } from '../json-schema-ui';

describe('json-schema-ui', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonSchemaUI],
      html: `<json-schema-ui></json-schema-ui>`,
    });
    expect(page.root).toEqualHtml(`
      <json-schema-ui>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </json-schema-ui>
    `);
  });
});
