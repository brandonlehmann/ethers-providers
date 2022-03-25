// Copyright (c) 2021-2022, Brandon Lehmann <brandonlehmann@gmail.com>
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

import { describe, it } from 'mocha';
import { Providers, Multicall, Contract } from '../src';
import * as assert from 'assert';

describe('Provider Tests', async () => {
    for (const ProviderInterface of Providers) {
        const provider = new ProviderInterface();

        describe(provider.fullName, async () => {
            it('Get Current Block Number', async () => {
                const result = await provider.getBlockNumber();

                assert(result !== 0);
            });

            it('Get Fee Data', async () => {
                const fee = await provider.getFeeData();

                assert(fee.gasPrice);
            });

            it('Get Gas Price', async () => {
                const price = await provider.getGasPrice();

                assert(price.toNumber() !== 0);
            });

            it('Fetch Test Contract', async () => {
                const contract = await provider.fetch_contract(provider.testContract, true);

                assert(contract.address === provider.testContract);
            });
        });

        describe(provider.fullName + ' Multicall', async () => {
            let multicall: Multicall;
            let testContract: Contract | undefined;

            before(async () => {
                multicall = await Multicall.create(provider);

                if (provider.chainId === 250) {
                    testContract = await provider.load_contract(
                        '0x3fAaB499b519fdC5819e3D7ed0C26111904cbc28', false);
                }
            });

            it('Test Multicall', async () => {
                const contract = await provider.load_contract(provider.testContract, false);

                const result = await multicall.multicall([
                    contract.callMethod('decimals'),
                    contract.callMethod('name'),
                    contract.callMethod('balanceOf', '0xf977814e90da44bfa03b6295a0616a897441acec')
                ]);

                assert(result.length === 3);
            });

            it('Test Multicall Specific', async function () {
                if (!testContract) {
                    return this.skip();
                }

                const result = await multicall.multicall([
                    testContract.callMethod('allPairs', 0),
                    testContract.callMethod('allPairs', 1),
                    testContract.callMethod('allPairs', 3)
                ]);

                assert(result[0] !== result[1] && result[1] !== result[2]);
            });
        });
    }
});
