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

import { BigNumber, ethers } from 'ethers';

export const NullAddress = '0x0000000000000000000000000000000000000000';

export interface IContractTransactionResult {
    transaction: ethers.ContractTransaction,
    receipt: ethers.ContractReceipt
}

export namespace IERC20 {
    export interface ERC20 {
        allowance: (owner: string, spender: string) => Promise<BigNumber>;
        approve: (spender: string, amount: BigNumber) => Promise<ethers.ContractTransaction>;
        balanceOf: (owner: string) => Promise<BigNumber>;
        decimals: () => Promise<number>;
        name: () => Promise<string>;
        symbol: () => Promise<string>;
        totalSupply: () => Promise<BigNumber>;
        transfer: (to: string, value: BigNumber) => Promise<ethers.ContractTransaction>;
        transferFrom: (from: string, to: string, value: BigNumber) => Promise<ethers.ContractTransaction>;
    }

    export interface AccessControl {
        getRoleAdmin: (role: string) => Promise<string>;
        grantRole: (role: string, account: string) => Promise<ethers.ContractTransaction>;
        hasRole: (role: string, account: string) => Promise<boolean>;
        renounceRole: (role: string, account: string) => Promise<ethers.ContractTransaction>;
        revokeRole: (role: string, account: string) => Promise<ethers.ContractTransaction>;
        supportsInterface: (interfaceId: string) => Promise<boolean>;
    }

    export interface AccessControlEnumerable extends AccessControl {
        getRoleMember: (role: string, index: BigNumber) => Promise<string>;
        getRoleMemberCount: (role: string) => Promise<BigNumber>;
    }

    export interface Burnable {
        burn: (amount: BigNumber) => Promise<ethers.ContractTransaction>;
        burnFrom: (account: string, amount: BigNumber) => Promise<ethers.ContractTransaction>;
    }

    export interface DualTransferable {
        dualTransfer: (
            recipient_one: string, amount_one: BigNumber,
            recipient_two: string, amount_two: BigNumber) => Promise<ethers.ContractTransaction>;
        dualTransferFrom: (
            spender: string,
            recipient_one: string, amount_one: BigNumber,
            recipient_two: string, amount_two: BigNumber) => Promise<ethers.ContractTransaction>;
    }

    export interface Manager {
        manager: () => Promise<string>;
    }

    export interface Manageable {
        pullManagement: () => Promise<ethers.ContractTransaction>;
        pushManagement: (newOwner: string) => Promise<ethers.ContractTransaction>;
        renounceManagement: () => Promise<ethers.ContractTransaction>;
    }

    export interface Mintable {
        mint: (account: string, amount: BigNumber) => Promise<ethers.ContractTransaction>;
    }

    export interface OpenZeppelin extends ERC20 {
        decreaseAllowance: (spender: string, subtractedValue: BigNumber) => Promise<ethers.ContractTransaction>;
        increaseAllowance: (spender: string, addedValue: BigNumber) => Promise<ethers.ContractTransaction>;
    }

    export interface Ownable {
        owner: () => Promise<string>;
        renounceOwnership: () => Promise<ethers.ContractTransaction>;
        transferOwnership: (newOwner: string) => Promise<ethers.ContractTransaction>;
    }

    export interface Pausable {
        pause: () => Promise<ethers.ContractTransaction>;
        paused: () => Promise<boolean>;
        unpause: () => Promise<ethers.ContractTransaction>;
    }

    export interface Policy {
        policy: () => Promise<string>;
        pullPolicy: () => Promise<ethers.ContractTransaction>;
        pushPolicy: (newPolicy: string) => Promise<ethers.ContractTransaction>;
        renouncePolicy: () => Promise<ethers.ContractTransaction>;
    }

    export interface Permittable {
        DOMAIN_SEPARATOR: () => Promise<string>;
        nonces: (owner: string) => Promise<BigNumber>;
        permit: (
            owner: string,
            spender: string,
            value: BigNumber,
            deadline: BigNumber,
            v: number,
            r: string,
            s: string
        ) => Promise<ethers.ContractTransaction>;
        PERMIT_TYPEHASH: () => Promise<string>;
    }

    export interface TimeLock {
        beneficiary: () => Promise<string>;
        release: () => Promise<ethers.ContractTransaction>;
        releaseTime: () => Promise<BigNumber>;
        token: () => Promise<ethers.Contract>;
    }

    export interface VaultOwned extends Ownable {
        vault: () => Promise<string>;
    }

    export interface MintableBurnablePermittable extends OpenZeppelin, Mintable, Burnable, Permittable {}
}

export default IERC20;
