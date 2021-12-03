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

import { ethers } from 'ethers';
import fetch from 'node-fetch';
import ContractCache from './ContractCache';
import { IScanProvider } from '../interfaces/providers/IScanProvider';
import ContractWrapper from '../classes/ContractWrapper';

export interface INetwork {
    name: string;
    chainId: number;
}

/**
 * Attempts to discover the type of network for the provider
 * @param network
 * @param networks
 */
export const get_network = (
    network: ethers.providers.Networkish | string | number,
    networks: INetwork[]
): null | ethers.providers.Network => {
    if (typeof network === 'number') {
        const matches = networks.filter(n => (n.chainId === network));

        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }

        return {
            name: 'unknown',
            chainId: network
        };
    } else if (typeof network === 'string') {
        const matches = networks.filter(n => (n.name === network));

        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }

        return null;
    } else if (network && typeof network.name !== 'undefined' && typeof network.chainId !== 'undefined') {
        const byName = get_network(network.name, networks);
        const byChainId = get_network(network.chainId, networks);

        if (byName === null && byChainId === null) {
            return {
                name: network.name,
                chainId: network.chainId
            };
        }

        if (byName && byChainId && byName.name === byChainId.name && byName.chainId === byChainId.chainId) {
            return byName;
        }
    }

    return null;
};

export default class ProviderHelper extends ethers.providers.EtherscanProvider implements IScanProvider {
    private readonly contract_cache: ContractCache = new ContractCache();
    protected _fullName = '';
    protected _testContract = '';

    /**
     * Returns the full name of the network
     */
    public get fullName (): string {
        return this._fullName;
    }

    /**
     * Returns the test contract address
     */
    public get testContract (): string {
        return this._testContract;
    }

    /**
     * Fetches the contract ABI if available
     *
     * @param contract_address
     * @param force_refresh
     */
    public async fetch_contract (contract_address: string, force_refresh = false) {
        if (this.contract_cache.exists(this.network.chainId, contract_address) && !force_refresh) {
            return {
                address: contract_address,
                abi: this.contract_cache.retrieve(this.network.chainId, contract_address)
            };
        } else {
            const response = await fetch(
                this.getBaseUrl() + '/api?module=contract&action=getabi&address=' +
                contract_address + '&apikey=' + this.apiKey);

            if (!response.ok) {
                throw new Error('Could not fetch contract ABI');
            }

            const body = await response.text();

            try {
                const json: { result: string } = JSON.parse(body);

                this.contract_cache.save(this.network.chainId, contract_address, json.result);

                return {
                    address: contract_address,
                    abi: json.result
                };
            } catch (e: any) {
                throw new Error(body + ': ' + e.toString());
            }
        }
    }

    /**
     * Fetches and loads the contract into an object we can use
     *
     * @param ReturnClass
     * @param contract_address
     * @param args
     */
    public async load_contract<Type extends ContractWrapper | ethers.Contract = ethers.Contract> (
        ReturnClass: new (...args: any[]) => Type,
        contract_address: string,
        ...args: any[]
    ): Promise<Type> {
        const contract = await this.fetch_contract(contract_address);

        return new ReturnClass(contract_address, contract.abi, this, ...args);
    }
}
