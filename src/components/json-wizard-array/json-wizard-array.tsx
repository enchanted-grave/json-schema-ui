import { Component, Prop, State, h } from '@stencil/core';
import { JSONSchemaObject } from '@json-schema-tools/meta-schema';
import { JsonSchemaParser } from '../../utils/JsonSchemaParser';
import { UUID } from 'crypto';

@Component({
  tag: 'json-wizard-array',
  styleUrl: 'json-wizard-array.css',
  shadow: true,
})
export class JsonWizardArray extends JsonSchemaParser {
  $container: HTMLDivElement;

  @Prop() schema: JSONSchemaObject;
  @Prop() name: string;
  @State() items = []; // by ID.

  parseItem(itemID: UUID) {
    return (
      <fieldset>
        {this.parse(this.schema.items, this.name)}
        <button onClick={e => this.deleteItem(itemID)}>Delete</button>
      </fieldset>
    );
  }

  addItem() {
    this.items = [...this.items, crypto.randomUUID()];
  }

  deleteItem(item: UUID) {
    this.items = this.items.filter(id => id !== item); // Is it sustainable?
  }

  render() {
    return (
      <div>
        <div>{this.schema.title}</div>
        <div ref={el => (this.$container = el)}>{this.items.map((itemID: UUID) => this.parseItem(itemID))}</div>
        <button onClick={_ => this.addItem()}>Add new</button>
      </div>
    );
  }
}
