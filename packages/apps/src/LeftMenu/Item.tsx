// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemRoute } from "./types";

import React from "react";
import styled from "styled-components";

// import { Badge, Icon } from "@polkadot/react-components";
import { useToggle } from "@polkadot/react-hooks";

interface Props {
  className?: string;
  isLink?: boolean;
  isToplevel?: boolean;
  route: ItemRoute;
}

const DUMMY_COUNTER = () => 0;

function Item({
  className = "",
  isLink,
  isToplevel,
  route: { Modal, href, icon, logo, name, text, useCounter = DUMMY_COUNTER },
}: Props): React.ReactElement<Props> {
  const [isModalVisible, toggleModal] = useToggle();
  // const count = useCounter();
  // console.log({ isToplevel, isLink, className });

  return (
    <li
      className={`ui--MenuItem ${className} ${isLink ? "isLink" : ""} ${isToplevel ? "topLevel  highlight--color-contrast" : ""
        }`}
    >
      <a
        href={Modal ? undefined : href || `#/${name}`}
        onClick={Modal ? toggleModal : undefined}
        rel="noopener noreferrer"
        target={href ? "_blank" : undefined}
      >
        {/* {icon && <Icon icon={icon}/>}
        {logo && <img src={logo as string}/>} */}
        {isToplevel === true && <div className="groupHdr">
          {/* <IconFont className='iconfont' type="icon-jijidongtai_positive-dynamics" /> */}
          <img src={icon} alt="" />
          <div className='active-mask-shadow'></div>
        </div>}
        {text}
        {/* {!!count && <Badge color={"white"} info={count} />} */}
      </a>
      {Modal && isModalVisible && <Modal onClose={toggleModal} />}
    </li>
  );
}

export default React.memo(styled(Item)`
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  &.topLevel:hover{
    a{
      color:white!important;
    }
  }
  &.topLevel {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.214rem;
    border-radius: 0.15rem;
    text-align:center;
    a {
      line-height: 1.214rem;
      border-radius: 0.25rem;
      color:#9A9ABE!important;
      font-size:16px;
    }
    &.isActive.highlight--color-contrast {
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--color-text);
    }
    &.isActive {
      border-radius: 0.15rem 0.15rem 0 0;

      a {
        cursor: default;
        color:white!important;
      }

      &&.withCounter a {
        padding-right: 3.2rem;
      }
    }
    .groupHdr {
      border-radius: 0.5rem;
      font-size: 18px;
      font-weight: 400;
      line-height: 1.214rem;
      width: 4rem;
      height:4rem;
      margin: 0 auto;
      margin-top: 1.5rem;
      // background-color: var(--bg-tabs);
      display:flex;
      justify-content:center;
      align-items:center; 
      margin-bottom:.5rem!important;
      > img {
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
      opacity: 1;
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
      >.active-mask-shadow{
        display:block;
      }
      >.iconfont{
        color:#925CFF;
      }
    }
    .ui--Badge {
      top: 0.7rem;
    }
  }

  &&.withCounter a {
    padding-right: 3.2rem;
  }

  a {
    color: var(--color-text) !important;
    display: block;
    text-decoration: none;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  a > img {
    width: 0.7rem;
    margin-right: 0.5rem;
    height: auto;
  }

  .ui--Badge {
    position: absolute;
    right: 0.5rem;
  }

  .ui--Icon {
    margin-right: 0.5rem;
  }
`);
