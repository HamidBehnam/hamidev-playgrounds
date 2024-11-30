import { renderHook } from "@testing-library/react";
import useSearch from "./useSearch";

describe("searchByText", () => {
  it("should filter an array of strings correctly", async () => {
    const { result } = renderHook(() => useSearch());
    const data = [
      "first",
      "second",
      "third"
    ];

    const filtered = await result.current.searchByText(data, "eco");

    expect(filtered).toEqual(["second"]);
  });

  it("should filter an array of objects correctly", async () => {
    const { result } = renderHook(() => useSearch());
    const data = [
      {
        name: "first"
      },
      {
        name: "second"
      },
      {
        name: "third"
      }
    ];

    const filtered = await result.current.searchByText(data, "ird");

    expect(filtered).toEqual([
      {
        name: "third"
      }
    ]);
  });

  it("should filter an array of objects with nested objects correctly", async () => {
    const { result } = renderHook(() => useSearch());
    const data = [
      {
        name: "first",
        code: {
          "code_id": "1",
          "code_title": "hamid1"
        }
      },
      {
        name: "second",
        code: {
          "code_id": "2",
          "code_title": "hamid2"
        }
      },
      {
        name: "third",
        code: {
          "code_id": "3",
          "code_title": "hamid3"
        }
      }
    ];

    const filtered = await result.current.searchByText(data, "hamid1");

    expect(filtered).toEqual([{name: "first", code: {"code_id": "1", "code_title": "hamid1"}}]);
  });

  it("should filter an array of objects with nested arrays correctly", async () => {
    const { result } = renderHook(() => useSearch());
    const data = [
      {
        name: "first",
        code: {
          "code_id": "1",
          "code_title": "hamid1"
        },
        products: [
          'p1',
          'p2',
          'p3'
        ]
      },
      {
        name: "second",
        code: {
          "code_id": "2",
          "code_title": "hamid2"
        },
        products: [
          'p2',
          'p3',
          'p4'
        ]
      },
      {
        name: "third",
        code: {
          "code_id": "3",
          "code_title": "hamid3"
        },
        products: [
          'p4',
          'p5',
          'p6'
        ]
      }
    ];

    const filtered = await result.current.searchByText(data, "p4");

    expect(filtered).toEqual([{name: "second", code: {"code_id": "2", "code_title": "hamid2"}, products: ['p2', 'p3', 'p4']}, {name: "third", code: {"code_id": "3", "code_title": "hamid3"}, products: ['p4', 'p5', 'p6']}]);
  });

  it("should inclusively filter an array of users based on their permissions", () => {
    const { result } = renderHook(() => useSearch());
    const data = [
      {
        "name": "Robert Cotton",
        "permission": "manage"
      },
      {
        "name": "Dorothy Turner",
        "permission": "view"
      },
      {
        "name": "Sophia Skinner",
        "permission": "suspended"
      },
      {
        "name": "Gabriel Osborn",
        "permission": "view"
      }
    ];

    const filtered = result.current.searchByPermissionInclusion(data, new Set(['manage', 'suspended']));

    expect(filtered).toEqual([
      {
        "name": "Robert Cotton",
        "permission": "manage"
      },
      {
        "name": "Sophia Skinner",
        "permission": "suspended"
      }
    ]);
  });


  it("should exclusively filter an array of users based on their permissions", () => {
    const { result } = renderHook(() => useSearch());
    const data = [
      {
        "name": "Robert Cotton",
        "permission": "manage"
      },
      {
        "name": "Dorothy Turner",
        "permission": "view"
      },
      {
        "name": "Sophia Skinner",
        "permission": "suspended"
      },
      {
        "name": "Gabriel Osborn",
        "permission": "view"
      }
    ];

    const filtered = result.current.searchByPermissionExclusion(data, new Set(['view', 'manage']));

    expect(filtered).toEqual([
      {
        "name": "Sophia Skinner",
        "permission": "suspended"
      }
    ]);
  });
});
