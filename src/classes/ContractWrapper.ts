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
import { IContractTransactionResult } from '../interfaces/contracts/IERC20';

/**
 * Supplies a wrapper that makes it a bit easier for us to set up a factory
 * around an ethers.Contract
 */
export default class ContractWrapper {
    public contract: ethers.Contract;

    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public provider: ethers.providers.Provider | ethers.Signer
    ) {
        this.contract = new ethers.Contract(contract_address, contract_abi, provider);
    }

    /**
     * Executes the provided contract transaction method and blocks
     * until the receipt can come back after the required confirmations,
     * then returns both the contract transaction result and the receipt
     * @param func
     * @param confirmations
     */
    public async execute (
        func: Promise<ethers.ContractTransaction>,
        confirmations = 1
    ): Promise<IContractTransactionResult> {
        const tx = await func;

        return {
            transaction: tx,
            receipt: await tx.wait(confirmations)
        };
    }

    /**
     * Connects the contract to a different provider
     * @param provider
     */
    public async connect (provider: ethers.providers.Provider | ethers.Signer): Promise<void> {
        this.contract = new ethers.Contract(this.contract_address, this.contract_abi, provider);

        this.provider = provider;
    }

    /**
     * Connects the contract to a different RPC provider
     * @param provider
     */
    public async connectRpcProvider (provider: string | ethers.providers.Provider): Promise<void> {
        const current = await this.contract.provider.getNetwork();

        if (typeof provider === 'string') {
            return this.connect(
                new ethers.providers.JsonRpcProvider(provider, current.chainId));
        }

        return this.connect(provider);
    }

    /**
     * Connects the given wallet to the contract
     * @param wallet
     */
    public async connectWallet (wallet: ethers.Wallet): Promise<void> {
        return this.connect(wallet);
    }
}
