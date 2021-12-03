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

import IDAO from '../interfaces/contracts/IDAO';
import { NullAddress } from '../interfaces/contracts/IERC20';
import { BigNumber, ethers } from 'ethers';
import ContractWrapper from './ContractWrapper';
import { Extensions } from './ERC20';
import applyMixins from '../helpers/Mixins';
export * from '../helpers/Mixins';

export class Bond extends ContractWrapper implements IDAO.Bond {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly tokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async DAO (): Promise<string> {
        return this.contract.DAO();
    }

    public async adjustment (): Promise<IDAO.BondTarget> {
        return this.contract.adjustment();
    }

    public async bondCalculator (): Promise<string> {
        return this.contract.bondCalculator();
    }

    public async bondInfo (address: string): Promise<IDAO.BondInfo> {
        return this.contract.bondInfo(address);
    }

    public async bondPrice (): Promise<BigNumber> {
        return this.contract.bondPrice();
    }

    public async bondPriceInUSD (): Promise<BigNumber> {
        return this.contract.bondPriceInUSD();
    }

    public async currentDebt (): Promise<BigNumber> {
        return this.contract.currentDebt();
    }

    public async debtDecay (): Promise<BigNumber> {
        return this.contract.debtDecay();
    }

    public async debtRatio (): Promise<BigNumber> {
        return this.contract.debtRatio();
    }

    public async deposit (amount: BigNumber, maxPrice: BigNumber, depositor: string): Promise<ethers.ContractTransaction> {
        return this.contract.deposit(amount, maxPrice, depositor);
    }

    public async initializeBondTerms (
        controlVariable: BigNumber,
        vestingTerm: BigNumber,
        minimumPrice: BigNumber,
        maxPayout: BigNumber,
        fee: BigNumber,
        maxDebt: BigNumber,
        initialDebt: BigNumber
    ): Promise<ethers.ContractTransaction> {
        return this.contract.initializeBondTerms(
            controlVariable,
            vestingTerm,
            minimumPrice,
            maxPayout,
            fee,
            maxDebt,
            initialDebt
        );
    }

    public async isLiquidityBond (): Promise<boolean> {
        return this.contract.isLiquidityBond();
    }

    public async lastDecay (): Promise<BigNumber> {
        return this.contract.lastDecay();
    }

    public async maxPayout (): Promise<BigNumber> {
        return this.contract.maxPayout();
    }

    public async payoutFor (value: BigNumber): Promise<BigNumber> {
        return this.contract.payoutFor(value);
    }

    public async pendingPayoutFor (depositor: string): Promise<BigNumber> {
        return this.contract.pendingPayoutFor(depositor);
    }

    public async percentVestedFor (depositor: string): Promise<BigNumber> {
        return this.contract.percentVestedFor(depositor);
    }

    public async policy (): Promise<string> {
        return this.contract.policy();
    }

    public async principle (): Promise<string> {
        return this.contract.principle();
    }

    public async recoverLostToken (token: string): Promise<ethers.ContractTransaction> {
        return this.contract.recoverLostToken(token);
    }

    public async redeem (recipient: string, stake: boolean): Promise<ethers.ContractTransaction> {
        return this.contract.redeem(recipient, stake);
    }

    public async setAdjustment (addition: boolean,
        increment: BigNumber,
        target: BigNumber,
        buffer: BigNumber
    ): Promise<ethers.ContractTransaction> {
        return this.contract.setAdjustment(
            increment,
            target,
            buffer
        );
    }

    public async setBondTerms (parameter: number, input: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.setBondTerms(parameter, input);
    }

    public async setStaking (staking: string, helper: boolean): Promise<ethers.ContractTransaction> {
        return this.contract.setStaking(staking, helper);
    }

    public async staking (): Promise<string> {
        return this.contract.staking();
    }

    public async stakingHelper (): Promise<string> {
        return this.contract.stakingHelper();
    }

    public async standardizedDebtRatio (): Promise<BigNumber> {
        return this.contract.standardizedDebtRatio();
    }

    public async terms (): Promise<IDAO.BondTerms> {
        return this.contract.terms();
    }

    public async token (): Promise<string> {
        return this.contract[this.tokenSymbol]();
    }

    public async totalDebt (): Promise<BigNumber> {
        return this.contract.totalDebt();
    }

    public async treasury (): Promise<string> {
        return this.contract.treasury();
    }

