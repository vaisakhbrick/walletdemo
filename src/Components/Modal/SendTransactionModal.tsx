import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { SignClientTypes } from '@walletconnect/types';
import { approveEIP155Request, rejectEIP155Request } from '../../helpers/wallethelper/EIP155Requests';
import { web3wallet } from '../../helpers/wallethelper/WalletConnectUtils';
import AcceptRejectButton from '../AcceptRejectButton';
import Message from '../Message';
import Methods from '../Methods';
import ModalHeader from '../ModalHeader';
import Tag from '../Tag';

type SendTransactionModalProps  = {
  visible: boolean;
  setVisible: (arg0: boolean) => void;
  requestEvent: SignClientTypes.EventArguments['session_request'] | undefined;
  requestSession: any;
}

const SendTransactionModal = ({
  visible,
  setVisible,
  requestEvent,
  requestSession,
}: SendTransactionModalProps) => {
  const chainID = requestEvent?.params?.chainId?.toUpperCase();
  const method = requestEvent?.params?.request?.method;

  const requestName = requestSession?.peer?.metadata?.name;
  const requestIcon = requestSession?.peer?.metadata?.icons[0];
  const requestURL = requestSession?.peer?.metadata?.url;
  const requestMetadata: SignClientTypes.Metadata =
    requestSession?.peer?.metadata;


  const topic = (requestEvent && requestEvent.topic) ?? '';
  const params = requestEvent && requestEvent.params
  const request = params && params.request
  const transaction = request?.params[0];


  const onApprove = async () => {
    if (requestEvent) {
      const response = await approveEIP155Request(requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });
      setVisible(false);
    }
  }

  const onReject = async () => {
    if (requestEvent) {
      const response = rejectEIP155Request(requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });
      setVisible(false);
    }
  }

  return (
    <Modal backdropOpacity={0.6} isVisible={visible}>
      <View style={styles.modalContainer}>
        <ModalHeader name={requestName} url={requestURL} icon={requestIcon} />

        <View style={styles.divider} />

        <View style={styles.chainContainer}>
          <View style={styles.flexRowWrapped}>
            <Tag value={chainID ?? ''} grey={true} />
          </View>
          <Methods methods={[method ?? '']} />
          <Message message={JSON.stringify(transaction, null, 2)} />
        </View>

        <View style={styles.flexRow}>
          <AcceptRejectButton accept={false} onPress={onReject} />
          <AcceptRejectButton accept={true} onPress={onApprove} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  chainContainer: {
    width: '90%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(80, 80, 89, 0.1)',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowWrapped: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 34,
    paddingTop: 30,
    backgroundColor: 'rgba(242, 242, 247, 0.9)',
    width: '100%',
    position: 'absolute',
    bottom: 44,
  },
  rejectButton: {
    color: 'red',
  },
  dappTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  imageContainer: {
    width: 48,
    height: 48,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
    marginVertical: 16,
  },
});


export default SendTransactionModal