// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

type HeaderDef = [React.ReactNode?, string?, number?, (() => void)?];

interface Props {
  className?: string;
  filter?: React.ReactNode;
  header?: (null | undefined | HeaderDef)[];
  isEmpty: boolean;
}

function Head ({ className = '', filter, header, isEmpty }: Props): React.ReactElement<Props> | null {
  if (!header?.length) {
    return null;
  }

  return (
    <thead className={className}>
      {filter && (
        <tr className='filter'>
          <th colSpan={100}>{filter}</th>
        </tr>
      )}
      <tr className='with-redius-header'>
        {header.filter((h): h is HeaderDef => !!h).map(([label, className = 'default', colSpan = 1, onClick], index) =>
          <th
            className={className}
            colSpan={colSpan}
            key={index}
            onClick={onClick}
          >
            {index === 0
              ? (
                <h1>
                  <Icon
                    className='highlight--color'
                    icon='dot-circle'
                  />
                  {label}
                </h1>
              )
              : isEmpty
                ? ''
                : label
            }
          </th>
        )}
      </tr>
    </thead>
  );
}

export default React.memo(styled(Head)`
  position: relative;
  z-index: 1;

  th {
    font: var(--font-sans);
    font-weight: var(--font-weight-normal);
    padding: 30px 1rem 20px;
    text-align: right;
    vertical-align: baseline;
    white-space: nowrap;

    h1, h2 {
      font-size: 18px;
    }

    h1 {
      .ui--Icon {
        font-size: 1rem;
        margin-right: 0.5rem;
        vertical-align: middle;
      }
    }

    &:first-child {
      // border-left: 1px solid var(--border-table);
    }

    // &:last-child {
    //   border-right: 1px solid var(--border-table);
    // }

    &.address {
      padding-left: 3rem;
      text-align: left;
    }

    &.badge {
      padding: 0;
    }

    &.expand {
      text-align: right;
    }

    &.isClickable {
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }

    &.mini {
      padding: 0 !important;
    }

    &.no-pad-left {
      padding-left: 0.125rem;
    }

    &.no-pad-right {
      padding-right: 0.125rem;
    }

    &.start {
      text-align: left;
      >h1{
        color:white;
      }
    }
  }

  tr {
    &:first-child {
      th {
        // border-top: 1px solid var(--border-table);
      }
    }

    &.filter {
      .ui.input {
        background: #151319;
        &:first-child {
          margin-top: -1px;
        }
      }

      th {
        padding: 0;
      }
    }

    &:not(.filter) {
      th {
        color: white;
      }
    }
  }
`);
