// Copyright (c) 2021, Brandon Lehmann <brandonlehmann@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { resolve } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

/**
 * Caches Contract ABI information on disk based on the chain ID
 * and the contract address
 */
export default class ContractCache {
    private readonly cwd = resolve(process.cwd());

    constructor () {
        const path = this.resolve();

        if (!existsSync(path)) {
            mkdirSync(path);
        }
    }

    /**
     * Returns if the given contract exists in the cache for the given chain ID
     * @param chainId
     * @param contract
     */
    public exists (chainId: number, contract: string): boolean {
        const filePath = this.resolve(chainId + '_' + contract);

        const exists = existsSync(filePath);

        if (!exists) {
            return false;
        }

        // test to see if we can actually parse it as JSON

        const data = this.retrieve(chainId, contract);

        try {
            JSON.parse(data);

            return true;
        } catch {
            return false;
        }
    }

    private resolve (path?: string): string {
        let fixedPath = this.cwd + '/contract_cache/';

        fixedPath += path || '';

        return resolve(fixedPath);
    }

    /**
     * Retrieves the given contract from the cache for the given chain ID
     * @param chainId
     * @param contract
     */
    public retrieve (chainId: number, contract: string): string {
        return readFileSync(this.resolve(chainId + '_' + contract)).toString();
    }

    /**
     * Saves the contract ABI to the cache for the given chain ID
     * @param chainId
     * @param contract
     * @param abi
     */
    public save (chainId: number, contract: string, abi: string): void {
        return writeFileSync(this.resolve(chainId + '_' + contract), abi);
    }
}
