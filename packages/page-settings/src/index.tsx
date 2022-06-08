// Copyright 2017-2021 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React from 'react';
import { Route, Switch } from 'react-router';

// import { useApi } from '@polkadot/react-hooks';

// import Developer from './Developer';
import General from './General';
// import I18n from './I18n';
// import Metadata from './Metadata';
// import { useTranslation } from './translate';
import useCounter from './useCounter';
import './index.scss';

export { useCounter };

function SettingsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {

  return (
    <main className='settings--App'>
       <div className="box-shadow-box">
          <div className="box-shadow-purple"></div>
        </div>
      <div className='setting-contetn-bg'>
      {/* <HelpOverlay md={md as string} /> */}
      <Switch>
        <Route>
          <General />
        </Route>
      </Switch>
        </div>
    </main>
  );
}

export default React.memo(SettingsApp);
