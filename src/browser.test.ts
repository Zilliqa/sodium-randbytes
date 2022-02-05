/**
 * @jest-environment jsdom
 */

/*
 * Copyright (C) 2022 Zilliqa
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import randomBytes from "./browser";

const MAX_BYTES = 65536;

describe("size", () => {
  const testCases = [
    {
      size: -1,
      calls: 0,
      error: "The argument 'size' is invalid. Received -1",
    },
    {
      size: 0,
      calls: 0,
      error: undefined,
    },
    {
      size: 20,
      calls: 1,
      error: undefined,
    },
    {
      size: 32,
      calls: 1,
      error: undefined,
    },
    {
      size: 128,
      calls: 1,
      error: undefined,
    },
    {
      size: 17 + MAX_BYTES,
      calls: 2,
      error: undefined,
    },
    {
      size: MAX_BYTES * 100,
      calls: 100,
      error: undefined,
    },
  ];

  for (const { size, calls, error } of testCases) {
    it(`size: ${size}`, () => {
      const originalCrypto = global.crypto;

      const mockFn = jest.fn();
      // @ts-ignore
      global.crypto = { getRandomValues: mockFn };

      if (error !== undefined) {
        expect(() => randomBytes(size)).toThrow(error);
        expect(mockFn.mock.calls.length).toEqual(calls);
      } else {
        expect(randomBytes(size).length).toBe(size);
        expect(mockFn.mock.calls.length).toBe(calls);
      }

      global.crypto = originalCrypto;
    });
  }

  it(`No secure random number generator`, () => {
    expect(() => randomBytes(20)).toThrow(
      "Secure random number generator is not available"
    );
  });
});
