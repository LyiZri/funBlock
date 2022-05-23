// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "i18next";
import type { Route, Routes } from "@polkadot/apps-routing/types";
import type { ApiProps } from "@polkadot/react-api/types";
import type { AccountId } from "@polkadot/types/interfaces";
import type { Group, Groups, ItemRoute } from "./types";

import React, { useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import createRoutes from "@polkadot/apps-routing";
import { useAccounts, useApi, useCall } from "@polkadot/react-hooks";

import { findMissingApis } from "../endpoint";
import { useTranslation } from "../translate";
import Grouping from "./Grouping";
import Item from "./Item";
import NodeInfo from "./NodeInfo";
import './index.scss'

interface Props {
  className?: string;
}

const disabledLog = new Map<string, string>();

function createExternals(t: TFunction): ItemRoute[] {
  return [
    {
      href: "https://github.com/mannheim-network",
      icon: "code-branch",
      name: "github",
      text: t<string>("nav.github", "GitHub", { ns: "apps-routing" }),
    },
    {
      href: "https://github.com/mannheim-network/wiki",
      icon: "book",
      name: "wiki",
      text: t<string>("nav.wiki", "Wiki", { ns: "apps-routing" }),
    },
    // { href: 'https://wiki.crust.network/docs/en/crustWallet', icon: 'wallet', name: 'wallet', text: t<string>('nav.Wallet', 'Wallet', { ns: 'apps-routing' }) }
  ];
}

function logDisabled(route: string, message: string): void {
  if (!disabledLog.get(route)) {
    disabledLog.set(route, message);

    console.warn(`Disabling ${route}: ${message}`);
  }
}

function checkVisible(
  name: string,
  { api, isApiConnected, isApiReady }: ApiProps,
  hasAccounts: boolean,
  hasSudo: boolean,
  { isHidden, needsAccounts, needsApi, needsSudo }: Route["display"]
): boolean {
  if (isHidden) {
    return false;
  } else if (needsAccounts && !hasAccounts) {
    return false;
  } else if (!needsApi) {
    return true;
  } else if (!isApiReady || !isApiConnected) {
    return false;
  } else if (needsSudo && !hasSudo) {
    logDisabled(name, "Sudo key not available");

    return false;
  }

  const notFound = findMissingApis(api, needsApi);

  if (notFound.length !== 0) {
    logDisabled(name, `API not available: ${notFound.toString()}`);
  }

  return notFound.length === 0;
}

function extractGroups(
  routing: Routes,
  groupNames: Record<string, string>,
  apiProps: ApiProps,
  hasAccounts: boolean,
  hasSudo: boolean
): Group[] {
  return Object.values(
    routing.reduce((all: Groups, route): Groups => {
      if (!all[route.group]) {
        all[route.group] = { name: groupNames[route.group], routes: [route] };
      } else {
        all[route.group].routes.push(route);
      }
      return all;
    }, {})
  )
    .map(
      ({ name, routes }): Group => ({
        name,
        routes: routes.filter(({ display, name }) => checkVisible(name, apiProps, hasAccounts, hasSudo, display)),
      })
    )
    .filter(({ routes }) => routes.length);
}

function Menu({ className = "" }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { allAccounts, hasAccounts } = useAccounts();
  const apiProps = useApi();
  const sudoKey = useCall<AccountId>(apiProps.isApiReady && apiProps.api.query.sudo?.key);
  const location = useLocation();

  const externalRef = useRef(createExternals(t));
  const groupRef = useRef({
    accounts: t("Accounts"),
    developer: t("Developer"),
    governance: t("Governance"),
    network: t("Network"),
    applications: t("Applications"),
    settings: t("Settings"),
    storage: t("Storage"),
    csmStaking: t("Profit Data"),
  });

  const routeRef = useRef(createRoutes(t));

  const hasSudo = useMemo(
    () => !!sudoKey && allAccounts.some((address) => sudoKey.eq(address)),
    [allAccounts, sudoKey]
  );

  const visibleGroups = useMemo(
    () => extractGroups(routeRef.current, groupRef.current, apiProps, hasAccounts, hasSudo),
    [apiProps, hasAccounts, hasSudo]
  );
  console.log("cisibleGroups===", visibleGroups);

  const activeRoute = useMemo(
    () => routeRef.current.find((route) => location.pathname.startsWith(`/${route.name}`)) || null,
    [location]
  );

  const isLoading = !apiProps.isApiReady || !apiProps.isApiConnected;

  return (
    <div className={`${className}${isLoading ? " isLoading" : ""} left-menu-parent`}>
      <div className="menuContainer">
        <div>
          <div className="menuSection">
            <ul className="menuItems">
              {visibleGroups.map(
                ({ name, routes }): React.ReactNode => (
                  <Grouping
                    isActive={activeRoute && activeRoute.group === name.toLowerCase()}
                    key={name}
                    name={name}
                    routes={routes}
                  />
                )
              )}
            </ul>
          </div>
          <div className="menuSection">
            <ul className="menuItems">
              {externalRef.current.map(
                (route): React.ReactNode => (
                  <Item className="external" isLink isToplevel key={route.name} route={route} />
                )
              )}
            </ul>
          </div>
        </div>
        <NodeInfo />
      </div>
    </div>
  );
}

export default React.memo(Menu);
