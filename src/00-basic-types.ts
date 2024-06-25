/* eslint-disable */

type Primitives =
  /*
   * stores text, has multiple literal forms:
   *
   * "a":             the specific string "a"
   * `get_${string}`: any string starting with "get_"
   *
   * in this example, string can be replaced with any string compliant type,
   * such as literals or number(s).
   *
   * `get${"First" | "Second"}` is the same as "getFirst" | "getSecond".
   */
  | string
  /*
   * stores numbers, has one literal form:
   * 5: the specific number 5
   */
  | number
  /*
   * stores booleans, has two literals: true and false
   */
  | boolean
  /*
   * stores big integers, has one literal form:
   * 5n: the bigint 5
   */
  | bigint
  /*
   * represents the value null and nothing else
   * null extends object
   */
  | null
  /*
   * represents any object, including null. any type that is more complex than the other primitives falls under object.
   * arrays, tuples, constructors, classes, null and plain objects can be assigned to object.
   * object, when used in its plain form (or as an empty object literal `{}`) acts like a
   * wildcard type (any), but does not include other primitives except null.
   * any properties or values are valid.
   */
  | object
  /*
   * the value undefined or a missing value.
   */
  | undefined
  /*
   * symbols are similar to strings, they are values and can be used as property names on objects
   * however each symbol created with the Symbol constructor will never equal any other symbol.
   * They are unique and typescript treats them as nominal types.
   * the type symbol matches any symbol, however unique symbols can be used/defined as well
   * use `declare const MySymbol: unique symbol` to create unique symbol (nominal type)
   * without an actual value (useful for safeguarding types or type tagging)
   */
  | symbol

type Wildcards =
  /*
   * can be *any* type. accesses to properties that might not exist or unchecked assignments are not treated as errors.
   * types derived from accesses to any become any.
   * if not specified or configured otherwise, this is the type of errors in try-catch blocks
   */
  | any
  /*
   * any type can be assigned or cast to unknown. no assumptions are made about unknown, meaning every cast or access
   * must be checked.
   */
  | unknown
  /*
   * an alias to any. behaves exactly the same as any.
   * usually used as a return type for a function, to signify the returned result does not matter.
   */
  | void
  /*
   * self excluding type. satisfies every type constraint because every type, even unknown, is at least never.
   * the typescript compiler erases never before when any other type is available. for example this union has the type
   * any because any/void is the broadest type. never is erased.
   * anything can be cast to never but nothing but never can be assigned to never.
   */
  | never


export {}
