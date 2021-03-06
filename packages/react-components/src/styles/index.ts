// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import { createGlobalStyle } from 'styled-components';

import cssComponents from './components';
import cssForm from './form';
import cssMedia from './media';
import cssRx from './rx';
import cssSemantic from './semantic';
import cssTheme from './theme';

interface Props {
  uiHighlight?: string;
}

const BRIGHTNESS = 128 + 32;
const FACTORS = [0.2126, 0.7152, 0.0722];
const PARTS = [0, 2, 4];
const VERY_DARK = 16;

const defaultHighlight = '#f19135'; // '#f19135'; // #999

function getHighlight(uiHighlight: string | undefined): string {
  return (uiHighlight || defaultHighlight);
}

function countBrightness(uiHighlight: string | undefined): number {
  const hc = getHighlight(uiHighlight).replace('#', '').toLowerCase();

  return PARTS.reduce((b, p, index) => b + (parseInt(hc.substr(p, 2), 16) * FACTORS[index]), 0);
}

function getContrast(uiHighlight: string | undefined): string {
  const brightness = countBrightness(uiHighlight);

  return brightness > BRIGHTNESS
    ? 'rgba(45, 43, 41, 0.875)'
    : 'rgba(55, 55, 5, 1)';
}

function getMenuHoverContrast(uiHighlight: string | undefined): string {
  const brightness = countBrightness(uiHighlight);

  if (brightness < VERY_DARK) {
    return 'rgba(255, 255, 255, 0.15)';
  }
  // leftMenu Item Hover BackColor
  return brightness < BRIGHTNESS
    ? '#827CF8'
    : '#827CF8';
}

