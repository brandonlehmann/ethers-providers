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

import IERC20 from '../interfaces/contracts/IERC20';
import { BigNumber, ethers } from 'ethers';
import ContractWrapper from './ContractWrapper';
import applyMixins from '../helpers/Mixins';
export * from '../helpers/Mixins';

export default class ERC20 extends ContractWrapper implements IERC20.ERC20 {
    public async allowance (owner: string, spender: string): Promise<BigNumber> {
        return this.contract.allowance(owner, spender);
    }

    public async approve (spender: string, amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.approve(spender, amount);
    }

    public async balanceOf (owner: string): Promise<BigNumber> {
        return this.contract.balanceOf(owner);
    }

    public async decimals (): Promise<number> {
        return this.contract.decimals();
    }

    public async name (): Promise<string> {
        return this.contract.decimals();
    }

    public async symbol (): Promise<string> {
        return this.contract.symbol();
    }

    public async totalSupply (): Promise<BigNumber> {
        return this.contract.totalSupply();
    }

    public async transfer (to: string, value: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.transfer(to, value);
    }

    public async transferFrom (from: string, to: string, value: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.transferFrom(from, to, value);
    }
}

export namespace Extensions {
    export class AccessControl extends ContractWrapper implements IERC20.AccessControl {
        public async getRoleAdmin (role: string): Promise<string> {
            return this.contract.getRoleAdmin(role);
        }

        public async grantRole (role: string, account: string): Promise<ethers.ContractTransaction> {
            return this.contract.grantRole(role, account);
        }

        public async hasRole (role: string, account: string): Promise<boolean> {
            return this.contract.hasRole(role, account);
        }

        public async renounceRole (role: string, account: string): Promise<ethers.ContractTransaction> {
            return this.contract.renounceRole(role, account);
        }

        public async revokeRole (role: string, account: string): Promise<ethers.ContractTransaction> {
            return this.contract.revokeRole(role, account);
        }

        public async supportsInterface (interfaceId: string): Promise<boolean> {
            return this.contract.supportsInterface(interfaceId);
        }
    }

    export class AccessControlEnumerable extends AccessControl implements IERC20.AccessControlEnumerable {
        public async getRoleMember (role: string, index: BigNumber): Promise<string> {
            return this.contract.getRoleMember(role, index);
        }

        public async getRoleMemberCount (role: string): Promise<BigNumber> {
            return this.contract.getRoleMemberCount(role);
        }
    }

    export class Burnable extends ContractWrapper implements IERC20.Burnable {
        public async burn (amount: BigNumber): Promise<ethers.ContractTransaction> {
            return this.contract.burn(amount);
        }

        public async burnFrom (account: string, amount: BigNumber): Promise<ethers.ContractTransaction> {
            return this.contract.burnFrom(account, amount);
        }
    }

    export class DualTransferable extends ContractWrapper implements IERC20.DualTransferable {
        public async dualTransfer (
            recipient_one: string, amount_one: BigNumber,
            recipient_two: string, amount_two: BigNumber
        ): Promise<ethers.ContractTransaction> {
            return this.contract.dualTransaction(recipient_one, amount_one, recipient_two, amount_two);
        }

        public async dualTransferFrom (
            spender: string,
            recipient_one: string, amount_one: BigNumber,
            recipient_two: string, amount_two: BigNumber
        ): Promise<ethers.ContractTransaction> {
            return this.contract.dualTransferFrom(spender, recipient_one, amount_one, recipient_two, amount_two);
        }
    }

    export class Manager extends ContractWrapper implements IERC20.Manager {
        public async manager (): Promise<string> {
            return this.contract.manager();
        }
    }

    export class Manageable extends ContractWrapper implements IERC20.Manageable {
        public async pullManagement (): Promise<ethers.ContractTransaction> {
            return this.contract.pullManagement();
        }

        public async pushManagement (newOwner: string): Promise<ethers.ContractTransaction> {
            return this.contract.pushManagement(newOwner);
        }

