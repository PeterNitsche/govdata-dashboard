import { beforeEach, describe, expect, it, vi } from "vitest";

import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

const INITIAL_VALUE = "INIT";
const UPDATED_VALUE = "UPDATE";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("Returns the passed value", () => {
    const { result } = renderHook(() => useDebounce(INITIAL_VALUE, 300));
    expect(result.current).toBe(INITIAL_VALUE);
  });

  describe("When the value is updated", () => {
    it("Returns the updated value after the given time", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: INITIAL_VALUE } },
      );

      rerender({ value: UPDATED_VALUE });
      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toBe(UPDATED_VALUE);
    });

    it("Returns the initial value before the given time", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: INITIAL_VALUE } },
      );
      rerender({ value: UPDATED_VALUE });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(result.current).toBe(INITIAL_VALUE);
    });
  });
});
