/*
 * the extends keyword can be used as a conditional type.
 * are you familiar with a ternary expression?
 * 
 *    const a = someCondition ? trueValue : falseValue
 * 
 * if you are, think of conditional types as ternary expressions,
 * except conditions must and must only contain one `extends` keyword
 * and only types can be used as the resulting "values".
 */

type ArrayWrap<T> = T extends any[] ? T : T[]

type StringArray = ArrayWrap<string>
type AnotherStringArray = ArrayWrap<string[]>

/*
 * what this does is it replaces any occurance of T with string or string[] respectively.
 * 
 * for string, it checks if string extends any[], which it does not. it is not an array type!
 * so it goes into the "falseValue" section of this ternary, the T[], replaced as string[].
 * the result is string[]
 * 
 * for string[], it checks if string[] extends any[], which it does.
 * so it goes into the "trueValue" section of this ternary, which is just T, which is replaced as string[].
 * the result is string[]
 * 
 * again for string:
 * ArrayWrap<T>      = T      extends any[] ? T      : T[]
 * ArrayWrap<string> = string extends any[] ? string : string[]
 * ArrayWrap<string> = false                ? string : string[]
 * ArrayWrap<string> = string[]
 * 
 * and again for string[]:
 * ArrayWrap<T>        = T        extends any[] ? T        : T[]
 * ArrayWrap<string[]> = string[] extends any[] ? string[] : string[][]
 * ArrayWrap<string>   = true                   ? string[] : string[][]
 * ArrayWrap<string>   = string[]
 */

/*
 * Conditional types can (but probably should not) be nested
 */
type SwitchNumbersAndStrings<T> =
  T extends number ? string :
  T extends string ? number :
  T

/* `never` can be used as a resulting type to erase the outcome */
type NoStrings<T> = T extends string ? never : T

type Filtered = NoStrings<"a" | "b" | 5 | object>

/* string template types can be used in conditional types */
type OnlyGettersAndSetters<T> = T extends `get${string}` | `set${string}` ? T : never;

type SomeGetters = OnlyGettersAndSetters<"foo" | "bar" | "getBaz" | "getQuux" | "setFoo">;

/*
 * Conditional types can be used in reverse order, to make sure a type is at least as broad as the left hand side.
 */
type OnlyGenericStringNoLiterals<T> = string extends T ? T : never

// @ts-expect-error
const a: OnlyGenericStringNoLiterals<"hi"> = "hi"
// works
const b: OnlyGenericStringNoLiterals<string> = "hi"

/*
 * this is useful to filter out index signatures and treat them differently, since index signatures can only be string | number.
 */
type RemoveIndexSignature<Key, Value> = string | number extends Key ? never : Value;

export {}