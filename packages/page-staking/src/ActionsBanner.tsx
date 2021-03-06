// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { MarkWarning } from '@polkadot/react-components';

import { useTranslation } from './translate';

function ActionsBanner(): React.ReactElement<null> | null {
  const { t } = useTranslation();

  return (
    <div className='staking-mine-warning'>
      <MarkWarning
        className='warning centered'
        content={t<string>('Use the account actions to create a new guardian/guarantor stash and bond it to participate in staking. Do not send funds directly via a transfer to a guardian.')}
      />
    </div>
  );
}

export default React.memo(ActionsBanner);
