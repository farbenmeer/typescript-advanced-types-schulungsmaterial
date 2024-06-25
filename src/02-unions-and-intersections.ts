/*
 * unions broaden types. they include every type chained together.
 * they make types *less* specific.
 *
 * this type can either "a", "b", 5 or any object
 */
type Union = "a" | "b" | 5 | object

/*
 * intersections narrow types. they include only types that match every candidate.
 * they make types *more* specific.
 *
 * this type is both { foo: string } and { bar: number },
 * resulting in a type { foo: string; bar: number }
 */
type Intersection = { foo: string } & { bar: number }

/*
 * intersections can be used to filter types.
 * this union can only be "a" or "b" because they are also strings.
 * object and 5 are removed, because they can *never* be a string at the same time.
 */
type UsingUnionsToFilter = Union & string;

/*
 * this is especially useful in string template types, index signatures or key mapping
 */
type EmbedOnlyStringsAndNumbers = `prop_${Intersection & (string | number)}`
type OnlyStringKeys = {
  [key: Intersection & string]: number
}


export {}
