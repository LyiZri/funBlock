// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { GroupIcon } from './types';

import React from 'react';
import styled from 'styled-components';

// import { Icon } from '@polkadot/react-components';

import Item from './Item';
// import IconFont from '../../../components/icon_font';

interface Props extends GroupIcon {
  className?: string;
  isActive: boolean;
}
function Grouping({ className = '', isActive, icon, name, routes }: Props): React.ReactElement<Props> {

  // if (routes.length === 1) {
  //   return (
  //     <Item
  //       className={isActive ? 'isActive' : ''}
  //       isToplevel
  //       route={routes[0]}
  //     />
  //   );
  // }

  return (
    <li className={`${className} ${isActive ? 'isActive' : ''}`}>
      <div className={`groupHdr ${!isActive ? 'highlight--color-contrast' : ''}`}>
        {/* <Icon icon='caret-down' /> */}
        {/* <IconFont className='iconfont' type="icon-jijidongtai_positive-dynamics" /> */}
        <img src={icon} alt="" />
        <div className='active-mask-shadow'></div>
      </div>
      <div>{name}</div>
      <ul className='groupMenu'>
        {routes.map((route): React.ReactNode => (
          <Item
            key={route.name}
            route={route}
          />
        ))}
      </ul>
    </li>
  );
}

export default React.memo(styled(Grouping)`
  cursor: pointer;
  position: relative;
  font-size:20px;
  color:#9A9ABE;
  margin-bottom:.5rem;
  &.isActive{
    color:white;
  }
  .groupHdr {
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.214rem;
    width:4rem;
    height:4rem;
    margin:0 auto;
    margin-top:1.5rem;
    margin-bottom:.5rem!important;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    > .iconfont {
      font-size:3rem;
      color:#666;
      z-index:200;
    }
    > img{
      color:#666;
      width:36px;
      height:36px;
    }
    > .active-mask-shadow{
      position:absolute;
      top:50%;
      left:50%;
      width:4px;
      height:4px;
      background:rgba(146,92,255,0.5);
      box-shadow:0px 10px 60px 30px #925CFF;
      z-index:100;
      display:none;
    }
  }

  &.isActive .groupHdr {
    opacity:1;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    >.active-mask-shadow{
      display:block;
    }
    > img{
      color:#925CFF;
    }
  }

  .groupMenu {
    border-radius: 12px;
    box-shadow:0px 15px 30px -15px rgba(146,92,255,0.5);
    display: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 1.5rem;
    z-index: 250;
    padding:1rem;
    left:3rem;
    > li {
      z-index: 1;
      list-style:none;
      display:inline-block;
      margin-bottom:.5rem;
      > a {
        color:#9A9ABE!important;
        width:100%;
        text-align:left;
      }
    }
    > li:last-child{
      margin-bottom:0;
    }

    &::before {
      bottom: 0;
      content: ' ';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      background:#151319;
      z-index: -1;
    }
  }

  &:hover {
    .groupMenu {
      display: block;
      margin-top:0;
      position:absolute;
      left:9rem;
      top:1.5rem;
      > li:hover {
        a{
          color:white !important;
        }
      }
    }
  }
`);
