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
import IERC20 from './IERC20';

export namespace IDAO {
    export interface DistributorAdjustment {
        add: boolean;
        rate: BigNumber;
        target: BigNumber;

        [key: string]: BigNumber | boolean;
    }

    export interface BondTarget extends DistributorAdjustment {
        buffer: BigNumber;
        lastBlock: BigNumber;

        [key: string]: BigNumber | boolean;
    }

    export interface BondInfo {
        payout: BigNumber;
        vesting: BigNumber;
        lastBlock: BigNumber;
        pricePaid: BigNumber;

        [key: string]: BigNumber;
    }

    export interface BondTerms {
        controlVariable: BigNumber;
        vestingTerm: BigNumber;
        minimumPrice: BigNumber;
        maxPayout: BigNumber;
        fee: BigNumber;
        maxDebt: BigNumber;

        [key: string]: BigNumber;
    }

    export interface Bond extends IERC20.Manager, IERC20.Manageable {
        DAO: () => Promise<string>;
        adjustment: () => Promise<BondTarget>;
        bondCalculator: () => Promise<string>;
        bondInfo: (address: string) => Promise<BondInfo>;
        bondPrice: () => Promise<BigNumber>;
        bondPriceInUSD: () => Promise<BigNumber>;
        currentDebt: () => Promise<BigNumber>;
        debtDecay: () => Promise<BigNumber>;
        debtRatio: () => Promise<BigNumber>;
        deposit: (amount: BigNumber, maxPrice: BigNumber, depositor: string) => Promise<ethers.ContractTransaction>;
        initializeBondTerms: (
            controlVariable: BigNumber,
            vestingTerm: BigNumber,
            minimumPrice: BigNumber,
            maxPayout: BigNumber,
            fee: BigNumber,
            maxDebt: BigNumber,
            initialDebt: BigNumber) => Promise<ethers.ContractTransaction>;
        isLiquidityBond: () => Promise<boolean>;
        lastDecay: () => Promise<BigNumber>;
        maxPayout: () => Promise<BigNumber>;
        payoutFor: (value: BigNumber) => Promise<BigNumber>;
        pendingPayoutFor: (depositor: string) => Promise<BigNumber>;
        percentVestedFor: (depositor: string) => Promise<BigNumber>;
        policy: () => Promise<string>;
        principle: () => Promise<string>;
        recoverLostToken: (token: string) => Promise<ethers.ContractTransaction>;
        redeem: (recipient: string, stake: boolean) => Promise<ethers.ContractTransaction>;
        setAdjustment: (
            addition: boolean,
            increment: BigNumber,
            target: BigNumber,
            buffer: BigNumber) => Promise<ethers.ContractTransaction>;
        setBondTerms: (parameter: number, input: BigNumber) => Promise<ethers.ContractTransaction>;
        setStaking: (staking: string, helper: boolean) => Promise<ethers.ContractTransaction>;
        staking: () => Promise<string>;
        stakingHelper: () => Promise<string>;
        standardizedDebtRatio: () => Promise<BigNumber>;
        terms: () => Promise<BondTerms>;
        token: () => Promise<string>; // Should be mapped to the Token symbol
        totalDebt: () => Promise<BigNumber>;
        treasury: () => Promise<string>;
        useHelper: () => Promise<boolean>;
    }

    export interface BondCalculator {
        getKValue: (pair: string) => Promise<BigNumber>;
        getTotalValue: (pair: string) => Promise<BigNumber>;
        markdown: (pair: string) => Promise<BigNumber>;
        token: () => Promise<string>; // Should be mapped to the Token symbol
        valuation: (pair: string, amount: BigNumber) => Promise<BigNumber>;
    }

    export interface BondPriceAdjustment {
        controlVar: BigNumber;
        oldControlVar: BigNumber;
        minPrice: BigNumber;
        oldMinPrice: BigNumber;
        price: BigNumber;

        [key: string]: BigNumber;
    }

    export interface BondPriceHelper extends IERC20.Manager, IERC20.Manageable {
        addBond: (bond: string) => Promise<ethers.ContractTransaction>;
        addExecutor: (executor: string) => Promise<ethers.ContractTransaction>;
        adjustPrice: (bond: string, percent: BigNumber) => Promise<ethers.ContractTransaction>;
        bonds: (input: string) => Promise<boolean>;
        executors: (input: string) => Promise<boolean>;
        realOwner: () => Promise<string>;
        receiveOwnership: (bond: string) => Promise<ethers.ContractTransaction>;
        removeBond: (bond: string) => Promise<ethers.ContractTransaction>;
        removeExecutor: (executor: string) => Promise<ethers.ContractTransaction>;
        returnOwnership: (bond: string) => Promise<ethers.ContractTransaction>;
        viewPriceAdjust: (bond: string, percent: BigNumber) => Promise<BondPriceAdjustment>;
    }