export default createGlobalStyle<Props & ThemeProps>(({ theme, uiHighlight }: Props & ThemeProps) => `
  .highlight--all {
    background: ${getHighlight(uiHighlight)} !important;
    border-color: ${getHighlight(uiHighlight)} !important;
    color: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--before:before {
    background: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--before-border:before {
    border-color: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--bg {
    background: rgba(146,92,255,.8) !important;
  }

  .highlight--bg-contrast {
    background: ${getContrast(uiHighlight)};
  }

  .ui--MenuItem.isActive .ui--Badge {
    background: ${getHighlight(uiHighlight)};
    color: ${getContrast(uiHighlight)} !important;
  }

  .ui--MenuItem {
    & .ui--Badge {
      color: ${countBrightness(uiHighlight) < BRIGHTNESS ? '#fff' : '#424242'};
    }

    &:hover:not(.isActive) .ui--Badge {
      background: ${countBrightness(uiHighlight) < BRIGHTNESS ? 'rgba(255, 255, 255, 0.8)' : '#4D4D4D'};
      color: ${countBrightness(uiHighlight) > BRIGHTNESS ? '#fff' : '#424242'};
    }
  }

  .ui--Tab .ui--Badge {
    background: ${getHighlight(uiHighlight)};
    color: ${countBrightness(uiHighlight) < BRIGHTNESS ? '#fff' : '#424242'};
  }

  .highlight--bg-faint,
  .highlight--bg-light {
    background: white;
    position: relative;

    &:before {
      background: white;
      bottom: 0;
      content: ' ';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }
  }

  .highlight--bg-faint:before {
    opacity: 0.025;
  }

  .highlight--bg-light:before {
    opacity: 0.2;
  }

  .highlight--border {
    border-color: #925CFF !important;
  }

  .highlight--color {
    color: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--color-contrast {
    color: ${getContrast(uiHighlight)};
  }

  .highlight--fill {
    fill: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--gradient {
    background: ${`linear-gradient(90deg, ${uiHighlight || defaultHighlight}, transparent)`};
  }

  // .ui--MenuItem.topLevel:hover,
  // .ui--MenuItem.isActive.topLevel:hover {
  //   color: ${getContrast(uiHighlight)};

  //   a {
  //     background-color: ${getMenuHoverContrast(uiHighlight)};
  //   }
  // }

  .menuItems li:hover .groupHdr {
    background: ${getMenuHoverContrast(uiHighlight)};
    color: ${getContrast(uiHighlight)};
    opacity:1;
  }

  .groupMenu {
    background: ${getHighlight(uiHighlight)} !important;

    &::before {
      background: ${getMenuHoverContrast(uiHighlight)};
      color:  ${getContrast(uiHighlight)};
    }
    li {
      color:  ${getContrast(uiHighlight)};
    }
  }

  .highlight--hover-bg:hover {
    background: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--hover-color:hover {
    color: ${getHighlight(uiHighlight)} !important;
  }

  .highlight--icon {
    .ui--Icon {
      color: ${getHighlight(uiHighlight)} !important;
    }
  }

  .highlight--shadow {
    box-shadow: 0 0 1px ${getHighlight(uiHighlight)} !important;
  }

  .highlight--stroke {
    stroke: ${getHighlight(uiHighlight)} !important;
  }

  .ui--Button {
    &:not(.isDisabled):not(.isIcon):not(.isBasic),
    &.withoutLink:not(.isDisabled) {
      .ui--Icon {
        background: ${getHighlight(uiHighlight)};
        color: white;
      }
    }

    &.isBasic:not(.isDisabled):not(.isIcon):not(.isSelected) {
      &:not(.isReadOnly) {
        box-shadow: 0 0 1px ${getHighlight(uiHighlight)};
      }

      .ui--Icon {
        color: ${getHighlight(uiHighlight)};
      }
    }

    &.isSelected {
      box-shadow: 0 0 1px ${getHighlight(uiHighlight)};
    }

    &:hover:not(.isDisabled):not(.isReadOnly),
    &.isSelected {
      background: ${getHighlight(uiHighlight)};
      color: white;
      text-shadow: none;

      &:not(.isIcon),
      &.withoutLink {
        .ui--Icon {
          color: inherit;
        }
      }
    }
  }

  .ui--Table td .ui--Button {
    &:not(.isDisabled):not(.isIcon):not(.isToplevel),
    &.withoutLink:not(.isDisabled) {
      &:hover {
        .ui--Icon {
          color: white;
        }
      }

      .ui--Icon {
        background: transparent;
        color: inherit;
      }
    }
  }

  .theme--dark,
  .theme--light {
    .ui--Tabs .tabLinkActive .tabLinkText::after{
    }

    .ui.primary.button,
    .ui.buttons .primary.button {
      background: ${getHighlight(uiHighlight)};

      &.active,
      &:active,
      &:focus,
      &:hover {
        background-color: ${getHighlight(uiHighlight)};
      }
    }

    .ui--Toggle.isChecked {
      &:not(.isRadio) {
        .ui--Toggle-Slider {
          background: linear-gradient(171deg, #AC5BF3 0%, #755BF6 10%, #755BF6 46%, #AC5BF3 71%, #CF5BF0 90%, #DC5BF0 100%);
          // background: ${getHighlight(uiHighlight)} !important;

          &:before {
            border-color: ${getHighlight(uiHighlight)} !important;
          }
        }
      }
    }
  }

  #root {
    background: var(--bg-page);
    color: var(--color-text);
    font: var(--font-sans);
    height: 100%;
  }

  a {
    cursor: pointer;
  }

  article {
    background: #151319;
    box-sizing: border-box;
    margin: 0.25rem;
    padding: 1.25rem;
    position: relative;
    text-align: left;
    overflow:hidden;
    > ul {
      margin: 0;
      padding: 0;
    }

    &.error,
    &.warning {
      line-height: 1.5rem;
      font-size:0.8rem;
      margin-left: 2.25rem;
      padding: 46px 76px;
      position: relative;
      z-index: 5;
      &:before {
        border-radius: 0.25rem;
        bottom: 0;
        content: ' ';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
      }
    }

    &.mark {
      margin: 0.5rem 0 0.5rem 2.25rem;
      padding: 1rem 2rem;
    }

    &.nomargin {
      margin-left: 0;
    }

    &.extraMargin {
      margin: 2rem auto;
    }

    &.centered {
      margin: 30px 0;
      width:100%;
      &+.ui--Button-Group {
        margin-top: 2rem;
      }
    }

    &.left {
      margin: 1.5rem 1.5rem auto 0;
      max-width: 75rem;

      &+.ui--Button-Group {
        margin-top: 2rem;
      }
    }

    &.error {
      &:before {
        background: rgba(255, 12, 12, 0.05);
      }

      border-color: rgba(255, 12, 12, 1);
    }

    &.padded {
      padding: 0.75rem 1rem;

      > div {
        margin: 0.25rem;
      }
    }

    &.warning {
      &:before {
        background: #151319;
      }

      border-color: rgba(255, 196, 12, 1);
    }
  }

  body {
    height: 100%;
    margin: 0;
    font: var(--font-sans);
  }

  br {
    line-height: 1.5rem;
  }

  details {
    cursor: pointer;

    &[open] > summary {
      white-space: normal;

      br, br + * {
        display: block;
      }
    }

    > summary {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      outline: none;

      br, br + * {
        display: none;
      }
    }
  }

  h1, h2, h3, h4, h5 {
    color: var(--color-summary);
    font: var(--font-sans);
    font-weight: var(--font-weight-light);
    margin-bottom: 0.25rem;
  }

  h1 {
    font-size: 1.28rem;
    color: rgba(16, 16, 16, 100);
    font-family: SourceHanSansSC-regular;
    font-weight:500;
    em {
      font-style: normal;
      text-transform: none;
    }
  }

  h2 {
    font-size: 1.71428571rem;
  }

  header {
    text-align: center;

    > article {
      background: transparent;
    }
  }

  html {
    height: 100%;
  }

  label {
    box-sizing: border-box;
    color: var(--color-label);
    display: block;
    font: var(--font-sans);
    // font-size: 22px;
    font-weight: var(--font-weight-normal);
  }

  main {
    > section {
      margin-bottom: 2em;
    }
  }

  /* Add our overrides */
  ${cssSemantic(theme)}
  ${cssTheme}
  ${cssForm}
  ${cssMedia}
  ${cssRx}
  ${cssComponents(theme)}
`);
