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
    <div className='benefit-mine-warning'>
      <article className={`${className} ${type} left`}>
        <div className='box'>
          {children}
        </div>
      </article>
    </div>
  );
}

export default React.memo(styled(Banner)`
  .box {
    // padding: 0 0.5rem;
  }
`);
