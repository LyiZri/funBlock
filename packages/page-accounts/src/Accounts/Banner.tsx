// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
  type: 'warning' | 'error';
}

function Banner({ children, className = '', type }: Props): React.ReactElement<Props> | null {
  return (
    <article className={`${className} ${type} centered`}>
      <div className='box'>
        {children}
      </div>
    </article>
  );
}

export default React.memo(styled(Banner)`
  border-radius:16px;
  box-shadow:0px 2px 30px 0 rgba(241,79,158,0.1);
  .box {
    // padding: 0 0.5rem;
    >p{
      color:#A3A4A7;
      font-size:18px;
      margin-bottom:16px;
    }
    > ul{
      >li{
        font-size:18px;
        color:#A3A4A7;
        margin-bottom:16px;
        margin-left:20px;
      }
      >li::marker{
        display:none;
      }
    }
  }
`);
