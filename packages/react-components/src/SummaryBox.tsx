// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  className?: string;
  isSmall?: boolean;
}

function SummaryBox({ children, className = "", isSmall }: Props): React.ReactElement<Props> {
  return <div className={`${className}${isSmall ? " isSmall" : ""} summary-box`}>{children}</div>;
}

export default React.memo(styled(SummaryBox)`
  align-items: stretch;
  border-radius: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 1.5rem 0;

  > section {
    display: flex;
    flex: 0 1 auto;
    text-align: left;
    flex-wrap: wrap;
  }

  details & {
    display: block;
    margin: 0.5rem 0.25rem;
    opacity: 0.75;
    outline: none;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;

    + div {
      margin-top: 0.75rem;
    }
  }

  &.isSmall {
    margin-bottom: 0;
  }

  .ui.label {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }
`);
