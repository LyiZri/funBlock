// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { UInt } from "@polkadot/types";

import BN from "bn.js";
import React from "react";
import styled from "styled-components";
import { Progress as ProgressAntd } from "antd";
import { bnToBn } from "@polkadot/util";
import "./index.scss";
interface Props {
  className?: string;
  isDisabled?: boolean;
  total?: UInt | BN | number | null;
  value?: UInt | BN | number | null;
  isDouble?: boolean;
}





function Progress({
  className = "",
  isDouble = false,
  isDisabled,
  total,
  value,
}: Props): React.ReactElement<Props> | null {
  const _total = bnToBn(total || 0);
  const angle = _total.gtn(0)
    ? bnToBn(value || 0)
        .muln(36000)
        .div(_total)
        .toNumber() / 100
    : 0;

  if (angle < 0) {
    return null;
  }

  const drawAngle = angle % 360;

  return (
    <div className={`ui--Progress${isDisabled ? " isDisabled" : ""} ${className}`}>
      {/* 判断是一段进度条还是两条 */}
      {!isDouble && (
        <div className="progress-box">
          <ProgressAntd
            className="progress-antd-box"
            type="circle"
            strokeColor={{ "0%": "#203AFF", "50%": "#C000FF", "100%": "#203AFF" }}
            percent={Math.floor((angle * 100) / 360)}
            width={150}
            showInfo={false}
            strokeWidth={15}
            trailColor={"#141b57"}
            strokeLinecap="square"
          />
          <span className="percent-format">{Math.floor((angle * 100) / 360)}%</span>
        </div>
      )}
      {
        isDouble &&(
          <div className="prgress-double-box">
          <ProgressAntd
            className="progress-first-antd-box"
            type="circle"
            strokeColor={{ "0%": "#FF230E", "100%": "#FFA400" }}
            percent={
              Math.floor((angle * 100) / 180)
            }
            width={165}
            showInfo={false}
            strokeWidth={5}
            trailColor={"#43444b"}
            strokeLinecap="square"
            >

            </ProgressAntd>
          <ProgressAntd
            className="progress-second-antd-box"
            type="circle"
            strokeColor={{ "0%": "#203AFF", "50%": "#C000FF", "100%": "#203AFF" }}
            percent={
              drawAngle>180?
              Math.floor((angle * 100) / 180)
              :0
            }
            width={100}
            showInfo={false}
            strokeWidth={8}
            trailColor={"#43444b"}
            strokeLinecap="square"
            />
          </div>
        )
      }
      {/* <div className='background highlight--bg' />
      <Clip
        angle={
          drawAngle <= 180
            ? drawAngle.toFixed(1)
            : '180'
        }
        type='first'
      />
      <Clip
        angle={
          drawAngle <= 180
            ? '0'
            : (drawAngle - 180).toFixed(1)
        }
        type='second'
      />
      <div className='inner'>
        <div>{Math.floor(angle * 100 / 360)}%</div>
      </div> */}
    </div>
  );
}

export default React.memo(styled(Progress)`
  border-radius: 100%;
  height: 100%;
  position: relative;
  width: 100%;
  padding: 10px;
  .progress-antd-box {
    position: relative;
  }
  .percent-format {
    display: block;
    positon: absolute;
  }
  &.isDisabled {
    filter: grayscale(100%);
    opacity: 0.25;
  }

  .background,
  .clip1 {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .background {
    opacity: 0.125;
  }

  .clip1 {
    div {
      border-radius: 100%;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      transform: rotate(0);
      top: 0;
      zoom: 1;
    }
  }

  .clip1.first {
    clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);

    div {
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
  }

  .clip1.second {
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);

    div {
      clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
    }
  }

  .inner {
    align-items: center;
    background: var(--bg-inverse);
    border-radius: 100%;
    bottom: 0.375rem;
    color: var(--color-summary);
    display: flex;
    justify-content: center;
    left: 0.375rem;
    position: absolute;
    right: 0.375rem;
    top: 0.375rem;

    div {
      line-height: 1;
      font-size: 1.1rem;
      text-shadow: 0 0 2px #f5f3f1;
    }
  }
`);
