// Copyright 2017-2021 @polkadot/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from "@polkadot/react-components/types";
import type { QueryTypes } from "./types";

import React, { useCallback, useState } from "react";
import styled from "styled-components";

import Queries from "./Queries";
import Selection from "./Selection";
import "./index.scss";

function StorageApp({ basePath, className = "" }: Props): React.ReactElement<Props> {
  const [queue, setQueue] = useState<QueryTypes[]>([]);

  const _onAdd = useCallback((query: QueryTypes) => setQueue((queue: QueryTypes[]) => [query, ...queue]), []);

  const _onRemove = useCallback(
    (id: number) => setQueue((queue: QueryTypes[]) => queue.filter((item) => item.id !== id)),
    []
  );

  return (
    <main className={`storage--App ${className}`}>
      <div className="box-shadow-box">
        <div className="box-shadow-purple"></div>
      </div>
      <div className="storage-content-bg">
        <Selection basePath={basePath} onAdd={_onAdd} />
        <Queries onRemove={_onRemove} value={queue} />
      </div>
    </main>
  );
}

export default React.memo(styled(StorageApp)`
  padding-top: 2rem;
  padding: 29px 38px;
  .storage-content-bg {
    padding: 46px 0px;
    background: #000;
    border-radius: 20px;
    box-shadow: 0px 2px 30px 0 rgb(241 79 158 / 10%);
  }
  .box-shadow-purple {
    top: 20px;
  }
  .ui.selection.dropdown {
    background: none;
    border: none;
  }
  .storage--actionrow {
    align-items: flex-start;
    display: flex;

    .ui--Button {
      margin: 0.25rem;
    }

    &.head {
      flex: 1 1 100%;
      margin: 0 auto;
      max-width: 620px;
    }
  }

  .storage--actionrow-value {
    flex: 1;
    min-width: 0;

    .ui--output {
      border: none;
      word-break: break-all;
    }
  }

  .storage--actionrow-buttons {
    flex: 0;
    padding: 0.5rem 0.25rem;
  }
`);
