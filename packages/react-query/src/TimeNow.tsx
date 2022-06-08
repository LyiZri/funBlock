// Copyright 2017-2021 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Moment } from "@polkadot/types/interfaces";

import BN from "bn.js";
import React, { useEffect, useState } from "react";

import { useApi, useCall } from "@polkadot/react-hooks";
import Elapsed from "./Elapsed";
import './index.scss'
interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  value?: Moment;
}

function TimeNow({ children, className = "", label, value }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const timestamp = useCall<Moment>(!value && api.query.timestamp.now);
  const [now, setNow] = useState<BN | undefined>();

  useEffect((): void => {
    setNow(value || timestamp);
  }, [timestamp, value]);
  
  return (
    <div className={className}>
      <div className="time-circle"></div>
      {/* <Progress
        type="circle"
        strokeColor={{
          "0%": "#C000FF",
          "25%": "#B005FF",
          "50%": "#8814FF",
          "75%": "#482BFF",
          "100%": "#203AFF",
        }}
        strokeWidth={12}
        percent={99.9}
        format={() => <Elapsed value={now} />}
        status="active"
        width={200}
      /> */}
      {label || ""}
      <Elapsed value={now} />
      {children}
    </div>
  );
}

export default React.memo(TimeNow);
