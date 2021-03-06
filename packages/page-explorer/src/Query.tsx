// Copyright 2017-2021 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { FilterOverlay, Input } from '@polkadot/react-components';
import { isHex } from '@polkadot/util';

import { useTranslation } from './translate';

interface Props {
  className?: string;
  value?: string;
}

interface State {
  value: string;
  isValid: boolean;
}

function stateFromValue (value: string): State {
  return {
    isValid: isHex(value, 256) || /^\d+$/.test(value),
    value
  };
}

function Query ({ className = '', value: propsValue }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [{ isValid, value }, setState] = useState(() => stateFromValue(propsValue || ''));

  const _setHash = useCallback(
    (value: string): void => setState(stateFromValue(value)),
    []
  );

  const _onQuery = useCallback(
    (): void => {
      if (isValid && value.length !== 0) {
        window.location.hash = `/explorer/query/${value}`;
      }
    },
    [isValid, value]
  );

  return (
    <FilterOverlay className={`ui--FilterOverlay hasOwnMaxWidth ${className}`}>
      <Input
        className='explorer--query'
        defaultValue={propsValue}
        isError={!isValid && value.length !== 0}
        onChange={_setHash}
        onEnter={_onQuery}
        placeholder={t<string>('block hash or number to query')}
        withLabel={false}
      >
        {/* <Button
          icon='play'
          onClick={_onQuery}
        /> */}
        <div className='onQueryButton' onClick={_onQuery}>
          Search
        </div>
      </Input>
    </FilterOverlay>
  );
}

export default React.memo(styled(Query)`
  .explorer--query {
    width: 20em;
    z-index:2;
  }
  .onQueryButton{
    background:#925CFF;
    padding:5px 20px;
    line-height:25px;
    border-radius:25px;
    color:#fff;
    cursor:pointer;
  }
`);
