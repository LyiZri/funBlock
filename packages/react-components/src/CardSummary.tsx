// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { UInt } from "@polkadot/types";

import BN from "bn.js";
import React from "react";
import styled from "styled-components";

import { BlockToTime } from "@polkadot/react-query";
import { BN_HUNDRED, formatNumber, isUndefined } from "@polkadot/util";

import Labelled from "./Labelled";
import Progress from "./Progress";
import "./CardSummary.scss";

interface ProgressProps {
  hideGraph?: boolean;
  hideValue?: boolean;
  isPercent?: boolean;
  total?: BN | UInt;
  value?: BN | UInt;
  withTime?: boolean;
}

interface Props {
  children?: React.ReactNode;
  className?: string;
  help?: React.ReactNode;
  label: React.ReactNode;
  progress?: ProgressProps;
  icon?: string;
  childrenIsTop?: boolean;
  isDouble?:boolean
}

function CardSummary({
  children,
  className = "",
  help,
  label,
  progress,
  icon = "",
  childrenIsTop = false,
  isDouble=false
}: Props): React.ReactElement<Props> | null {
  const value = progress && progress.value;
  const total = progress && progress.total;
  const left =
    progress && !isUndefined(value) && !isUndefined(total) && value.gten(0) && total.gtn(0)
      ? value.gt(total)
        ? `>${progress.isPercent ? "100" : formatNumber(total)}`
        : progress.isPercent
        ? value.mul(BN_HUNDRED).div(total).toString()
        : formatNumber(value)
      : undefined;

  if (progress && isUndefined(left)) {
    return null;
  }

  const isTimed = progress && progress.withTime && !isUndefined(progress.total);
  return (
    <article className={`${className} ${progress?"programBox":""}`}>
      {icon.length != 0 && <div className="iconBox"></div>}
      <div className="epoch-flex">
        {progress && !progress.hideGraph && <Progress isDouble={isDouble} {...progress} />}
        <div>
          {childrenIsTop && <div>{children}</div>}
          {!progress && label && <Labelled help={help} isSmall label={label}></Labelled>}
          {!childrenIsTop && <div className="childrenIsNotTop">{children}</div>}
        </div>
      </div>
      {progress && !progress.hideValue && (
        <div className="progress-epoch-box">
          <div className="progress-box-title">{label}</div>
          <div className="progress-box-content">
            {isTimed && !children && <BlockToTime className="epoch-timer" value={progress.total} />}
            <div className={isTimed ? "isSecondary" : "isPrimary"}>
              {!left || isUndefined(progress.total) ? (
                "-"
              ) : !isTimed || progress.isPercent || !progress.value ? (
                `${left}${progress.isPercent ? "" : "/"}${progress.isPercent ? "%" : formatNumber(progress.total)}`
              ) : (
                <BlockToTime className="timer" value={progress.total.sub(progress.value)} />
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default React.memo(styled(CardSummary)`
  align-items: center;
  background: none;
  border: none !important;
  box-shadow: none !important;
  color: var(--color-summary);
  flex: 0 1 auto;
  flex-flow: row wrap;
  text-align: center;
  display: flex;
  align-items: center;
  min-height: 150px;
  margin-top: 22px;
  // justify-content:center;
  .childrenIsNotTop {
    color: #fff;
    font-size: 36px;
  }
  .ui--FormatBalance-value{
    font-size:36px
  }
  .epoch-timer {
    font-size: 16px;
  }
  .iconBox {
    height: 73px;
    width: 73px;
    background: #fff;
  }
  .ui--FormatBalance .balance-postfix {
    opacity: 1;
  }

  .ui--Progress {
  }

  > .ui--Labelled {
    font-size: 1.75rem;
    font-weight: var(--font-weight-light);
    position: relative;
    line-height: 1;
    text-align: center;

    > * {
      margin: 0.25rem 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    > label {
      font-size: 0.95rem;
    }

    .isSecondary {
      font-size: 1rem;
      font-weight: var(--font-weight-normal);

      .timer {
        min-width: 8rem;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 767px) {
    min-height: 4.8rem;
    padding: 0.25 0.4em;

    > div {
      font-size: 1.4rem;
    }
  }
`);
