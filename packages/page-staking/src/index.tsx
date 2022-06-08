// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveStakingOverview } from '@polkadot/api-derive/types';
import type { AppProps as Props, ThemeProps } from '@polkadot/react-components/types';
import type { ElectionStatus } from '@polkadot/types/interfaces';

import React, { useCallback, useMemo, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useAccounts, useApi, useAvailableSlashes, useCall, useFavorites, useOwnStashInfos } from '@polkadot/react-hooks';

import Summary from './Overview/Summary';
import Actions from './Actions';
import ActionsBanner from './ActionsBanner';
import { STORE_FAVS_BASE } from './constants';
import Overview from './Overview';
import Payouts from './Payouts';
import Query from './Query';
import Slashes from './Slashes';
import Targets from './Targets';
import useSortedTargets from './useSortedTargets';
import './index.scss'


const transformElection = {
  transform: (status: ElectionStatus) => status.isOpen
};

export const validatorApy: Record<string, number> = {};

function StakingApp({ basePath, className = '' }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const { hasAccounts } = useAccounts();
  const { pathname } = useLocation();
  const [withLedger, setWithLedger] = useState(false);
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS_BASE);
  const stakingOverview = useCall<DeriveStakingOverview>(api.derive.staking.overview);
  const isInElection = useCall<boolean>(api.query.staking?.eraElectionStatus, undefined, transformElection);
  const ownStashes = useOwnStashInfos();
  const slashes = useAvailableSlashes();
  const targets = useSortedTargets(favorites, withLedger);

  const hasQueries = useMemo(
    () => hasAccounts && !!(api.query.imOnline?.authoredBlocks) && !!(api.query.staking.activeEra),
    [api, hasAccounts]
  );

  const ownValidators = useMemo(
    () => (ownStashes || []).filter(({ isStashValidating }) => isStashValidating),
    [ownStashes]
  );

  const toggleLedger = useCallback(
    () => setWithLedger(true),
    []
  );


  return (
    <main className={`staking--App ${className}`}>
      {/* <HelpOverlay md={basicMd as string} /> */}
      {/* <Tabs
        basePath={basePath}
        hidden={
          hasAccounts
            ? undefined
            : HIDDEN_ACC
        }
        items={items}
      /> */}
      <Summary
        isVisible={pathname === basePath}
        stakingOverview={stakingOverview}
        targets={targets}
      />
      <Switch>
        <Route path={`${basePath}/payout`}>
          <Payouts
            isInElection={isInElection}
            ownValidators={ownValidators}
          />
        </Route>
        <Route path={[`${basePath}/query/:value`, `${basePath}/query`]}>
          <Query />
        </Route>
        <Route path={`${basePath}/slashes`}>
          <Slashes
            ownStashes={ownStashes}
            slashes={slashes}
          />
        </Route>
        <Route path={`${basePath}/targets`}>
          <Targets
            isInElection={isInElection}
            ownStashes={ownStashes}
            stakingOverview={stakingOverview}
            targets={targets}
            toggleFavorite={toggleFavorite}
            toggleLedger={toggleLedger}
          />
        </Route>
        <Route path={`${basePath}/waiting`}>
          <Overview
            favorites={favorites}
            hasQueries={hasQueries}
            isIntentions
            stakingOverview={stakingOverview}
            targets={targets}
            toggleFavorite={toggleFavorite}
            toggleLedger={toggleLedger}
          />
        </Route>
      </Switch>
      <Actions
        className={pathname === `${basePath}/actions` ? '' : 'staking--hidden'}
        isInElection={isInElection}
        ownStashes={ownStashes}
        targets={targets}
      />
      {basePath === pathname && hasAccounts && (ownStashes?.length === 0) && (
        <ActionsBanner />
      )}
      <Overview
        className={basePath === pathname ? '' : 'staking--hidden'}
        favorites={favorites}
        hasQueries={hasQueries}
        stakingOverview={stakingOverview}
        targets={targets}
        toggleFavorite={toggleFavorite}
      />
    </main>
  );
}

export default React.memo(styled(StakingApp)(({ theme }: ThemeProps) => `
  padding-top:3rem;
  .staking--hidden {
    display: none;
  }

  .staking--Chart {
    margin-top: 1.5rem;

    h1 {
      margin-bottom: 0.5rem;
    }

    .ui--Spinner {
      margin: 2.5rem auto;
    }
  }

  .staking--optionsBar {
    margin: 0.5rem 0 1rem;
    text-align: center;
    white-space: normal;

    .staking--buttonToggle {
      display: inline-block;
      margin-right: 1rem;
      margin-top: 0.5rem;
    }
  }

  .ui--Expander.stakeOver {
    .ui--Expander-summary {
      color: var(--color-error);

    ${theme.theme === 'dark'
    ? `font-weight: bold;
      .ui--FormatBalance-value {

        > .ui--FormatBalance-postfix {
          opacity: 1;
        }
      }`
    : ''};
    }
  }
`));
