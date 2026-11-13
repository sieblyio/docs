import test from 'node:test';
import assert from 'node:assert/strict';
import { findDocumentedReflection } from './reference-overrides.mjs';

test('preserves the native TypeDoc lookup for ordinary declarations', () => {
  const expected = { name: 'submitOrder' };
  const project = {
    getChildByName: (parts) => {
      assert.deepEqual(parts, ['Client', 'submitOrder']);
      return expected;
    },
  };
  assert.equal(
    findDocumentedReflection(project, ['Client', 'submitOrder']),
    expected,
  );
});

test('resolves inline object properties without changing the model', () => {
  const target = { name: 'minOrderAmt' };
  const declaration = { children: [target] };
  const project = {
    getChildByName: () => undefined,
    children: [
      {
        name: 'Instrument',
        children: [
          { name: 'lotSizeFilter', children: [], type: { declaration } },
        ],
      },
    ],
  };
  const before = JSON.stringify(project);
  assert.equal(
    findDocumentedReflection(project, [
      'Instrument',
      'lotSizeFilter',
      'minOrderAmt',
    ]),
    target,
  );
  assert.equal(
    findDocumentedReflection(project, [
      'Instrument',
      'lotSizeFilter',
      'missing',
    ]),
    undefined,
  );
  assert.equal(
    findDocumentedReflection(project, ['Missing', 'lotSizeFilter']),
    undefined,
  );
  assert.equal(JSON.stringify(project), before);
});

test('resolves variable object properties and nested inline objects', () => {
  const target = { name: 'enabled' };
  const project = {
    getChildByName: () => undefined,
    children: [
      {
        name: 'OPTIONS',
        type: {
          declaration: {
            children: [
              {
                name: 'connection',
                type: { declaration: { children: [target] } },
              },
            ],
          },
        },
      },
    ],
  };
  assert.equal(
    findDocumentedReflection(project, ['OPTIONS', 'connection', 'enabled']),
    target,
  );
});

test('resolves nested inline method parameters without choosing an overload', () => {
  const outcome = { name: 'outcome' };
  const params = {
    name: 'params',
    type: { declaration: { children: [outcome] } },
  };
  const method = {
    name: 'getMaxBuySellAmount',
    signatures: [{ parameters: [params] }],
  };
  const project = {
    getChildByName: () => undefined,
    children: [{ name: 'RestClient', children: [method] }],
  };
  assert.equal(
    findDocumentedReflection(project, [
      'RestClient',
      'getMaxBuySellAmount',
      'params',
      'outcome',
    ]),
    outcome,
  );
  method.signatures.push({ parameters: [{ ...params }] });
  assert.equal(
    findDocumentedReflection(project, [
      'RestClient',
      'getMaxBuySellAmount',
      'params',
      'outcome',
    ]),
    undefined,
  );
});

test('resolves literal dotted protocol names and their nested properties', () => {
  const property = { name: 'result' };
  const operation = {
    name: 'account.status',
    type: { declaration: { children: [property] } },
  };
  const project = {
    getChildByName: () => undefined,
    children: [{ name: 'ResponseMap', children: [operation] }],
  };
  assert.equal(
    findDocumentedReflection(project, ['ResponseMap', 'account', 'status']),
    operation,
  );
  assert.equal(
    findDocumentedReflection(project, [
      'ResponseMap',
      'account',
      'status',
      'result',
    ]),
    property,
  );
  assert.equal(
    findDocumentedReflection(project, ['ResponseMap', 'missing', 'status']),
    undefined,
  );
});
