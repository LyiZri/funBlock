// Copyright 2017-2020 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React from 'react';

import { useApi, useCall } from '@polkadot/react-hooks';
import './index.scss'
import { FormatCapacity } from '.';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  hasBg?:boolean
}

function TotalStorage ({ children, className = '', label,hasBg=false }: Props): React.ReactElement<Props> {
  const { api, systemChain } = useApi();
  const isMaxwell = systemChain === 'Crust Maxwell';
  const reportedFilesSize = useCall<BN>(api.query.storage?.reportedFilesSize);
  const free = useCall<BN>(api.query.storage?.free);
  let totalStorage = new BN(0);

  if (free && reportedFilesSize) {
    if (isMaxwell) {
      totalStorage = new BN(Number(free).toString()).add(new BN(Number(reportedFilesSize).toString()).muln(2));
    } else {
      totalStorage = new BN(Number(free).toString()).add(new BN(Number(reportedFilesSize).toString()));
    }
  }

  return (
    <div className={`${className} ${hasBg?"totalStorage-background":""}`}>
      <span className='totalStorage-title'>
        {label || ''}
      </span>
      <FormatCapacity
        value={totalStorage}
        withSi
      />
      {children}
    </div>
  );
}

export default React.memo(TotalStorage);
