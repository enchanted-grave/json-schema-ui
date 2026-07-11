import { AttachInternals, Component, h, Prop, State } from '@stencil/core';
// import traverse from '@json-schema-tools/traverse';
import JsonSchemaDereferencer from '@json-schema-tools/dereferencer';
import { JSONSchema, JSONSchemaObject } from '@json-schema-tools/meta-schema';
import { JsonSchemaParser } from '../../utils/JsonSchemaParser';

@Component({
  tag: 'json-schema-ui',
  styleUrl: 'json-schema-ui.css',
  shadow: true,
  formAssociated: true, // TO DO: follow this spec.
})
export class JsonSchemaUI extends JsonSchemaParser {
  @Prop() schema: string; // TO DO: url
  @Prop() path?: string; // TO DO: url
  @State() schemaFile: JSONSchema;
  @AttachInternals() internals: ElementInternals;

  protected override parseArray(schema: JSONSchemaObject, key: string) {
    return <json-schema-ui-array schema={schema} keyName={key} />;
  }

  // protected override parseAnyOf(schema: JSONSchemaObject, key: string) {
  //   return
  // }

  async componentWillRender() {
    const schema = await fetch(this.schema).then(r => r.json());
    if (this.path) schema.$ref = this.path;
    const schemaResolved = await new JsonSchemaDereferencer(schema).resolve();
    this.schemaFile = schemaResolved;
  }

  componentDidLoad() {
    super.componentDidLoad();
  }

  render() {
    return <div>{this.parse(this.schemaFile)}</div>;
  }
}
