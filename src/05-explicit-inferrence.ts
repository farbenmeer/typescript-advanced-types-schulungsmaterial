/*
 * implicit inference is when the typescript compiler automatically infers a type for you based on its usage.
 * some examples are:
 *
 *    let   a = 5                   // a has type number
 *    const b = 5                   // b has type 5
 *    const c = [4, "foo"]          // c has type (number | string)[]
 *    const d = [4, "foo"] as const // d has type readonly [4, "foo"]
 *
 * but not only assignments help in inference
 *
 *    let a: unknown = undefined    // explicitly is unknown, no inference
 *    if (typeof a === "string") {
 *      // a can be treated and used as a string here, no cast required.
 *      // this is called a type guard, and it narrows a type inside a scope.
 *    }
 *
 * now coming from conditional types, say you had a check if an element was a Promise, but you wanted to get the
 * type of the promise. with explicit inference this is possible!
 *
 * explicit inference uses the `infer` keyword and can only be used in the condition of a conditional type.
 * the inferred type is stored in a new type parameter (a type variable) and can be accessed in the "then" branch
 * of the conditional.
 *
 * the example above would look like this:
 */

type ExtractElementType<T> = T extends (infer Element)[] ? Element : T;

type PromiseResult<T> = T extends Promise<infer Result> ? Result : never

type Result = PromiseResult<Promise<string | number>>


export {}

