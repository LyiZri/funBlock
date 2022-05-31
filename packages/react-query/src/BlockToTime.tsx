// Copyright 2017-2021 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from "@polkadot/api";

import BN from "bn.js";
import React from "react";
import styled from "styled-components";
import "./index.scss";
import { useBlockTime } from "@polkadot/react-hooks";

interface Props {
  api?: ApiPromise;
  children?: React.ReactNode;
  className?: string;
  isInline?: boolean;
  label?: React.ReactNode;
  value?: BN;
  hasCircle?: boolean;
}

function BlockToTime({
  api,
  children,
  className = "",
  isInline,
  label,
  value,
  hasCircle = false,
}: Props): React.ReactElement<Props> | null {
  const [, text] = useBlockTime(value, api);

  if (!value || value.isZero()) {
    return null;
  }

  return (
    <div className={`${className}${isInline ? " isInline" : ""} ${hasCircle ? "block-time-circle" : ""}`}>
      <div className="block-time-content">
        {text.split(" ").map((v, index) => (
          <span className={index % 2 ? "timeUnits" : undefined} key={index}>
            {v}
          </span>
        ))}
        {children}
        <span className="block-time-lable">{label || ""}</span>
      </div>
    </div>
  );
}

export default React.memo(styled(BlockToTime)`
  font-size: 22px;
  &.isInline {
    display: inline-block;
  }

  span + span {
    padding-left: 0.25em;
  }

  span.timeUnits {
    font-size: 0.825em;
  }
`);
