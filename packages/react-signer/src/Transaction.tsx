// Copyright 2017-2021 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { QueueTx } from '@polkadot/react-components/Status/types';

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { Call, Expander, Modal, MarkWarning } from '@polkadot/react-components';

import PaymentInfoMine from './mine_payInfo';
import { useTranslation } from './translate';

interface Props {
  className?: string;
  currentItem: QueueTx;
  isSendable: boolean;
  onError: () => void;
  tip?: BN;
}

function Transaction({ className, currentItem: { accountId, extrinsic, isUnsigned, payload }, isSendable, onError, tip }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  if (!extrinsic) {
    return null;
  }

  const { meta, method, section } = extrinsic.registry.findMetaCall(extrinsic.callIndex);
  const args = meta?.args.map(({ name }) => name).join(', ') || '';

  const sendtext = `${section}.${method}(${args})`.replaceAll('Member', 'Miner').replaceAll('member', 'miner').replaceAll('Validator', 'Guardian').replaceAll('validator', 'guardian');

  return (
    <Modal.Columns
      className={className}
    >
      <Expander
        className='tx-details'
        summary={<>{t<string>('Sending transaction')} <span className='highlight'>{sendtext}</span></>}
        summaryMeta={meta}
      >
        <PaymentInfoMine accountId={accountId}
          className='tx-details'
          extrinsic={extrinsic}
          isSendable={isSendable}
          tip={tip} />
        <Call
          onError={onError}
          value={extrinsic}
          withBorder={false}
        />
        <p className='mine-expander-remark'>The details of the transaction including the type, the description (as available from the chain metadata) as well as any parameters and fee estimations (as available) for the specific type of call.</p>
        <div className='warning-mine'>
          <MarkWarning content={t<string>('The transaction, after application of the transfer fees, will drop the available balance below the existential deposit. As such the transfer will fail. The account needs more free funds to cover the transaction fees.')} />
        </div>
      </Expander>
      {/* {!isUnsigned && !payload && (
        <PaymentInfo
          accountId={accountId}
          className='tx-details'
          extrinsic={extrinsic}
          isSendable={isSendable}
          tip={tip}
        />
      )} */}
    </Modal.Columns>
  );
}

export default React.memo(styled(Transaction)`
  .tx-details {
    .ui--Expander-summary {
      font-size: 1.1rem;
      margin: 0 0 0.5rem;
    }

    .highlight {
      font-weight: var(--font-weight-normal);
    }

    .meta {
      margin-bottom: 0.5rem;
      margin-left: 2rem;
    }

    .meta, .mute {
      opacity: 0.6;
    }
  }
`);
