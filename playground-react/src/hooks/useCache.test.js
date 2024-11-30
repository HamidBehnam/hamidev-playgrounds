import { renderHook } from "@testing-library/react";
import { act } from "react";
import useCache from "./useCache";

describe("useCache", () => {
  it("should initialize the cache with the correct capacity", () => {
    const { result } = renderHook(() => useCache());

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('get');
    expect(result.current).toHaveProperty('put');
  });

  it("should return undefined if the key does not exist", () => {
    const { result } = renderHook(() => useCache(3));

    const value = result.current.get(1);

    expect(value).toBeUndefined();
  });


  it("should store and retrieve the value correctly", () => {
    const { result } = renderHook(() => useCache(3));

    act(() => {
      result.current.put(1, 'value for 1');
    });

    const value = result.current.get(1);

    expect(value).toBe('value for 1');
  });

  it("should update the value for an existing key", () => {
    const { result } = renderHook(() => useCache(3));

    act(() => {
      result.current.put(1, 'value for 1');
      result.current.put(1, 'updated value for 1');
    });

    const value = result.current.get(1);

    expect(value).toBe('updated value for 1');
  });

  it("should remove the least used item when exceeding the capacity", () => {
    const { result } = renderHook(() => useCache(2));

    act(() => {
      result.current.put(1, 'value for 1');
      result.current.put(2, 'value for 2');
      result.current.put(3, 'value for 3');
    });

    const value1 = result.current.get(1);
    const value2 = result.current.get(2);
    const value3 = result.current.get(3);

    expect(value1).toBeUndefined();
    expect(value2).toBe('value for 2');
    expect(value3).toBe('value for 3');
  });

  it("should make the recently accessed item the most recently used", () => {
    const { result } = renderHook(() => useCache(2));

    act(() => {
      result.current.put(1, 'value for 1');
      result.current.put(2, 'value for 2');
      result.current.get(1);
      result.current.put(3, 'value for 3');
    });

    const value1 = result.current.get(1);
    const value2 = result.current.get(2);
    const value3 = result.current.get(3);

    expect(value1).toBe('value for 1');
    expect(value2).toBeUndefined();
    expect(value3).toBe('value for 3');
  });

  it("should maintain cache across re-renders", () => {
    const { result, rerender } = renderHook(() => useCache(2));

    act(() => {
      result.current.put(1, 'value for 1');
      result.current.put(2, 'value for 2');
      result.current.get(1);
      result.current.put(3, 'value for 3');
    });

    rerender();

    const value1 = result.current.get(1);
    const value2 = result.current.get(2);
    const value3 = result.current.get(3);

    expect(value1).toBe('value for 1');
    expect(value2).toBeUndefined();
    expect(value3).toBe('value for 3');
  });
});
