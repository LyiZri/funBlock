// Copyright 2017-2021 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyedEvent } from "@polkadot/react-query/types";

import React, { useContext } from "react";
import { Route, Switch } from "react-router";

import { BlockAuthorsContext, EventsContext } from "@polkadot/react-query";

import BlockInfo from "./BlockInfo";
import Forks from "./Forks";
import Main from "./Main";
import NodeInfo from "./NodeInfo";
import styled from "styled-components";
import './index.scss'

interface Props {
  basePath: string;
  className?: string;
  newEvents?: KeyedEvent[];
}


function ExplorerApp({ basePath, className }: Props): React.ReactElement<Props> {
  const { lastHeaders } = useContext(BlockAuthorsContext);
  const events = useContext(EventsContext);

  return (
    <main className={`${className} explorer-page`}>
      {/* <Tabs
        basePath={basePath}
        hidden={api.query.babe ? undefined : HIDDESN_NOBABE}
        items={itemsRef.current}
      /> */}
      <Switch>
        <Route path={`${basePath}/forks`}>
          <Forks />
        </Route>
        <Route path={`${basePath}/query/:value`}>
          <BlockInfo />
        </Route>
        <Route path={`${basePath}/query`}>
          <BlockInfo />
        </Route>
        <Route path={`${basePath}/node`}>
          <NodeInfo />
        </Route>
        <Route>
          <Main events={events} headers={lastHeaders} />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(styled(ExplorerApp)`

`);
