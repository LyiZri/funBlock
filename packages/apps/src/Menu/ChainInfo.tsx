// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RuntimeVersion } from '@polkadot/types/interfaces';

import React from 'react';
import styled from 'styled-components';

import { ChainImg, Icon } from '@polkadot/react-components';
import { useApi, useCall, useIpfs, useToggle } from '@polkadot/react-hooks';
import { BestNumber, Chain } from '@polkadot/react-query';

import Endpoints from '../Endpoints';
import { useTranslation } from '../translate';

interface Props {
  className?: string;
}

function ChainInfo({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api, isApiReady } = useApi();
  const runtimeVersion = useCall<RuntimeVersion>(isApiReady && api.rpc.state.subscribeRuntimeVersion);
  const { ipnsChain } = useIpfs();
  const [isEndpointsVisible, toggleEndpoints] = useToggle();
  const canToggle = !ipnsChain;

  return (
    <div className={className}>
      <div
        className={`apps--SideBar-logo-inner${canToggle ? ' isClickable' : ''} highlight--color-contrast`}
        onClick={toggleEndpoints}
      >
        <ChainImg />
        <div className='info media--1000'>
          <Chain className='chain' />
          {runtimeVersion && (
            <div className='runtimeVersion'>{t<string>('version {{version}}', { replace: { version: runtimeVersion.specVersion.toNumber() } })}</div>
          )}
          {/* <BestNumber
            className='bestNumber'
            label='#'
          /> */}
        </div>
        {/* {canToggle && (
          <Icon
            className='dropdown'
            icon={isEndpointsVisible ? 'caret-right' : 'caret-down'}
          />
        )} */}
      </div>
      {isEndpointsVisible && (
        <Endpoints onClose={toggleEndpoints} />
      )}
    </div>
  );
}

export default React.memo(styled(ChainInfo)`
  box-sizing: border-box;
  padding: 0.5rem 1rem 0.5rem 0;
  margin: 0;
  .apps--SideBar-logo-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.isClickable {
      cursor: pointer;
    }

    img {
      height: 64px;
      margin-right: 0.5rem;
      width: 64px;
      background:white;
    }

    .ui--Icon.dropdown,
    > div.info {
      text-align: left;
      vertical-align: middle;
    }

    .ui--Icon.dropdown {
      flex: 0;
      margin: 0;
      width: 1rem;
    }

    .info {
      flex: 1;
      padding-right: 0.5rem;
      text-align: right;
      paddinle-left:.5rem;
      .chain {
        max-width: 16rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color:#4A4D5E;
      }
      .chain, .bestNumber {
        font-size: 22px;
        line-height: 1.2;
      }
      .runtimeVersion {
          font-size:16px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          white-space:nowrap;
          color:#7F7F8A;
      }
    }
  }
`);
