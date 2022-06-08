// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Route } from "@polkadot/apps-routing/types";
import { HelpOverlay, Tabs } from "@polkadot/react-components";
import Query from '../../../page-explorer/src/Query'
import NotFound from '../Content/NotFound'
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getItems } from "./getItems";

import createRoutes from "@polkadot/apps-routing";
import { useApi } from "@polkadot/react-hooks";

import { useTranslation } from "../translate";
import ChainInfo from "./ChainInfo";
import basicMd from './md/basic.md';
// import Grouping from './Grouping';
// import Item from './Item';
// import NodeInfo from './NodeInfo';

interface Props {
  className?: string;
}
const NOT_FOUND: Route = {
  Component: NotFound,
  display: {
    needsApi: undefined
  },
  group: 'settings',
  icon: 'times',
  isIgnored: false,
  name: 'unknown',
  text: 'Unknown'
};



function Menu({ className = "" }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const apiProps = useApi();
  const location = useLocation();

  const isLoading = !apiProps.isApiReady || !apiProps.isApiConnected;
  const { name } = useMemo((): Route => {
    const app = location.pathname.slice(1) || "";

    return createRoutes(t).find((route) => !!(route && app.startsWith(route.name))) || NOT_FOUND;
  }, [location, t]);

  return (
    <div className={`${className}${isLoading ? " isLoading" : ""}`}>
      <div className="menuContainer">
        <ChainInfo />
        <p className="page-name">{name.slice(0,1).toUpperCase()}{name.slice(1).toLowerCase()}</p>
        
        {
          name.length != 0 &&
          <Tabs basePath={`/${name}`} hidden={undefined} isRoot items={getItems(name)} />
        }
        {
          (location.pathname == '/explorer/query' || location.pathname == '/explorer') &&
          <Query />}
        {
          <HelpOverlay md={basicMd as string} />
        }
      </div>
    </div>
  );
}

export default React.memo(styled(Menu)`
  width: 100%;
  padding: 0;
  z-index: 220;
  position: relative;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  background: #1A1B24;
  height:100px;
  display:flex;
  align-items:center;
  & .menuContainer {
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    width: 100%;
    margin: 0 auto;
  }
  .page-name{
    margin-bottom:0;
    font-size:19px;
    margin-left:100px;
    color:#925CFF;
  }
  &.isLoading {
    // background: #999 !important;
    .menuActive {
      background: var(--bg-page);
    }

    &:before {
      filter: grayscale(1);
    }

    .menuItems {
      filter: grayscale(1);
    }
  }

  .menuSection {
    align-items: center;
    display: flex;
  }

  .menuActive {
    background: var(--bg-tabs);
    border-bottom: none;
    border-radius: 0.25rem 0.25rem 0 0;
    color: var(--color-text);
    padding: 1rem 1.5rem;
    margin: 0 1rem -1px;
    z-index: 1;

    .ui--Icon {
      margin-right: 0.5rem;
    }
  }

  .menuItems {
    flex: 1 1;
    list-style: none;
    margin: 0 1rem 0 0;
    padding: 0;

    > li {
      // display: inline-block;
    }

    > li + li {
      margin-left: 0.375rem;
    }
  }

  .ui--NodeInfo {
    align-self: center;
  }
`);
