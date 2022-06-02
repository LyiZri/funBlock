// Copyright 2017-2021 @polkadot/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Info } from "./types";

import React, { useEffect, useState } from "react";

import { CardSummary, SummaryBox } from "@polkadot/react-components";
import { BestNumber, Elapsed } from "@polkadot/react-query";
import { BN_ZERO, formatNumber } from "@polkadot/util";
import './index.scss'
import { useTranslation } from "../translate";

interface Props {
  nextRefresh: number;
  info: Info;
}

const EMPTY_INFO = { extrinsics: null, health: null, peers: null };

function Summary({ info: { extrinsics, health, peers } = EMPTY_INFO, nextRefresh }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [peerBest, setPeerBest] = useState(BN_ZERO);

  useEffect((): void => {
    if (peers) {
      const bestPeer = peers.sort((a, b): number => b.bestNumber.cmp(a.bestNumber))[0];

      setPeerBest(bestPeer ? bestPeer.bestNumber : BN_ZERO);
    }
  }, [peers]);

  return (
    <SummaryBox>
        {/* <CardSummary label={t<string>("refresh in")} childrenIsTop={false}> */}
          <div className="nodeinfo-card">
            <header>Refresh in</header>
          <Elapsed value={nextRefresh} />
          </div>
        {/* </CardSummary> */}
        {health && (
          <>
            {/* <CardSummary className="media--800" label={t<string>("total peers")} childrenIsTop={false}> */}
            <div className="nodeinfo-card">
              <header>Total Peers</header>
              {formatNumber(health.peers)}
              </div>
            {/* </CardSummary> */}
            {/* <CardSummary className="media--800" label={t<string>("syncing")} childrenIsTop={false}> */}
            <div className="nodeinfo-card">
              <header>Syncing</header>
              {health.isSyncing.valueOf() ? t<string>("yes") : t<string>("no")}
            </div>
            {/* </CardSummary> */}
          </>
        )}
      {extrinsics && extrinsics.length > 0 && (
          <div className="nodeinfo-card">
            <header>Queued tx</header>
            {extrinsics.length}
          </div>
      )}
        {peerBest?.gtn(0) && (
          // <CardSummary label={t<string>("peer best")} childrenIsTop={false}>
            <div className="nodeinfo-card">
          <header>Peer Best</header>
            {formatNumber(peerBest)}
            </div>
          // </CardSummary>
        )}
        {/* <CardSummary label={t<string>("our best")} childrenIsTop={false}> */}
        <div className="nodeinfo-card">
          <header>Our Best</header>
          <BestNumber />
          </div>
        {/* </CardSummary> */}
    </SummaryBox>
  );
}

export default React.memo(Summary);
