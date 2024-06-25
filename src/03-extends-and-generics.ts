
/*
 * the `extends` keyword defines, that the left hand side is included in the right hand side
 * for example: A extends B means A is assignable to B but not necessarily that B is assignable to A
 * extends narrows types by making them more specific. It is similar to intersections.
 *
 * extends can be used in multiple places. It can be used as a constraint, a conditional and as an
 * `extends clause` for classes and interfaces.
 *
 * it is often confused with inheritance, but that is a nominal concept and does not exist in the typescript
 * type system
 */

interface A {
  foo: string;
}

interface B extends A {
  bar: number;
}

/* is the same as */

interface C {
  foo: string;
}

type D = { bar: number } & C;

/*
 * An extends clause has specific restrictions, that do not apply to other usecases.
 * They can only extend object types or intersections of object types with statically known members.
 */
type HasFooOrBar = { foo: number } | { bar: string }
type HasFooAndBar = { foo: number; bar: string }

// @ts-expect-error
interface HasFooOrBarInvalid extends HasFooOrBar { }
type HasFooOrBarValid = HasFooOrBar & { baz: boolean; }

/*
 * type parameters or generics are a way of parameterising types to reuse them.
 * the most common use case are container types. a list, for example.
 */
interface MyList<T> {
  items: T[]
  addItem(item: T): void
  removeItem(item: T): void
}

/*
 * type parameters can be used in functions, types, classes and interfaces
 */
class Container<T> {
  item!: T
}

type TypeOrString<T> = T | string

function addItem<T>(list: T[], item: T) {
  list.push(item)
}

/*
 * the first use of a type parameter in functions determines its type, if not explicitly set
 * this errors because 4 is not assignable to string
 */

// @ts-expect-error
addItem(["a", "b"], 4)
/* does not error because T becomes string | number explicitly */
addItem<string | number>(["a", "b"], 4);

/*
 * if you need more than one type parameter, you can separate them with commas
 */
type AorB<A, B> = A | B

/*
 * extends can be used to narrow the type of a type parameter
 */
type GetterName<T extends string> = `get${Capitalize<T>}`

/*
 * this type is "getFoo" | "getBar"
 */
type SomeGetters = GetterName<"foo" | "bar">

/* 5 doesn't extend string */
// @ts-expect-error
type OtherGetters = GetterName<5>

/*
 * extends can even be used with generics themselves
 */
function getPropertyValue<
  T extends object,
  Key extends keyof T,
>(obj: T, key: Key) {
  return obj[key]
}

/* correctly infers the type `number` */
const x = getPropertyValue({ foo: 5, bar: "baz" }, "foo")



export {}
