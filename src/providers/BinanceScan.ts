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

import { ethers } from 'ethers';
import ProviderHelper, { INetwork, get_network } from '../helpers/ProviderHelper';

const default_api_key = 'EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9';

const networks: INetwork[] = [
    {
        name: 'bsc-mainnet',
        chainId: 0x38
    },
    {
        name: 'bsc-testnet',
        chainId: 0x61
    }
];

export default class BinanceScanProvider extends ProviderHelper {
    /**
     * Constructs a new instance of the Provider
     *
     * @param api_key
     * @param network
     */
    constructor (api_key?: string, network?: ethers.providers.Networkish) {
        const standard_network = get_network(
            (typeof network === 'undefined') ? 'bsc-mainnet' : network, networks);

        switch ((standard_network || {}).name) {
        case 'bsc-mainnet':
        case 'bsc-testnet':
            break;
        default:
            throw new Error('Unsupported Network');
        }

        super(<ethers.providers.Network>standard_network, api_key || default_api_key);

        this._fullName = 'Binance Smart Chain';

        this._testContract = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    }

    /**
     * Returns the Provider base URL
     */
    public getBaseUrl (): string {
        switch (this.network ? this.network.name : 'invalid') {
        case 'bsc-mainnet':
            return 'https://api.bscscan.com';
        case 'bsc-testnet':
            return 'https://api-testnet.bscscan.com';
        }

        throw new Error('unsupported network');
    }

    /**
     * Returns if we are using the community API key
     */
    isCommunityResource (): boolean {
        return (this.apiKey === default_api_key);
    }
}