    public async useHelper (): Promise<boolean> {
        return this.contract.useHelper();
    }
}
export interface Bond extends Extensions.Manager, Extensions.Manageable {}
applyMixins(Bond, Extensions.Manager, Extensions.Manageable);

export class BondCalculator extends ContractWrapper implements IDAO.BondCalculator {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly tokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async getKValue (pair: string): Promise<BigNumber> {
        return this.contract.getKValue(pair);
    }

    public async getTotalValue (pair: string): Promise<BigNumber> {
        return this.contract.getTotalValue(pair);
    }

    public async markdown (pair: string): Promise<BigNumber> {
        return this.contract.markdown(pair);
    }

    public async token (): Promise<string> {
        return this.contract[this.tokenSymbol]();
    }

    public async valuation (pair: string, amount: BigNumber): Promise<BigNumber> {
        return this.contract.valuation(pair, amount);
    }
}

export class BondInformationHelper extends ContractWrapper {
    public async name (bondContract: string): Promise<{name0: string, name1: string}> {
        return this.contract.name(bondContract);
    }

    public async symbol (bondContract: string): Promise<{symbol0: string, symbol1: string}> {
        return this.contract.symbol(bondContract);
    }
}

export class BondPriceHelper extends ContractWrapper implements IDAO.BondPriceHelper {
    public async addBond (bond: string): Promise<ethers.ContractTransaction> {
        return this.contract.addBond(bond);
    }

    public async addExecutor (executor: string): Promise<ethers.ContractTransaction> {
        return this.contract.addExecutor(executor);
    }

    public async adjustPrice (bond: string, percent: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.adjustPrice(bond, percent);
    }

    public async bonds (input: string): Promise<boolean> {
        return this.contract.bonds(input);
    }

    public async executors (input: string): Promise<boolean> {
        return this.contract.executors(input);
    }

    public async realOwner (): Promise<string> {
        return this.contract.realOwner();
    }

    public async receiveOwnership (bond: string): Promise<ethers.ContractTransaction> {
        return this.contract.receiveOwnership(bond);
    }

    public async removeBond (bond: string): Promise<ethers.ContractTransaction> {
        return this.contract.removeBond(bond);
    }

    public async removeExecutor (executor: string): Promise<ethers.ContractTransaction> {
        return this.contract.removeExecutor(executor);
    }

    public async returnOwnership (bond: string): Promise<ethers.ContractTransaction> {
        return this.contract.returnOwnership(bond);
    }

    public async viewPriceAdjust (bond: string, percent: BigNumber): Promise<IDAO.BondPriceAdjustment> {
        return this.contract.viewPriceAdjust(bond, percent);
    }
}
export interface BondPriceHelper extends Extensions.Manager, Extensions.Manageable {}
applyMixins(BondPriceHelper, Extensions.Manager, Extensions.Manageable);

export class Distributor extends Extensions.Policy implements IDAO.Distributor {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly tokenSymbol: string,
        private readonly stakedTokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async adjustment (): Promise<IDAO.DistributorAdjustment> {
        return this.contract.adjustment();
    }

    public async distribute (): Promise<ethers.ContractTransaction> {
        return this.contract.distribute();
    }

    public async epochLength (): Promise<BigNumber> {
        return this.contract.epochLength();
    }

    public async favoriteForNew (): Promise<BigNumber> {
        return this.contract.favouriteForNew();
    }

    public async newStakedToken (): Promise<string> {
        return this.contract[this.stakedTokenSymbol + 'New']();
    }

    public async newStaking (): Promise<string> {
        return this.contract.newStaking();
    }

    public async nextEpochBlock (): Promise<BigNumber> {
        return this.contract.nextEpochBlock();
    }

    public async nextRewardAt (rate: BigNumber): Promise<BigNumber> {
        return this.contract.nextRewardAt(rate);
    }

    public async nextRewardFor (recipient: string): Promise<BigNumber> {
        return this.contract.nextRewardFor(recipient);
    }

    public async oldStakedToken (): Promise<string> {
        return this.contract[this.stakedTokenSymbol + 'Old']();
    }

    public async oldStaking (): Promise<string> {
        return this.contract.oldStaking();
    }

    public async rate (): Promise<BigNumber> {
        return this.contract.rate();
    }

    public async setAdjustment (add: boolean, rate: BigNumber, target: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.setAdjustment(add, rate, target);
    }

