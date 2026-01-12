import { describe, expect, it } from 'vitest';
import { greet } from '../src/index';

describe('greet', () => {
  it('should return greeting message', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});
