// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Routes } from '@polkadot/apps-routing/types';

import React from 'react';

export interface ItemRoute {
  Modal?: React.ComponentType<any>;
  href?: string;
  icon?: any;
  logo?: unknown;
  name: string;
  text: string;
  useCounter?: () => number | string | null;
}

export interface Group {
  name: string;
  routes: Routes;
}

export interface GroupIcon extends Group{
  icon ?:any
}

export type Groups = Record<string, GroupIcon>;
