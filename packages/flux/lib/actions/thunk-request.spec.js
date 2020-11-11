/* eslint no-console: "off" */

import factory from "factory";
import { thunk } from "./thunk-request";

describe("thunk request", () => {
  describe("when a request is made successfully", () => {
    let dispatch;
    let request;
    let response;
    let state;
    let requestedAction;
    let succeededAction;
    let nextAction;

    beforeEach(async () => {
      dispatch = jest.fn();
      response = factory.response.that.succeeded().build();
      request = jest.fn().mockResolvedValue(response);
      state = {};
      requestedAction = factory.fsa.build();
      succeededAction = factory.fsa.build();
      nextAction = factory.fsa.build();

      const sut = thunk({
        requested: () => requestedAction,
        execute: (s) => request(s),
        succeeded: () => succeededAction,
        next: () => nextAction,
      });

      await sut(dispatch, () => state);
    });

    test("should announce the request is requested", () => {
      expect(dispatch.mock.calls[0][0]).toBe(requestedAction);
    });

    test("should execute the request", () => {
      expect(request).toHaveBeenCalledWith(state);
    });

    test("should announce the request succeeded", () => {
      expect(dispatch.mock.calls[1][0]).toBe(succeededAction);
    });

    test("should announce the next action", () => {
      expect(dispatch.mock.calls[2][0]).toBe(nextAction);
    });

    describe("and there is no next action", () => {
      const next = null;
      beforeEach(async () => {
        dispatch = jest.fn();
        response = factory.response.that.succeeded().build();
        request = jest.fn().mockResolvedValue(response);
        state = {};

        const sut = thunk({
          execute: (s) => request(s),
          next,
        });

        await sut(dispatch, () => state);
      });

      test("should NOT announce a next action", () => {
        expect(dispatch.mock.calls[dispatch.mock.calls.length - 1][0]).not.toBe(
          next
        );
      });
    });
  });

  describe("when a request has broken rules", () => {
    let dispatch;
    let request;
    let response;
    let state;
    let requestedAction;
    let failedAction;

    describe("in general", () => {
      beforeEach(async () => {
        dispatch = jest.fn();
        response = factory.response.that.errored().build();
        request = jest.fn().mockResolvedValue(response);
        state = {};
        requestedAction = factory.fsa.build();
        failedAction = factory.fsa.build();
        console.warn = jest.fn();

        const sut = thunk({
          requested: () => requestedAction,
          execute: (s) => request(s),
          failed: () => failedAction,
        });

        await sut(dispatch, () => state);
      });

      test("should console warn that rules were broken", () => {
        expect(console.warn).toHaveBeenCalled();
      });

      test("should announce the request failed", () => {
        expect(dispatch.mock.calls[1][0]).toBe(failedAction);
      });
    });

    describe("and response errors are defined", () => {
      beforeEach(async () => {
        dispatch = jest.fn();
        response = factory.response.that.errored().build();
        request = jest.fn().mockResolvedValue(response);
        state = {};
        requestedAction = factory.fsa.build();

        const sut = thunk({
          requested: () => requestedAction,
          execute: (s) => request(s),
        });

        await sut(dispatch, () => state);
      });

      test("should announce the request failed", () => {
        expect(dispatch.mock.calls[0][0]).toBe(requestedAction);
        expect(dispatch.mock.calls[1][0]).toBe(response.errors.message);
      });
    });

    describe("and response errors is undefined", () => {
      beforeEach(async () => {
        dispatch = jest.fn();
        request = jest.fn().mockResolvedValue({ errors: undefined });
        state = {};
        requestedAction = factory.fsa.build();

        const sut = thunk({
          requested: () => requestedAction,
          execute: (s) => request(s),
        });

        await sut(dispatch, () => state);
      });

      test("should STILL announce the request failed with undefined", () => {
        expect(dispatch.mock.calls[0][0]).toBe(requestedAction);
        expect(dispatch.mock.calls[1][0]).toBe(undefined);
      });
    });
  });

  describe("when a request failed", () => {
    let dispatch;
    let request;
    let response;
    let state;
    let failedAction;

    beforeEach(async () => {
      dispatch = jest.fn();
      response = factory.response.that.errored().build();
      request = jest.fn().mockRejectedValue(response);
      state = {};
      failedAction = factory.fsa.build();
      console.error = jest.fn();

      const sut = thunk({
        processing: () => factory.fsa.build(),
        execute: (s) => request(s),
        failed: () => failedAction,
      });

      await sut(dispatch, () => state);
    });

    test("should log via console error call", () => {
      expect(console.error).toHaveBeenCalled();
    });

    test("should announce the request failed", () => {
      expect(dispatch.mock.calls[1][0]).toBe(failedAction);
    });

    describe("and no failed action is supplied", () => {
      let requestedAction;

      beforeEach(async () => {
        dispatch = jest.fn();
        response = factory.response.that.errored().build();
        request = jest.fn().mockRejectedValue(response);
        state = {};
        requestedAction = factory.fsa.build();

        const sut = thunk({
          requested: () => requestedAction,
          execute: (s) => request(s),
        });

        await sut(dispatch, () => state);
      });

      test("should STILL announce the request failed", () => {
        expect(dispatch.mock.calls[0][0]).toBe(requestedAction);
        expect(dispatch.mock.calls[1][0]).toBe(undefined);
      });
    });
  });
});
