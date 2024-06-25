
/*
 * declaring a symbol - nominal type.
 * two symbols are never the same, even if they have the same "value".
 * this makes them unique in the typing system.
 */
declare const UniqueSymbol: unique symbol

/*
 * object types use curly braces as delimiters.
 */
type ObjectType = {
  /*
   * properties can be defined with a name followed by a type.
   */
  propertyName: number
  /*
   * properties can be marked as optional with a trailing question mark after the name.
   */
  optional?: string
  /*
   * or as readonly with a leading "readonly"
   */
  readonly name: string
  /*
   * property names can be calculated
   */
  ["hello"]: number
  /*
   * symbols can be used as property names as well, including any marks
   * this property is only visible when UniqueSymbol is also visible in its scope.
   */
  readonly [UniqueSymbol]?: bigint
  /*
   * index signatures can be used like this to specify multiple properties at once.
   * they must match all existing properties except symbols in both names and values.
   * they are most useful as the only properties of an object type.
   * if you need other properties alongside an index signature, consider using a type union
   *    { [key: string]: number } & { foo: string }
   */
  [key: "foo" | "bar" | string]: string | number | undefined
}


/*
 * array types append [] to the end of the element type or use the generic syntax (Array<element type>)
 */
type SimpleStringArray = string[]
type SimpleNumberArray = Array<number>

/*
 * any type can be used as the type of the array
 */
type StringOrNumberArray = (string | number)[]

/*
 * this is essentially the same type as this (missing array methods and a length property!)
 */
type StringOrNumberArraylike = {
  [index: number]: string | number
}

/*
 * index signatures can be accessed with the correct index type
 * the type of this is string | number, because if you use a number to access (string | number)[],
 * a (string | number) would be the result (given the index is in bounds).
 */
type ElementOfArray = StringOrNumberArray[number]

/*
 * this works the same for objects
 */
type ElementOfObject = StringOrNumberArraylike[number]

/*
 * property names and symbols can be used to index types
 * in this case bigint | undefined (because it is optional)
 */
type ObjectSymbolType = ObjectType[typeof UniqueSymbol]

/* this is string */
type ObjectName = ObjectType["name"]

/*
 * you can use the `keyof` operator to get the keys of an object type (even arrays and tuples)
 */
type ObjectKeys = keyof { foo: number; bar?: string }

export {}
