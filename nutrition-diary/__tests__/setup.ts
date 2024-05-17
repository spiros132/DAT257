import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case (e.g. clearing jsdom)
beforeEach(() => {
  vi.mock("../src/app/lib/session", () => ({verifySession: vi.fn().mockReturnValue({isAuth: true, userId: 1})}));
  vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
})
afterEach(() => {
  cleanup();
})