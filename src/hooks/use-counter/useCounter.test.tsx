import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("renders the initial count 0", () => {
    const { result } = renderHook(useCounter);
    expect(result.current.count).toBe(0);
  });

  it("accepts and renders the same initial count 10", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10,
      },
    });
    expect(result.current.count).toBe(10);
  });

  // act() to make sure all updates related to "units" of interaction
  // have been processed and applied to the dom before making any assertions.
  it("increments the count", () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it("decrements the count", () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });
});
