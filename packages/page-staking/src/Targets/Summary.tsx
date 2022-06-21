// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSessionIndexes } from "@polkadot/api-derive/types";
import type { Option } from "@polkadot/types";
import type { Balance } from "@polkadot/types/interfaces";

import BN from "bn.js";
import React, { useMemo } from "react";

import { CardSummary, SummaryBox } from "@polkadot/react-components";
import { useApi, useCall } from "@polkadot/react-hooks";
import { FormatBalance } from "@polkadot/react-query";
import { BN_ONE, BN_ZERO } from "@polkadot/util";

import { useTranslation } from "../translate";
import "./index.scss";

interface Props {
  avgStaked?: BN;
  lowStaked?: BN;
  minNominated?: BN;
  numNominators?: number;
  numValidators?: number;
  stakedReturn: number;
  totalIssuance?: BN;
  totalStaked?: BN;
}

const transformReward = {
  transform: (optBalance: Option<Balance>) => optBalance.unwrapOrDefault(),
};

const transformEra = {
  transform: ({ activeEra }: DeriveSessionIndexes) => (activeEra.gt(BN_ZERO) ? activeEra.sub(BN_ONE) : undefined),
};

function Summary({
  avgStaked,
  lowStaked,
  minNominated,
  numNominators,
  numValidators,
  totalIssuance,
  totalStaked,
}: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const lastEra = useCall<BN | undefined>(api.derive.session.indexes, undefined, transformEra);
  const lastReward = useCall<BN>(lastEra && api.query.staking.erasValidatorReward, [lastEra], transformReward);

  const progressStake = useMemo(
    () =>
      totalIssuance && totalStaked && totalStaked.gtn(0)
        ? {
          hideValue: true,
          total: totalIssuance,
          value: totalStaked,
        }
        : undefined,
    [totalIssuance, totalStaked]
  );

  const progressAvg = useMemo(
    () =>
      avgStaked && lowStaked && avgStaked.gtn(0)
        ? {
          hideValue: true,
          total: avgStaked,
          value: lowStaked,
        }
        : undefined,
    [avgStaked, lowStaked]
  );
  return (
    <SummaryBox>
      <section className="media--800">
        {totalIssuance && totalStaked?.gt(BN_ZERO) && (
          <div className="double-progress-box">
            <div className="progress-content-box">
              <div className="progress-label-box">
                <span className="label-point first"></span>
                <p>
                  <p className="lable-title">
                    <label>total effective stake</label>
                  </p>
                  <FormatBalance value={totalStaked} withSi />
                </p>
              </div>
              <div className="progress-label-box">
                <span className="label-point second"></span>
                <p>
                  <p className="lable-title">
                    <label>total Issuance</label>
                  </p>
                  <FormatBalance value={totalIssuance} withSi />
                </p>
              </div>
            </div>
            <CardSummary
              label={t<string>("total effective stake / totalIssuance")}
              progress={progressStake}
              isDouble={true}
            ></CardSummary>
          </div>
        )}
      </section>
      {/* <section className='media--800'>
        {totalIssuance && (stakedReturn > 0) && Number.isFinite(stakedReturn) && (
          <CardSummary label={t<string>('returns')}>
            {stakedReturn.toFixed(1)}%
          </CardSummary>
        )}
      </section> */}
      <section className="media--1000">
        {avgStaked?.gtn(0) && lowStaked?.gtn(0) && (
          <div className="double-progress-box">
            <div className="progress-content-box">
              <div className="progress-label-box">
                <span className="label-point third"></span>
                <p>
                  <p className="lable-title">
                    <label>lowest</label>
                  </p>
                  <FormatBalance value={lowStaked} withCurrency={false} withSi />{" "}
                </p>
              </div>
              <div className="progress-label-box">
                <span className="label-point fouth"></span>
                <p>
                  <p className="lable-title">
                    <label>avg staked</label>
                  </p>
                  <FormatBalance value={avgStaked} withSi />{" "}
                </p>
              </div>
            </div>
            <CardSummary label={`${t<string>("lowest / avg staked")}`} progress={progressAvg} isDouble={true}>
              {/* <FormatBalance
              value={lowStaked}
              withCurrency={false}
              withSi
            />
            &nbsp;/&nbsp;
            <FormatBalance
              value={avgStaked}
              withSi
            /> */}
            </CardSummary>
          </div>
        )}
      </section>
      {numValidators && numNominators && (
        <div className="other-set need-black-bg">
          <CardSummary className="media--1600" label={`${t<string>("guarantors")} / ${t<string>("guardians")}`}>
            {numNominators}&nbsp;/&nbsp;{numValidators}
          </CardSummary>
        </div>
      )}
      <section className="media--1600">
        {minNominated?.gt(BN_ZERO) && (
          <div className="need-black-bg">
            <CardSummary className="media--1600" label={t<string>("min guaranteed")}>
              <FormatBalance value={minNominated} withSi />
            </CardSummary>
          </div>
        )}
      </section>
      <section>
        {lastReward?.gtn(0) && (
          <CardSummary label={t<string>("last reward")}>
            <FormatBalance value={lastReward} withSi />
          </CardSummary>
        )}
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
