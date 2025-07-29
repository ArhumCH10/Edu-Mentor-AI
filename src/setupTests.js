// Import Vitest globals
import { beforeEach, vi } from 'vitest';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Global test setup
beforeEach(() => {
  // Clear any previous mocks before each test
  vi.clearAllMocks();
});

// Mock IntersectionObserver (commonly needed for UI components)
globalThis.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock ResizeObserver (needed for charts and responsive components)
globalThis.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock matchMedia (needed for responsive design tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo (needed for scroll-based components)
globalThis.scrollTo = vi.fn();

// Mock localStorage and sessionStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.localStorage = localStorageMock;
globalThis.sessionStorage = localStorageMock;

// Mock URL.createObjectURL and URL.revokeObjectURL (needed for file handling)
globalThis.URL.createObjectURL = vi.fn();
globalThis.URL.revokeObjectURL = vi.fn();

// Mock console.error to avoid noise in tests (optional)
// Uncomment if you want to suppress console.error in tests
// const originalError = console.error;
// beforeAll(() => {
//   console.error = vi.fn();
// });
// afterAll(() => {
//   console.error = originalError;
// });