    export interface Distributor extends IERC20.Policy {
        adjustment: () => Promise<DistributorAdjustment>;
        distribute: () => Promise<ethers.ContractTransaction>;
        epochLength: () => Promise<BigNumber>;
        favoriteForNew: () => Promise<BigNumber>;
        newStakedToken: () => Promise<string>; // Should be mapped to the StakedToken
        newStaking: () => Promise<string>;
        nextEpochBlock: () => Promise<BigNumber>;
        nextRewardAt: (rate: BigNumber) => Promise<BigNumber>;
        nextRewardFor: (recipient: string) => Promise<BigNumber>;
        oldStakedToken: () => Promise<string>; // Should be mapped to the StakedToken
        oldStaking: () => Promise<string>;
        rate: () => Promise<BigNumber>;
        setAdjustment: (add: boolean, rate: BigNumber, target: BigNumber) => Promise<ethers.ContractTransaction>;
        setFavoriteForNew: (favoriteForNew: BigNumber) => Promise<ethers.ContractTransaction>;
        setNewStaking: (newStaking: string, tokenContract: string) => Promise<ethers.ContractTransaction>;
        setRate: (rewardRate: BigNumber) => Promise<ethers.ContractTransaction>;
        split: (
            reward: BigNumber,
            supply1: BigNumber,
            supply2: BigNumber,
            favoriteFor2: BigNumber) => Promise<BigNumber>;
        token: () => Promise<string>; // Should be mapped to the Token symbol
        treasury: () => Promise<string>;
    }

    export interface RedeemHelper extends IERC20.Manageable {
        addBondContract: (bond: string) => Promise<ethers.ContractTransaction>;
        bonds: (input: BigNumber) => Promise<string>;
        policy: () => Promise<string>;
        redeemAll: (recipient: string, stake: boolean) => Promise<ethers.ContractTransaction>;
        removeBondContract: (index: BigNumber) => Promise<ethers.ContractTransaction>;
    }

    export interface StakedTokenRebase {
        epoch: BigNumber;
        rebase: BigNumber;
        totalStakedBefore: BigNumber;
        totalStakedAfter: BigNumber;
        amountRebased: BigNumber;
        index: BigNumber;
        blockNumberOccured: BigNumber;

        [key: string]: BigNumber;
    }

    export interface StakedToken extends IERC20.OpenZeppelin, IERC20.Mintable, IERC20.Permittable, IERC20.Manager, IERC20.Manageable {
        INDEX: () => Promise<BigNumber>;
        balanceForGons: (gons: BigNumber) => Promise<BigNumber>;
        circulatingSupply: () => Promise<BigNumber>;
        gonsForBalance: (amount: BigNumber) => Promise<BigNumber>;
        index: () => Promise<BigNumber>;
        initialize: (stakingContract: string) => Promise<ethers.ContractTransaction>;
        initializer: () => Promise<string>;
        rebase: (profit: BigNumber, epoch: BigNumber) => Promise<ethers.ContractTransaction>;
        rebases: (input: BigNumber) => Promise<StakedTokenRebase>;
        setIndex: (index: BigNumber) => Promise<ethers.ContractTransaction>;
        stakingContract: () => Promise<string>;
    }

    export interface StakingEpoch {
        _length: BigNumber;
        number: BigNumber;
        endBlock: BigNumber;
        distribute: BigNumber;

        [key: string]: BigNumber;
    }

    export interface StakingWarmupInfo {
        deposit: BigNumber;
        gons: BigNumber;
        expiry: BigNumber;
        lock: boolean;

        [key: string]: BigNumber | boolean;
    }

    export interface Staking extends IERC20.Manager, IERC20.Manageable {
        contractBalance: () => Promise<BigNumber>;
        claim: (recipient: string) => Promise<ethers.ContractTransaction>;
        distributor: () => Promise<string>;
        epoch: () => Promise<StakingEpoch>;
        forfeit: () => Promise<ethers.ContractTransaction>;
        giveLockBonus: (amount: BigNumber) => Promise<ethers.ContractTransaction>;
        index: () => Promise<BigNumber>;
        locker: () => Promise<string>;
        rebase: () => Promise<ethers.ContractTransaction>;
        returnLockBonus: (amount: BigNumber) => Promise<ethers.ContractTransaction>;
        setContract: (contract: number, address: string) => Promise<ethers.ContractTransaction>;
        setWarmup: (warmupPeriod: BigNumber) => Promise<ethers.ContractTransaction>;
        stake: (amount: BigNumber, recipient: string) => Promise<ethers.ContractTransaction>;
        stakedToken: () => Promise<string>; // Should be mapped to the StakedToken symbol
        toggleDepositLock: () => Promise<ethers.ContractTransaction>;
        token: () => Promise<string>; // Should be mapped to the Token symbol
        totalBonus: () => Promise<BigNumber>;
        unstake: (amount: BigNumber, trigger: boolean) => Promise<ethers.ContractTransaction>;
        warmupContract: () => Promise<string>;
        warmupInfo: (input: string) => Promise<StakingWarmupInfo>;
        warmupPeriod: () => Promise<BigNumber>;
    }

