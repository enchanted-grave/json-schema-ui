import type { ArrayOfSimpleTypes, JSONSchema, JSONSchemaObject } from '@json-schema-tools/meta-schema';
import { h } from '@stencil/core';

export abstract class JsonSchemaParser {
  protected parseObject(schema: JSONSchemaObject, name: string) {
    return (
      <div>
        {schema.title ?? name}
        <ul>
          {Object.entries(schema.properties).map(entry => (
            <li>{this.parse(entry[1], entry[0])}</li>
          ))}
        </ul>
      </div>
    );
  }

  protected parseValue(schema: JSONSchema, name: string, jsx) {
    if (!schema || typeof schema === 'boolean') {
      return <div>Cannot load schema.</div>;
    }
    return (
      <div>
        <span>
          <b>{schema.title ?? name}</b>:{' '}
        </span>
        {jsx}
        <span>
          {' '}
          <i>{schema.description}</i>
        </span>
      </div>
    );
  }

  protected parseString(schema: JSONSchemaObject, name: string) {
    const jsx = (
      <input
        type="text"
        required
        minlength={schema.minLength}
        maxlength={schema.maxLength}
        pattern={schema.pattern}
        placeholder={schema.examples ? 'e.g. ' + schema.examples.join(', ') : ''}
      />
    );
    return this.parseValue(schema, name, jsx);
  }

  protected parseNumber(schema: JSONSchemaObject, name: string) {
    const jsx = <input type="number" id="" name="" min={schema.minimum ?? schema.exclusiveMinimum + 1} max={schema.maximum ?? schema.exclusiveMaximum} />;
    return this.parseValue(schema, name, jsx);
  }

  protected parseBoolean(schema: JSONSchemaObject, name: string) {
    const jsx = <input type="checkbox" id="" name="" />;
    return this.parseValue(schema, name, jsx);
  }

  protected parseArray(schema: JSONSchemaObject, name: string) {
    const container = this.parseValue(schema, name, <></>);
    const items = this.parse(schema.items, name);
    return (
      <div>
        <div>
          {container}
          {items}
        </div>
        {/*<button onClick={_ => this.addItem()}>Add new</button>*/}
      </div>
    );
  }

  protected parse(schema?: JSONSchema, name: string = 'root') {
    /* Special cases. */
    if (!schema) {
      return <div>Cannot load schema.</div>;
    } else if (typeof schema === 'boolean') {
      return <div>Cannot load schema.</div>;
    } else if (Array.isArray(schema)) {
      return schema.map(sch => this.parse(sch, 'type'));
    } else if (schema.enum) {
      //   console.log(schema);
    }
    /* Build html. */
    switch (schema.type) {
      case 'object':
        return this.parseObject(schema, name);
      case 'string':
        return this.parseString(schema, name);
      case 'number':
      case 'integer':
        return this.parseNumber(schema, name);
      case 'boolean':
        return this.parseBoolean(schema, name);
      case 'array':
        return this.parseArray(schema, name);
      case 'null':
        return <div>'null ???'</div>;
      default:
        /* We have handled ArrayOfSimpleTypes by handling array already above. */
        schema.type satisfies never | ArrayOfSimpleTypes;
    }
  }

  componentDidLoad() {}
}
