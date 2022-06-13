// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "i18next";
import type { Route, Routes } from "@polkadot/apps-routing/types";
import type { ApiProps } from "@polkadot/react-api/types";
import type { AccountId } from "@polkadot/types/interfaces";
import type { GroupIcon, Groups, ItemRoute } from "./types";

import React, { useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import createRoutes from "@polkadot/apps-routing";
import { useAccounts, useApi, useCall } from "@polkadot/react-hooks";

import { findMissingApis } from "../endpoint";
import { useTranslation } from "../translate";
import Grouping from "./Grouping";
import Item from "./Item";
import NodeInfo from "./NodeInfo";
import "./index.scss";
import AccountIcon from "./icon/account_icon.svg";
import NetworkIcon from "./icon/network_iocn.svg";
import DeveloperIcon from "./icon/developer_icon.svg";
import SettingsIcon from "./icon/settings_icon.svg";
import GithubIcon from "./icon/github_icon.svg";
import WikiIcon from "./icon/wiki_icon.svg";
// import itemOption from "@polkadot/app-settings/Metadata/iconOption";

interface Props {
  className?: string;
}

interface GroupName {
  name: string;
  icon?: any;
}
type GroupObject = Record<string, GroupName>;
const disabledLog = new Map<string, string>();

function createExternals(t: TFunction): ItemRoute[] {
  return [
    {
      href: "https://github.com/mannheim-network",
      icon: GithubIcon,
      name: "github",
      text: t<string>("nav.github", "GitHub", { ns: "apps-routing" }),
    },
    {
      href: "https://github.com/mannheim-network/wiki",
      icon: WikiIcon,
      name: "wiki",
      text: t<string>("nav.wiki", "Wiki", { ns: "apps-routing" }),
    },
    // { href: 'https://wiki.crust.network/docs/en/crustWallet', icon: 'wallet', name: 'wallet', text: t<string>('nav.Wallet', 'Wallet', { ns: 'apps-routing' }) }
  ];
}

function logDisabled(route: string, message: string): void {
  if (!disabledLog.get(route)) {
    disabledLog.set(route, message);

    // console.warn(`Disabling ${route}: ${message}`);
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
  groupNames: GroupObject,
  // groupNames: Record<string,string>,
  apiProps: ApiProps,
  hasAccounts: boolean,
  hasSudo: boolean
): GroupIcon[] {
  return Object.values(
    routing.reduce((all: Groups, route): Groups => {
      if (!all[route.group]) {
        all[route.group] = {
          name: typeof groupNames[route.group] != "undefined" ? groupNames[route.group].name : "",
          icon: typeof groupNames[route.group] != "undefined" ? groupNames[route.group].icon : "",
          routes: [route],
        };
        // groupNames.forEach((item,index)=>{
        //     if(route.group == item.name){
        //       all[route.group] = { name: item.name, icon:item.icon,routes: [route] };
        //     }
        // })
      } else {
        all[route.group].routes.push(route);
      }

      return all;
    }, {})
  )
    .map(
      ({ name, icon, routes }): GroupIcon => ({
        name,
        icon,
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
    accounts: {
      name: t("Accounts"),
      icon: AccountIcon,
    },
    developer: {
      name: t("Developer"),
      icon: DeveloperIcon,
    },
    // governance: t("Governance"),
    network: {
      name: t("Network"),
      icon: NetworkIcon,
    },
    applications: {
      name: t("Applications"),
      icon: "applications-icon",
    },
    settings: {
      name: t("Settings"),
      icon: SettingsIcon,
    },
    // storage: t("Storage"),
    csmStaking: {
      name: t("Profit Data"),
      icon: "csmStaking-icon",
    },
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
  console.log('visible',{visibleGroups,groupRef,routeRef});
  const activeRoute = useMemo(
    () => routeRef.current.find((route) => location.pathname.startsWith(`/${route.name}`)) || null,
    [location]
  );

  const isLoading = !apiProps.isApiReady || !apiProps.isApiConnected;

  return (
    <div className={`${className}${isLoading ? " isLoading" : ""} left-menu-parent`}>
      <div className="menuContainer">
        <div style={{ marginBottom: "2rem" }}>
          <div className="menuSection">
            <ul className="menuItems">
              {visibleGroups.map(
                ({ name, icon, routes }): React.ReactNode =>
                  name && (
                    <Grouping
                      isActive={activeRoute && activeRoute.group === name.toLowerCase()}
                      key={name}
                      name={name}
                      icon={icon}
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
