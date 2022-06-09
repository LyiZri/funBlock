// Copyright 2017-2021 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";

import { CardSummary, SummaryBox } from "@polkadot/react-components";
import { useApi } from "@polkadot/react-hooks";
import { BestFinalized, BestNumber, BlockToTime, TimeNow, TotalIssuance, TotalStorage } from "@polkadot/react-query";
import { BN_ONE } from "@polkadot/util";
import ClaimPot from "./ClaimPot";
import SummarySession from "./SummarySession";
import { useTranslation } from "./translate";
import styled from "styled-components";

function Summary(): React.ReactElement {
  const { t } = useTranslation();
  const { api, systemChain } = useApi();
  const isMaxwell = systemChain === "Crust Maxwell";

  return (
    <SummaryBox>
      <section className="first-section">
        <CardSummary childrenIsTop={true} className={"first"} label={t<string>("last block")}>
          <TimeNow />
        </CardSummary>
        <CardSummary childrenIsTop={true}>
          <BlockToTime label={"target"} hasCircle={true} value={BN_ONE} />
        </CardSummary>
      </section>
      <section className="second-section">
        {api.query.balances && (
          <CardSummary className="media--800" label={t<string>("total issuance")}>
            <TotalIssuance />
          </CardSummary>
        )}
        {api.query.grandpa && (
          <CardSummary label={t<string>("finalized")}>
            <BestFinalized />
          </CardSummary>
        )}
        {!isMaxwell && (
          <CardSummary className="media--800" label={t<string>("claim pot")}>
            <ClaimPot />
          </CardSummary>
        )}

        <CardSummary label={t<string>("best")}>
          <BestNumber />
        </CardSummary>
      </section>
      <section className="third-section">
        {api.query.storage && (
          <CardSummary className="total-storage-card">
            <TotalStorage label={"Total storage"} hasBg={true} />
          </CardSummary>
        )}
        <SummarySession withEra={false} />
      </section>
    </SummaryBox>
  );
}

export default React.memo(styled(Summary)`
  .total-storage-card {
    padding: 0px;
    .epoch-flex .childrenIsNotTop{
      margin-top:21px;
    }
  }
  .no-back {
    padding: 0 !important;
    background: none !important;
  }
`);