    export interface StakingHelper {
        stake: (amount: BigNumber, recipient: string) => Promise<ethers.ContractTransaction>;
        staking: () => Promise<string>;
        token: () => Promise<string>; // Should be mapped to the Token symbol
    }

    export interface Treasury extends IERC20.Manager, IERC20.Manageable {
        auditReserves: () => Promise<ethers.ContractTransaction>;
        blocksNeededForQueue: () => Promise<BigNumber>;
        bondCalculator: (input: string) => Promise<string>;
        debtorBalance: (input: string) => Promise<BigNumber>;
        debtorQueue: (input: string) => Promise<BigNumber>;
        debtors: (input: BigNumber) => Promise<string>;
        deposit: (amount: BigNumber, token: string, profit: BigNumber) => Promise<ethers.ContractTransaction>;
        excessReserves: () => Promise<BigNumber>;
        incurDebt: (amount: BigNumber, token: string) => Promise<ethers.ContractTransaction>;
        isDebtor: (input: string) => Promise<boolean>;
        isLiquidityDepositor: (input: string) => Promise<boolean>;
        isLiquidityManager: (input: string) => Promise<boolean>;
        isLiquidityToken: (input: string) => Promise<boolean>;
        isReserveDepositor: (input: string) => Promise<boolean>;
        isReserveManager: (input: string) => Promise<boolean>;
        isReserveSpender: (input: string) => Promise<boolean>;
        isReserveToken: (input: string) => Promise<boolean>;
        isRewardManager: (input: string) => Promise<boolean>;
        LiquidityDepositorQueue: (input: string) => Promise<BigNumber>;
        liquidityDepositors: (input: BigNumber) => Promise<string>;
        LiquidityManagerQueue: (input : string) => Promise<BigNumber>;
        liquidityManagers: (input: BigNumber) => Promise<string>;
        LiquidityTokenQueue: (input: string) => Promise<BigNumber>;
        liquidityTokens: (input: BigNumber) => Promise<string>;
        manage: (token: string, amount: BigNumber) => Promise<ethers.ContractTransaction>;
        mintRewards: (recipient: string, amount: BigNumber) => Promise<ethers.ContractTransaction>;
        queue: (managing: number, address: string) => Promise<ethers.ContractTransaction>;
        repayDebt: (amount: BigNumber) => Promise<ethers.ContractTransaction>; // should be mapped to the Token
        repayDebtWithReserve: (amount: BigNumber, token: string)=> Promise<ethers.ContractTransaction>;
        reserveDepositorQueue: (input: string) => Promise<BigNumber>;
        reserveDepositors: (input: BigNumber) => Promise<string>;
        ReserveManagerQueue: (input: string) => Promise<BigNumber>;
        reserveManagers: (input: BigNumber) => Promise<string>;
        reserveSpenderQueue: (input: string) => Promise<BigNumber>;
        reserveSpenders: (input: BigNumber) => Promise<string>;
        reserveTokenQueue: (input: string) => Promise<BigNumber>;
        reserveTokens: (input: BigNumber) => Promise<string>;
        rewardManagerQueue: (input: string) => Promise<BigNumber>;
        rewardManagers: (input: BigNumber) => Promise<string>;
        toggle: (managing: number, address: string, calculator: string) => Promise<ethers.ContractTransaction>;
        token: () => Promise<string>; // Should be mapped to the Token symbol
        stakedToken: () => Promise<string>; // should be mapped to the StakedToken symbol
        stakedTokenQueue: () => Promise<BigNumber>; // should be mapped to the StakeToken symbol
        totalDebt: () => Promise<BigNumber>;
        totalReserves: () => Promise<BigNumber>;
        withdraw: (amount: BigNumber, token: string) => Promise<ethers.ContractTransaction>;
        valueOf: (token: string, amount: BigNumber) => Promise<BigNumber>;
    }

    export interface Token extends IERC20.OpenZeppelin, IERC20.Mintable, IERC20.Burnable, IERC20.Permittable, IERC20.VaultOwned {}

    export interface Warmup {
        retrieve: (staker: string, amount: BigNumber) => Promise<ethers.ContractTransaction>;
        stakedToken: () => Promise<string>; // Should be mapped to the StakedToken symbol
        staking: () => Promise<string>;
    }
}

export default IDAO;
