import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import AcceptRejectButton from '../AcceptRejectButton';
import Events from '../Events';
import ModalHeader from '../ModalHeader';
import Methods from '../Methods';
import Tag from '../Tag';


type PairingModalProps = {
    proposal: any; //ToDo: fix.
    visible: boolean;
    handleAccept: () => void;
    handleDecline: () => void;
}

const PairingModal = ({
    proposal,
    visible,
    handleAccept,
    handleDecline,
}: PairingModalProps) => {

    const name = proposal?.params?.proposer?.metadata?.name;
    const url = proposal?.params?.proposer?.metadata.url;
    const methods = proposal?.params?.requiredNamespaces.eip155.methods;
    const events = proposal?.params?.requiredNamespaces.eip155.events; // only supporting eip155 for now
    const chains = proposal?.params?.requiredNamespaces.eip155.chains;
    const icon = proposal?.params.proposer.metadata.icons[0];

    return (
        <Modal
            isVisible={visible}
            hideModalContentWhileAnimating
            backdropOpacity={0.6}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <ModalHeader name={name} url={url} icon={icon} />

                    <View style={styles.divider} />
                    <Text style={styles.permissionsText}>REQUESTED PERMISSIONS:</Text>

                    <View style={styles.chainContainer}>
                        <View style={styles.flexRowWrapped}>
                            {chains?.map((chain: string, index: number) => {
                                return (
                                    <Tag key={index} value={chain.toUpperCase()} grey={true} />
                                );
                            })}
                        </View>
                        <Methods methods={methods} />
                        <Events events={events} />
                    </View>

                    <View style={styles.flexRow}>
                        <AcceptRejectButton accept={false} onPress={handleDecline} />
                        <AcceptRejectButton accept={true} onPress={handleAccept} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 15,
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
        backgroundColor: 'rgba(242, 242, 247, 0.8)',
        width: '100%',
        paddingTop: 30,
        minHeight: '70%',
        position: 'absolute',
        bottom: 44,
    },
    permissionsText: {
        color: 'rgba(60, 60, 67, 0.6)',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        paddingBottom: 8,
    },
    chainContainer: {
        width: '90%',
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(80, 80, 89, 0.1)',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(60, 60, 67, 0.36)',
        marginVertical: 16,
    },
});

export default PairingModal;