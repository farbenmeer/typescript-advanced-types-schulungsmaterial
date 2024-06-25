interface MyCustomObject {
  foo: string;
  bar: number;
}

function isMyCustomObject(obj: object): obj is MyCustomObject {
  return typeof obj === 'object' && obj !== null;
}

const obj = { foo: 'bar' };

if (isMyCustomObject(obj)) {
  obj.foo
}
