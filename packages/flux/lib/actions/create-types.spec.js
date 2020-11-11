import factory from "factory";
import { REQUESTED, SUCCEEDED, FAILED } from "./action-constants";
import { createTypes } from "./create-types";

describe("create-types", () => {
  describe("when creating flux types", () => {
    let sut;
    let baseType;

    beforeEach(() => {
      baseType = factory.random.string();
      sut = createTypes(baseType);
    });

    test("should create a requested type", () => {
      expect(sut.requested).toBe(`${baseType}_${REQUESTED}`);
    });

    test("should create a succeeded type", () => {
      expect(sut.succeeded).toBe(`${baseType}_${SUCCEEDED}`);
    });

    test("should create a failed type", () => {
      expect(sut.failed).toBe(`${baseType}_${FAILED}`);
    });
  });
});
