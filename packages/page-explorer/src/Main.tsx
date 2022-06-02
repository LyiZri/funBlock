// Copyright 2017-2021 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HeaderExtended } from "@polkadot/api-derive/types";
import type { KeyedEvent } from "@polkadot/react-query/types";

import React, { useState } from "react";

import { Columar } from "@polkadot/react-components";

import BlockHeaders from "./BlockHeaders";
import Events from "./Events";
import Query from "./Query";
import Summary from "./Summary";
import "./index.scss";

interface Props {
  events: KeyedEvent[];
  headers: HeaderExtended[];
}

function Main({ events, headers }: Props): React.ReactElement<Props> {
  const [isBlock, setIsBlock] = useState(0);
  return (
    <div className="main-box">
      {/* <Query /> */}
      <Summary />
      <Columar>
        <div className="main-content-box">
          <div className="chain-info-page-switch">
            <div className={`${isBlock == 0 ? "switch-choose" : "switch-unchoose"}`} onClick={() => setIsBlock(0)}>
              recent blocks
            </div>
            <div className={`${isBlock == 1 ? "switch-choose" : "switch-unchoose"}`} onClick={() => setIsBlock(1)}>
              recent events
            </div>
          </div>
          {isBlock == 0 && (
            <Columar.Column>
              <BlockHeaders headers={headers} />
            </Columar.Column>
          )}
          {isBlock == 1 && (
            <Columar.Column>
              <Events events={events} />
            </Columar.Column>
          )}
        </div>
      </Columar>
    </div>
  );
}

export default React.memo(Main);
