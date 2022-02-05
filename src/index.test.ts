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

import randomBytes from "./index";

const MAX_BYTES = 65536;

jest.mock("sodium-native");
import sodium from "sodium-native";

describe("size", () => {
  const testCases = [
    {
      size: -1,
      error: "The argument 'size' is invalid. Received -1",
    },
    {
      size: 0,
      error: undefined,
    },
    {
      size: 20,
      error: undefined,
    },
    {
      size: 32,
      error: undefined,
    },
    {
      size: 128,
      error: undefined,
    },
    {
      size: 17 + MAX_BYTES,
      error: undefined,
    },
    {
      size: MAX_BYTES * 100,
      error: undefined,
    },
  ];

  for (const { size, error } of testCases) {
    it(`size: ${size}`, () => {
      const mockFn = jest.fn();
      sodium.randombytes_buf = mockFn;

      if (error !== undefined) {
        expect(() => randomBytes(size)).toThrow(error);
        expect(mockFn.mock.calls.length).toEqual(0);
      } else {
        expect(randomBytes(size).length).toBe(size);
        expect(mockFn.mock.calls.length).toEqual(1);
      }
    });
  }
});
