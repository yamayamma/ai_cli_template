/**
 * Greets a person by name
 * @param name - The name of the person to greet
 * @returns A greeting message
 * @example
 * ```ts
 * greet("World") // returns "Hello, World!"
 * ```
 */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
