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

import { describe, it } from 'mocha';
import { Providers, DAO, ERC20Presets, BlockTimeTracker, DAOInformationHelper } from '../src';
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

            if (provider.network.chainId === 250) {
                describe('Test Time Tracker', async () => {
                    let contract: BlockTimeTracker;

                    before(async () => {
                        contract = await provider.load_contract(BlockTimeTracker,
                            '0x706e05D2b47cc6B1fb615EE76DD3789d2329E22e');
                    });

                    it('average()', async () => {
                        await contract.average()
                            .catch(() => assert(false));
                    });
                });

                describe('Test DAO Information Helper', async () => {
                    let contract: DAOInformationHelper;

                    before(async () => {
                        contract = await provider.load_contract(DAOInformationHelper,
                            '0x260A5367c0e742a1fdE32cDB13973F67c92149Ed');
                    });

                    it('info()', async () => {
                        const result = await contract.info(
                            '0x8b8d40f98a2f14e2dd972b3f2e2a2cc227d1e3be',
                            '0x8de250c65636ef02a75e4999890c91cecd38d03d',
                            '0x706e05D2b47cc6B1fb615EE76DD3789d2329E22e',
                            '0x8b8d40f98a2f14e2dd972b3f2e2a2cc227d1e3be'
                        );

                        assert(result.stakedDecimals !== 0 && result.blockPrecision !== 0);
                    });
                });

                describe('Test ERC20', async () => {
                    let contract: ERC20Presets.MintableBurnablePermittable;

                    before(async () => {
                        contract = await provider.load_contract(ERC20Presets.MintableBurnablePermittable,
                            '0x6a31Aca4d2f7398F04d9B6ffae2D898d9A8e7938');
                    });

                    it('name()', async () => {
                        await contract.name()
                            .catch(() => assert(false));
                    });

                    it('symbol()', async () => {
                        await contract.symbol()
                            .catch(() => assert(false));
                    });

                    it('totalSupply()', async () => {
                        await contract.totalSupply()
                            .catch(() => assert(false));
                    });

                    it('decimals()', async () => {
                        await contract.decimals()
                            .catch(() => assert(false));
                    });
                });

                describe('Test DAO.Staking', async () => {
                    let contract: DAO.Staking;

                    before(async () => {
                        contract = await provider.load_contract(
                            DAO.Staking,
                            '0xD12930C8deeDafD788F437879cbA1Ad1E3908Cc5',
                            'HEC', 'sHEC');
                    });

                    it('contractBalance()', async () => {
                        await contract.contractBalance()
                            .catch(() => assert(false));
                    });

                    it('epoch()', async () => {
                        await contract.epoch()
                            .catch(() => assert(false));
                    });

                    it('stakedToken()', async () => {
                        await contract.stakedToken()
                            .catch(() => assert(false));
                    });

                    it('token()', async () => {
                        await contract.token()
                            .catch(() => assert(false));
                    });
                });
            }
        });
    }
});