    public async setFavoriteForNew (favoriteForNew: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.setFavouriteForNew(favoriteForNew);
    }

    public async setNewStaking (newStaking: string, tokenContract: string): Promise<ethers.ContractTransaction> {
        return this.contract.setNewStaking(newStaking, tokenContract);
    }

    public async setRate (rewardRate: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.setRate(rewardRate);
    }

    public async split (
        reward: BigNumber,
        supply1: BigNumber,
        supply2: BigNumber,
        favoriteFor2: BigNumber
    ): Promise<BigNumber> {
        return this.contract.split(
            reward,
            supply1,
            supply2,
            favoriteFor2
        );
    }

    public async token (): Promise<string> {
        return this.contract[this.tokenSymbol]();
    }

    public async treasury (): Promise<string> {
        return this.contract.treasury();
    }
}

export class RedeemHelper extends Extensions.Manageable implements IDAO.RedeemHelper {
    public async addBondContract (bond: string): Promise<ethers.ContractTransaction> {
        return this.contract.addBondContract(bond);
    }

    public async bonds (input: BigNumber): Promise<string> {
        return this.contract.bonds(input);
    }

    public async getBonds (maxBonds = 20): Promise<string[]> {
        const result: string[] = [];

        for (let i = 0; i < maxBonds; ++i) {
            try {
                const contract_address = await this.bonds(BigNumber.from(i));

                if (contract_address !== NullAddress) {
                    result.push(contract_address);
                }
            } catch {}
        }

        return result;
    }

    public async policy (): Promise<string> {
        return this.contract.policy();
    }

    public async redeemAll (recipient: string, stake: boolean): Promise<ethers.ContractTransaction> {
        return this.contract.redeemAll(recipient, stake);
    }

    public async removeBondContract (index: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.removeBondContract(index);
    }
}

export class StakedToken extends Extensions.OpenZeppelin implements IDAO.StakedToken {
    public async INDEX (): Promise<BigNumber> {
        return this.contract.INDEX();
    }

    public async balanceForGons (gons: BigNumber): Promise<BigNumber> {
        return this.contract.balanceForGons(gons);
    }

    public async circulatingSupply (): Promise<BigNumber> {
        return this.contract.circulatingSupply();
    }

    public async gonsForBalance (amount: BigNumber): Promise<BigNumber> {
        return this.contract.gonsForBalance(amount);
    }

    public async index (): Promise<BigNumber> {
        return this.contract.index();
    }

    public async initialize (stakingContract: string): Promise<ethers.ContractTransaction> {
        return this.contract.initialize(stakingContract);
    }

    public async initializer (): Promise<string> {
        return this.contract.initializer();
    }

    public async rebase (profit: BigNumber, epoch: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.rebase(profit, epoch);
    }

    public async rebases (input: BigNumber): Promise<IDAO.StakedTokenRebase> {
        return this.contract.rebases(input);
    }

    public async setIndex (index: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.setIndex(index);
    }

    public async stakingContract (): Promise<string> {
        return this.contract.stakingContract();
    }
}
export interface StakedToken extends Extensions.Mintable, Extensions.Permittable, Extensions.Manager, Extensions.Manageable {}
applyMixins(StakedToken, Extensions.Mintable, Extensions.Permittable, Extensions.Manager, Extensions.Manageable);

export class Staking extends ContractWrapper implements IDAO.Staking {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly tokenSymbol: string,
        private readonly stakedTokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async contractBalance (): Promise<BigNumber> {
        return this.contract.contractBalance();
    }

    public async claim (recipient: string): Promise<ethers.ContractTransaction> {
        return this.contract.claim(recipient);
    }

    public async distributor (): Promise<string> {
        return this.contract.distributor();
    }

    public async epoch (): Promise<IDAO.StakingEpoch> {
        return this.contract.epoch();
    }

    public async forfeit (): Promise<ethers.ContractTransaction> {
        return this.contract.forfeit();
    }

    public async giveLockBonus (amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.giveLockBonus(amount);
    }

    public async index (): Promise<BigNumber> {
        return this.contract.index();
    }

    public async locker (): Promise<string> {
        return this.contract.locker();
    }

    public async rebase (): Promise<ethers.ContractTransaction> {
        return this.contract.rebase();
    }

    public async returnLockBonus (amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.returnLockBonus(amount);
    }

    public async setContract (contract: number, address: string): Promise<ethers.ContractTransaction> {
        return this.contract.setContract(contract, address);
    }

