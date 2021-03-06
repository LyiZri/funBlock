// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { Badge, Icon } from '@polkadot/react-components';

import { useTranslation } from './translate';

interface Props {
  className?: string;
}

function Legend ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <span>
        <Badge
          color='mineTheme'
          icon='chevron-right'
        />
        {t('Next session')}
      </span>
      <span>
        <Badge
          color='green'
          info='5'
        />
        {t('Produced blocks')}
      </span>
      <span>
        <Badge
          color='green'
          info={<Icon icon='envelope' />}
        />
        {t('Online message')}
      </span>
      <span>
        <Badge
          color='green'
          icon='hand-paper'
        />
        {t('Guaranteeing')}
      </span>
      <span>
        <Badge
          color='red'
          icon='skull-crossbones'
        />
        {t('Slashed')}
      </span>
      <span>
        <Badge
          color='red'
          icon='balance-scale-right'
        />
        {t('Over stake limit')}
      </span>
    </div>
  );
}

export default React.memo(styled(Legend)`
  font-size: 16px;
  padding: 1rem 0.5rem;
  text-align: left;
  color:#fff;
  .ui--Badge {
    margin-right: 0.5rem;
    transform:translateY(-1px);
  }
  span{
    margin-right:1rem;
  }
  span+span {
    margin-left: 1rem;

  }
`);
