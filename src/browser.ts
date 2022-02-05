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

const randomBytes = (size: number) => {
  const crypto = global.crypto;

  if (typeof crypto?.getRandomValues !== "function") {
    throw new Error("Secure random number generator is not available");
  }

  const b = Buffer.allocUnsafe(size);
  const n = b.byteLength;

  // The requested length must not exceed 65,536 bytes.
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#exceptions
  const MAX_BYTES = 65536;

  for (let i = 0; i < n; i += MAX_BYTES) {
    // Note that typedArray is modified in-place, and no copy is made.
    crypto.getRandomValues(
      new Uint8Array(b.buffer, i + b.byteOffset, Math.min(n - i, MAX_BYTES))
    );
  }

  return b;
};

export default randomBytes;