    public async setWarmup (warmupPeriod: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.setWarmup(warmupPeriod);
    }

    public async stake (amount: BigNumber, recipient: string): Promise<ethers.ContractTransaction> {
        return this.contract.stake(amount, recipient);
    }

    public async stakedToken (): Promise<string> {
        return this.contract[this.stakedTokenSymbol]();
    }

    public async toggleDepositLock (): Promise<ethers.ContractTransaction> {
        return this.contract.toggleDepositLock();
    }

    public async token (): Promise<string> {
        return this.contract[this.tokenSymbol]();
    }

    public async totalBonus (): Promise<BigNumber> {
        return this.contract.totalBonus();
    }

    public async unstake (amount: BigNumber, trigger: boolean): Promise<ethers.ContractTransaction> {
        return this.contract.unstake(amount, trigger);
    }

    public async warmupContract (): Promise<string> {
        return this.contract.warmupContract();
    }

    public async warmupInfo (input: string): Promise<IDAO.StakingWarmupInfo> {
        return this.contract.warmupInfo(input);
    }

    public async warmupPeriod (): Promise<BigNumber> {
        return this.contract.warmupPeriod();
    }
}
export interface Staking extends Extensions.Manager, Extensions.Manageable {}
applyMixins(Staking, Extensions.Manager, Extensions.Manageable);

export class StakingHelper extends ContractWrapper implements IDAO.StakingHelper {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly tokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async stake (amount: BigNumber, recipient: string): Promise<ethers.ContractTransaction> {
        return this.contract.stake(amount, recipient);
    }

    public async staking (): Promise<string> {
        return this.contract.staking();
    }

    public async token (): Promise<string> {
        return this.contract[this.tokenSymbol]();
    }
}

export class Treasury extends ContractWrapper implements IDAO.Treasury {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly tokenSymbol: string,
        private readonly stakedTokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async auditReserves (): Promise<ethers.ContractTransaction> {
        return this.contract.auditReserves();
    }

    public async blocksNeededForQueue (): Promise<BigNumber> {
        return this.contract.blocksNeededForQueue();
    }

    public async bondCalculator (input: string): Promise<string> {
        return this.contract.bondCalculator(input);
    }

    public async debtorBalance (input: string): Promise<BigNumber> {
        return this.contract.debtorBalance(input);
    }

    public async debtorQueue (input: string): Promise<BigNumber> {
        return this.contract.debtorQueue(input);
    }

    public async debtors (input: BigNumber): Promise<string> {
        return this.contract.debtors(input);
    }

    public async deposit (amount: BigNumber, token: string, profit: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.deposit(amount, token, profit);
    }

    public async excessReserves (): Promise<BigNumber> {
        return this.contract.excessReserves();
    }

    public async incurDebt (amount: BigNumber, token: string): Promise<ethers.ContractTransaction> {
        return this.contract.incurDebt(amount, token);
    }

    public async isDebtor (input: string): Promise<boolean> {
        return this.contract.isDebtor(input);
    }

    public async isLiquidityDepositor (input: string): Promise<boolean> {
        return this.contract.isLiquidityDepositor(input);
    }

    public async isLiquidityManager (input: string): Promise<boolean> {
        return this.contract.isLiquidityManager(input);
    }

    public async isLiquidityToken (input: string): Promise<boolean> {
        return this.contract.isLiquidityToken(input);
    }

    public async isReserveDepositor (input: string): Promise<boolean> {
        return this.contract.isReserveDepositor(input);
    }

    public async isReserveManager (input: string): Promise<boolean> {
        return this.contract.isReserveManager(input);
    }

    public async isReserveSpender (input: string): Promise<boolean> {
        return this.contract.isReserveSpender(input);
    }

    public async isReserveToken (input: string): Promise<boolean> {
        return this.contract.isReserveToken(input);
    }

    public async isRewardManager (input: string): Promise<boolean> {
        return this.contract.isRewardManager(input);
    }

    public async LiquidityDepositorQueue (input: string): Promise<BigNumber> {
        return this.contract.LiquidityDepositorQueue(input);
    }

    public async liquidityDepositors (input: BigNumber): Promise<string> {
        return this.contract.liquidityDepositors(input);
    }

    public async LiquidityManagerQueue (input: string): Promise<BigNumber> {
        return this.contract.LiquidityManagerQueue(input);
    }

