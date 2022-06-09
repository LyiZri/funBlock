// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BareProps as Props, ThemeDef } from '@polkadot/react-components/types';

import React, { useContext, useMemo, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import AppBg from './assets/images/app_bg.png';

const ApBg: any = AppBg;

import AccountSidebar from '@polkadot/app-accounts/Sidebar';
import { getSystemChainColor } from '@polkadot/apps-config';
import GlobalStyle from '@polkadot/react-components/styles';
import { useApi } from '@polkadot/react-hooks';
import Signer from '@polkadot/react-signer';

import ConnectingOverlay from './overlays/Connecting';
import Content from './Content';
import Menu from './Menu';
import WarmUp from './WarmUp';
import LeftMenu from './LeftMenu';
import './app.scss'
export const PORTAL_ID = 'portals';

function Apps({ className = '' }: Props): React.ReactElement<Props> {
  useEffect((): void => {
    let t = window.devicePixelRatio;
    if (t == 1) {
      // console.log('现在是100%');
      // console.log(document.body.style);
      // const zoom: any = document.body.style;
      // zoom.transform = 'scale(0.75)';
    }
  }, [])
  const { theme } = useContext<ThemeDef>(ThemeContext);
  const { systemChain, systemName } = useApi();

  const uiHighlight = useMemo(
    () => getSystemChainColor(systemChain, systemName),
    [systemChain, systemName]
  );

  return (
    <>
      <GlobalStyle uiHighlight={uiHighlight} />
      <div className={`apps--Wrapper theme--${theme} ${className}`}>
        <div style={{zoom:'0.9'}}>
          <Menu />
          <div className='pageContent'>
            <LeftMenu />
            <div className='content-view'>
              <AccountSidebar>
                <Signer>
                  <Content />
                </Signer>
                <ConnectingOverlay />
                <div id={PORTAL_ID} />
              </AccountSidebar>
            </div>
          </div>
        </div>
      </div>
      <WarmUp />
    </>
  );
}

export default React.memo(styled(Apps)`
  background-image: url(${ApBg});
  background-size:100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .pageContent{
    display:flex;
    box-sizing:border-box;
    jusitify-content:space-between;
  }
`);
