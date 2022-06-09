// Copyright 2017-2021 @polkadot/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from "@polkadot/react-components/types";

import React from "react";

// import { Tabs } from '@polkadot/react-components';
import "./index.scss";

import Selection from "./Selection";

function ExtrinsicsApp({ basePath }: Props): React.ReactElement<Props> {
  // const { t } = useTranslation();

  // const itemsRef = useRef([{
  //   isRoot: true,
  //   name: 'create',
  //   text: t<string>('Submission')
  // }]);

  return (
    <main className="extrinsics--App">
      {/* <Tabs
        basePath={basePath}
        items={itemsRef.current}
      /> */}
      <Selection />
    </main>
  );
}

export { ExtrinsicsApp };

export default React.memo(ExtrinsicsApp);
