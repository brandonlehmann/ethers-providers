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
import { IContractCall } from './Contract';
import ABI from '../helpers/ABI';
import { multicallAddresses, multicallAbi } from './MulticallAddresses';
import { IScanProvider } from '../interfaces/providers/IScanProvider';

export default class Multicall {
    private readonly multicallAddress: string;

    protected constructor (
        public readonly provider: ethers.providers.Provider | IScanProvider,
        public readonly chainId: number,
        multicallAddress?: string
    ) {
        if (!multicallAddress) {
            const address = multicallAddresses.get(chainId);

            if (!address) {
                throw new Error('Unknown multicall address');
            }

            this.multicallAddress = address;
        } else {
            this.multicallAddress = multicallAddress;
        }
    }

    /**
     * Execute the requests contract calls using the multicall contract facility
     * @param calls
     */
    public async multicall<Type extends any[] = any[]> (
        calls: IContractCall[]
    ): Promise<Type> {
        const multicall = new ethers.Contract(this.multicallAddress, multicallAbi, this.provider);

        const callRequests = calls.map(elem => {
            const callData = ABI.encode(elem.name, elem.inputs, elem.params);
            return {
                target: elem.contract.address,
                callData
            };
        });

        const response = await multicall.aggregate(callRequests);

        const callCount = calls.length;

        const callResult = [] as unknown as Type;

        for (let i = 0; i < callCount; i++) {
            const outputs = calls[i].outputs;
            const returnData = response.returnData[i];
            const params = ABI.decode(outputs, returnData);
            const result = outputs.length === 1 ? params[0] : params;
            callResult.push(result);
        }

        return callResult;
    }

    /**
     * Creates a new instance of a multicall provider using an existing provider
     * @param provider
     * @param chainId
     * @param multicallAddress
     */
    public static async create (
        provider: ethers.providers.Provider | IScanProvider,
        chainId?: number,
        multicallAddress?: string
    ) {
        if (!chainId) {
            chainId = (await provider.getNetwork()).chainId;
        }

        return new Multicall(provider, chainId, multicallAddress);
    }

    public static registerMulticallAddress (chainId: number, multicallAddress: string) {
        multicallAddresses.set(chainId, multicallAddress);
    }
}
