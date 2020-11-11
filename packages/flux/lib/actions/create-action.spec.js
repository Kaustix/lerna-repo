import factory from "factory";
import { createAction } from "./create-action";

describe("action builder", () => {
  describe("when building an action", () => {
    test("should have the correct type", () => {
      const expected = factory.random.string();
      expect(createAction(expected).build().type).toBe(expected);
    });

    test("should have the correct meta", () => {
      const expected = factory.random.string();
      expect(createAction("xxx").meta(expected).build().meta).toBe(expected);
    });
  });

  describe("when building an action that succeeded", () => {
    let expected;
    let fsa;

    beforeAll(() => {
      expected = factory.random.string();
      fsa = createAction("xxx").payload(expected).build();
    });

    test("should have the correct payload", () => {
      expect(fsa.payload).toBe(expected);
    });

    test("should NOT indicate the action is an error", () => {
      expect(fsa.error).toBe(false);
    });
  });

  describe("when building an action", () => {
    let expected;
    let fsa;

    describe("and payload is an instance of Error", () => {
      beforeAll(() => {
        expected = new Error(factory.random.string());
        fsa = createAction("xxx").error(expected).build();
      });

      test("should have an error as the payload", () => {
        expect(fsa.payload).toBe(expected);
      });

      test("should indicate the action is an error", () => {
        expect(fsa.error).toBe(true);
      });
    });

    describe("and on error is called", () => {
      beforeAll(() => {
        expected = factory.random.string();
        fsa = createAction("xxx").error(expected).build();
      });

      test("should have the passed in payload", () => {
        expect(fsa.payload).toBe(expected);
      });

      test("should indicate the action is an error", () => {
        expect(fsa.error).toBe(true);
      });
    });
  });
});
