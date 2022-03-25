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
import Multicall from './Multicall';

export interface IContractCall {
    contract: {
        address: string;
    };
    name: string;
    inputs: ethers.utils.ParamType[];
    outputs: ethers.utils.ParamType[];
    params: any[];
}

export default class Contract extends ethers.Contract {
    private _callMethods: Map<string, IContractCall> = new Map<string, IContractCall>();
    public readonly multicallProvider?: Multicall;

    constructor (
        addressOrName: string,
        contractInterface: ethers.ContractInterface,
        signerOrProvider?: ethers.Signer | ethers.providers.Provider | Multicall) {
        super(
            addressOrName,
            contractInterface,
            (signerOrProvider instanceof Multicall) ? signerOrProvider.provider : signerOrProvider
        );

        if (signerOrProvider instanceof Multicall) {
            this.multicallProvider = signerOrProvider;
        }

        for (const fragment of this.interface.fragments) {
            if (fragment.type !== 'function') {
                continue;
            }

            const func = ethers.utils.FunctionFragment.from(fragment);

            if (func.stateMutability === 'pure' || func.stateMutability === 'view') {
                this._callMethods.set(func.name, {
                    contract: {
                        address: this.address
                    },
                    name: func.name,
                    inputs: func.inputs,
                    outputs: func.outputs || [],
                    params: []
                });
            }
        }
    }

    /**
     * Contrauct a contract call that can be utilized as a multicall
     * @param name
     * @param params
     */
    public callMethod (name: string, ...params: any[]): IContractCall {
        const method = this._callMethods.get(name);

        if (!method) {
            throw new Error('Contract method not callable');
        }

        return {
            contract: {
                address: method.contract.address
            },
            name: method.name,
            inputs: method.inputs,
            outputs: method.outputs,
            params: params
        };
    }
}
