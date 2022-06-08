// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
  is60?: boolean;
}

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
}

type ColumarType = React.ComponentType<Props> & {
  Column: React.ComponentType<ColumnProps>;
};

function Column ({ children, className = '' }: Props): React.ReactElement<Props> {
  return (
    <div className={`ui--Column ${className}`}>
      {children}
    </div>
  );
}

function Columar ({ children, className = '', is60 }: Props): React.ReactElement<Props> {
  return (
    <div className={`ui--Columnar ${is60 ? 'is60' : 'is50'} ${className}`}>
      {children}
    </div>
  );
}

const ColumarStyled = React.memo(styled(Columar)`
  flex-wrap: wrap;
  height:100%;
  width:100%;
  background:#000;
  border-radius:20px;
  padding:25px 40px;
  box-shadow:0px 2px 30px 0 rgb(241 79 158 / 10%);
  &.is60 {
    .ui--Column:first-child {
      @media (min-width: 1025px) {
        max-width: 60%;
        min-width: 60%;
      }
    }

    .ui--Column:last-child {
      @media (min-width: 1025px) {
        max-width: 40%;
        min-width: 40%;
      }
    }
  }
`) as unknown as ColumarType;

ColumarStyled.Column = React.memo(styled(Column)`
  box-sizing: border-box;
  max-width: 100%;
  flex: 1 1;
  margin: auto;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`);

export default ColumarStyled;