        public async renounceManagement (): Promise<ethers.ContractTransaction> {
            return this.contract.renounceManagement();
        }
    }

    export class Mintable extends ContractWrapper implements IERC20.Mintable {
        public async mint (account: string, amount: BigNumber): Promise<ethers.ContractTransaction> {
            return this.contract.mint(account, amount);
        }
    }

    export class OpenZeppelin extends ERC20 implements IERC20.OpenZeppelin {
        public async decreaseAllowance (spender: string, subtractedValue: BigNumber): Promise<ethers.ContractTransaction> {
            return this.contract.decreaseAllowance(spender, subtractedValue);
        }

        public async increaseAllowance (spender: string, addedValue: BigNumber): Promise<ethers.ContractTransaction> {
            return this.contract.increaseAllowance(spender, addedValue);
        }
    }

    export class Ownable extends ContractWrapper implements IERC20.Ownable {
        public async owner (): Promise<string> {
            return this.contract.owner();
        }

        public async renounceOwnership (): Promise<ethers.ContractTransaction> {
            return this.contract.renounceOwnership();
        }

        public async transferOwnership (newOwner: string): Promise<ethers.ContractTransaction> {
            return this.contract.transferOwnership(newOwner);
        }
    }

    export class Pausable extends ContractWrapper implements IERC20.Pausable {
        public async pause (): Promise<ethers.ContractTransaction> {
            return this.contract.pause();
        }

        public async paused (): Promise<boolean> {
            return this.contract.paused();
        }

        public async unpause (): Promise<ethers.ContractTransaction> {
            return this.contract.unpause();
        }
    }

    export class Policy extends ContractWrapper implements IERC20.Policy {
        public async policy (): Promise<string> {
            return this.contract.policy();
        }

        public async pullPolicy (): Promise<ethers.ContractTransaction> {
            return this.contract.pullPolicy();
        }

        public async pushPolicy (newPolicy: string): Promise<ethers.ContractTransaction> {
            return this.contract.pushPolicy(newPolicy);
        }

        public async renouncePolicy (): Promise<ethers.ContractTransaction> {
            return this.contract.renouncePolicy();
        }
    }

    export class Permittable extends ContractWrapper implements IERC20.Permittable {
        public async DOMAIN_SEPARATOR (): Promise<string> {
            return this.contract.DOMAIN_SEPARATOR();
        }

        public async nonces (owner: string): Promise<BigNumber> {
            return this.contract.nonces(owner);
        }

        public async permit (
            owner: string,
            spender: string,
            value: BigNumber,
            deadline: BigNumber,
            v: number,
            r: string,
            s: string
        ): Promise<ethers.ContractTransaction> {
            return this.contract.permit(owner, spender, value, deadline, v, r, s);
        }

        public async PERMIT_TYPEHASH (): Promise<string> {
            return this.contract.PERMIT_TYPEHASH();
        }
    }

    export class TimeLock extends ContractWrapper implements IERC20.TimeLock {
        public async beneficiary (): Promise<string> {
            return this.contract.beneficiary();
        }

        public async release (): Promise<ethers.ContractTransaction> {
            return this.contract.release();
        }

        public async releaseTime (): Promise<BigNumber> {
            return this.contract.releaseTime();
        }

        public async token (): Promise<ethers.Contract> {
            return this.contract.token();
        }
    }

    export class VaultOwned extends Ownable implements IERC20.VaultOwned {
        public async vault (): Promise<string> {
            return this.contract.vault();
        }
    }
}

export namespace Presets {
    export class MintableBurnablePermittable extends ContractWrapper implements IERC20.MintableBurnablePermittable {
    }

    export interface MintableBurnablePermittable extends ERC20, Extensions.OpenZeppelin, Extensions.Mintable, Extensions.Burnable, Extensions.Permittable {
    }

    applyMixins(MintableBurnablePermittable, ERC20, Extensions.OpenZeppelin, Extensions.Mintable, Extensions.Burnable, Extensions.Permittable);
}