    public async liquidityManagers (input: BigNumber): Promise<string> {
        return this.contract.liquidityManagers(input);
    }

    public async LiquidityTokenQueue (input: string): Promise<BigNumber> {
        return this.contract.LiquidityManagerQueue(input);
    }

    public async liquidityTokens (input: BigNumber): Promise<string> {
        return this.contract.liquidityManagers(input);
    }

    public async manage (token: string, amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.manage(token, amount);
    }

    public async mintRewards (recipient: string, amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.mintRewards(recipient, amount);
    }

    public async queue (managing: number, address: string): Promise<ethers.ContractTransaction> {
        return this.contract.queue(managing, address);
    }

    public async repayDebt (amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract['repayDebtWith' + this.tokenSymbol](amount);
    }

    public async repayDebtWithReserve (amount: BigNumber, token: string): Promise<ethers.ContractTransaction> {
        return this.contract.repayDebtWithReserve(amount, token);
    }

    public async reserveDepositorQueue (input: string): Promise<BigNumber> {
        return this.contract.reserveDepositorQueue(input);
    }

    public async reserveDepositors (input: BigNumber): Promise<string> {
        return this.contract.reserveDepositors(input);
    }

    public async ReserveManagerQueue (input: string): Promise<BigNumber> {
        return this.contract.ReserveManagerQueue(input);
    }

    public async reserveManagers (input: BigNumber): Promise<string> {
        return this.contract.reserveManagers(input);
    }

    public async reserveSpenderQueue (input: string): Promise<BigNumber> {
        return this.contract.reserveSpenderQueue(input);
    }

    public async reserveSpenders (input: BigNumber): Promise<string> {
        return this.contract.reserveSpenders(input);
    }

    public async reserveTokenQueue (input: string): Promise<BigNumber> {
        return this.contract.reserveTokenQueue(input);
    }

    public async reserveTokens (input: BigNumber): Promise<string> {
        return this.contract.reserveTokens(input);
    }

    public async rewardManagerQueue (input: string): Promise<BigNumber> {
        return this.contract.rewardManagerQueue(input);
    }

    public async rewardManagers (input: BigNumber): Promise<string> {
        return this.contract.rewardManagers(input);
    }

    public async toggle (managing: number, address: string, calculator: string): Promise<ethers.ContractTransaction> {
        return this.contract.toggle(managing, address, calculator);
    }

    public async token (): Promise<string> {
        return this.contract[this.tokenSymbol]();
    }

    public async stakedToken (): Promise<string> {
        return this.contract[this.stakedTokenSymbol]();
    }

    public async stakedTokenQueue (): Promise<BigNumber> {
        return this.contract[this.stakedTokenSymbol + 'Queue']();
    }

    public async totalDebt (): Promise<BigNumber> {
        return this.contract.totalDebt();
    }

    public async totalReserves (): Promise<BigNumber> {
        return this.contract.totalReserves();
    }

    public async withdraw (amount: BigNumber, token: string): Promise<ethers.ContractTransaction> {
        return this.contract.withdraw(amount, token);
    }

    public async valueOf (token: string, amount: BigNumber): Promise<BigNumber> {
        return this.contract['valueOf(address,uint256)'](token, amount);
    }
}
export interface Treasury extends Extensions.Manager, Extensions.Manageable {}
applyMixins(Treasury, Extensions.Manager, Extensions.Manageable);

export class Token extends Extensions.OpenZeppelin implements IDAO.Token {}
export interface Token extends Extensions.Mintable, Extensions.Burnable, Extensions.Permittable, Extensions.VaultOwned {}
applyMixins(Token, Extensions.Mintable, Extensions.Burnable, Extensions.Permittable, Extensions.VaultOwned);

export class Warmup extends ContractWrapper implements IDAO.Warmup {
    constructor (
        public readonly contract_address: string,
        public readonly contract_abi: string,
        public readonly provider: ethers.providers.Provider | ethers.Signer,
        private readonly stakedTokenSymbol: string
    ) {
        super(contract_address, contract_abi, provider);
    }

    public async retrieve (staker: string, amount: BigNumber): Promise<ethers.ContractTransaction> {
        return this.contract.retrieve(staker, amount);
    }

    public async stakedToken (): Promise<string> {
        return this.contract[this.stakedTokenSymbol]();
    }

    public async staking (): Promise<string> {
        return this.contract.staking();
    }
}
