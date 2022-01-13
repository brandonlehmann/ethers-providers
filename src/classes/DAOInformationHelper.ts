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

import { ethers, BigNumber } from 'ethers';
import ContractWrapper from './ContractWrapper';

interface IInformationResult {
    epochNumber: BigNumber;
    epochLength: BigNumber;
    epochEndBlock: BigNumber;
    epochDistribute: BigNumber;
    blockNumber: BigNumber;
    stakingIndex: BigNumber;
    stakedDecimals: number;
    stakedCirculatingSupply: BigNumber;
    blockAverage: BigNumber;
    blockPrecision: number;
    stakingBalance: BigNumber;
}

export default class DAOInformationHelper extends ContractWrapper {
    constructor (public readonly contract_address: string, public readonly contract_abi: string, public readonly provider: ethers.providers.Provider | ethers.Signer) {
        super(contract_address, contract_abi, provider);
    }

    public async info (
        stakingContract: string,
        stakedToken: string,
        timeTracker: string,
        stakingWallet: string
    ): Promise<IInformationResult> {
        return await this.contract.info(stakingContract, stakedToken, timeTracker, stakingWallet);
    }
}