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
import ProviderHelper, { get_network, INetwork } from '../helpers/ProviderHelper';
const default_api_key = 'H32HY37NS2T6YBMASW3H4J2Y58MS4W8RY5';

const networks: INetwork[] = [
    {
        name: 'ftm-mainnet',
        chainId: 0xfa
    },
    {
        name: 'ftm-testnet',
        chainId: 0xfa2
    }
];

export default class FantomScanProvider extends ProviderHelper {
    /**
     * Constructs a new instance of the Provider
     *
     * @param api_key
     * @param network
     */
    constructor (api_key?: string, network?: ethers.providers.Networkish) {
        const standard_network = get_network(
            (typeof network === 'undefined') ? 'ftm-mainnet' : network, networks);

        switch ((standard_network || {}).name) {
        case 'ftm-mainnet':
        case 'ftm-testnet':
            break;
        default:
            throw new Error('Unsupported Network');
        }

        super(<ethers.providers.Network>standard_network, api_key || default_api_key);

        this._fullName = 'Fantom Opera';

        this._testContract = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';
    }

    /**
     * Returns the Provider base URL
     */
    public getBaseUrl (): string {
        switch (this.network ? this.network.name : 'invalid') {
        case 'ftm-mainnet':
            return 'https://api.ftmscan.com';
        case 'ftm-testnet':
            return 'https://api-testnet.ftmscan.com';
        }

        throw new Error('unsupported network');
    }

    /**
     * Returns if we are using the community API key
     */
    isCommunityResource (): boolean {
        return false;
    }
}
