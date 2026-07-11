import { newSpecPage } from '@stencil/core/testing';
import { JsonSchemaUIArray } from '../json-schema-ui-array';

describe('json-schema-ui-array', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonSchemaUIArray],
      html: `<json-schema-ui-array></json-schema-ui-array>`,
    });
    expect(page.root).toEqualHtml(`
      <json-schema-ui-array>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </json-schema-ui-array>
    `);
  });
});
