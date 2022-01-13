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

import FantomScanProvider from './providers/FantomScan';
import BinanceScanProvider from './providers/BinanceScan';
import { ethers, BigNumber, Wallet, utils } from 'ethers';
import { IScanProvider } from './interfaces/providers/IScanProvider';
import * as DAO from './classes/DAO';
import ERC20, { Extensions as ERC20Extensions, Presets as ERC20Presets } from './classes/ERC20';
import applyMixins from './helpers/Mixins';
import IDAO from './interfaces/contracts/IDAO';
import IERC20 from './interfaces/contracts/IERC20';
import ContractCache from './helpers/ContractCache';
import BlockTimeTracker from './classes/BlockTimeTracker';
import ContractWrapper from './classes/ContractWrapper';
import DAOInformationHelper from './classes/DAOInformationHelper';

export {
    FantomScanProvider,
    BinanceScanProvider,
    ethers,
    BigNumber,
    IScanProvider,
    DAO,
    ERC20,
    ERC20Extensions,
    ERC20Presets,
    applyMixins,
    IDAO,
    IERC20,
    ContractCache,
    Wallet,
    utils,
    BlockTimeTracker,
    ContractWrapper,
    DAOInformationHelper
};

export const Providers = [FantomScanProvider, BinanceScanProvider];

export default {
    Providers,
    FantomScanProvider,
    BinanceScanProvider,
    ethers,
    BigNumber,
    DAO,
    ERC20,
    ERC20Extensions,
    ERC20Presets,
    applyMixins,
    ContractCache,
    Wallet,
    utils
};
