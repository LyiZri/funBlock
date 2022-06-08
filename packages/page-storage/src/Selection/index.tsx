// Copyright 2017-2021 @polkadot/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ParitalQueryTypes, QueryTypes } from '../types';

import React, { useCallback } from 'react';
import { Route, Switch } from 'react-router';


import Consts from './Consts';
import Modules from './Modules';
import Raw from './Raw';

interface Props {
  basePath: string;
  onAdd: (query: QueryTypes) => void;
}

let id = -1;

function Selection ({ basePath, onAdd }: Props): React.ReactElement<Props> {


  const _onAdd = useCallback(
    (query: ParitalQueryTypes): void => onAdd({ ...query, id: ++id }),
    [onAdd]
  );

  return (
    <>
      {/* <Tabs
        basePath={basePath}
        items={itemsRef.current}
      /> */}
      <Switch>
        <Route path={`${basePath}/constants`}><Consts onAdd={_onAdd} /></Route>
        <Route path={`${basePath}/raw`}><Raw onAdd={_onAdd} /></Route>
        <Route><Modules onAdd={_onAdd} /></Route>
      </Switch>
    </>
  );
}

export default React.memo(Selection);
