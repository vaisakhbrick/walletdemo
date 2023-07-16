import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import useHomeLogic from "../hooks/useHomeLogic";
import PairingModal from "../Components/Modal/PairingModal";
import GenText, { TextAlign } from "../Components/Atoms/GenText";
import SignModal from "../Components/Modal/SignModal";
import SendTransactionModal from "../Components/Modal/SendTransactionModal";
import SignTypedDataModal from "../Components/Modal/SignTypedDataModal";
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacer from "../Components/Atoms/Spacer";
import { navigate } from "../helpers/navigationhelpers/NavigationHelpers";
import { NavigationConstants } from "../constants/Constants";

const Home = () => {


    const { homeState, actions } = useHomeLogic()

    return (
        <View style={styles.mainContainerStyle}>
            <View style={styles.settingsStyle}>
                <Ionicons
                    onPress={() => navigate(NavigationConstants.Settings, {
                        address: homeState.currentEthAdress,
                        mnemonic: homeState.currentMnemonic
                    })}
                    name={'settings'}
                    size={30}
                    color={'red'} />
            </View>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <GenText textAlign={TextAlign.center}>Enter a WalletConnect URI</GenText>
                    <GenText textAlign={TextAlign.center}>To get the URI press the copy to clipboard button from your dapp's
                        WalletConnect interface.</GenText>
                </View>
                <TextInput
                    style={styles.textInputContainer}
                    onChangeText={actions.setdappWCURI}
                    value={homeState.dappWCURI}
                    placeholder="Enter WC URI (wc:1234...)"
                />
                <TouchableOpacity style={styles.btnContainer} onPress={() => actions.pair()}>
                    <GenText color="green" textAlign={TextAlign.center}>Connect</GenText>
                </TouchableOpacity>
                <PairingModal
                    proposal={homeState.currentProposal}
                    visible={homeState.showProposalModal}
                    handleAccept={actions.acceptPairing}
                    handleDecline={actions.rejectPairing}
                />
                <SignModal
                    visible={homeState.showSignModal}
                    setVisible={actions.dismissSignModal}
                    requestEvent={homeState.requestEventData}
                    requestSession={homeState.requestSessionData} />

                <SendTransactionModal
                    visible={homeState.showTransactionModal}
                    setVisible={actions.dismissTransactionModal}
                    requestEvent={homeState.requestEventData}
                    requestSession={homeState.requestSessionData} />

                <SignTypedDataModal
                    visible={homeState.showSignDataModal}
                    setVisible={actions.dismissSignDataModal}
                    requestEvent={homeState.requestEventData}
                    requestSession={homeState.requestSessionData} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    mainContainerStyle: {
        paddingTop: 60,
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textInputContainer: {
        height: 40,
        width: 250,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 4,
    },
    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    btnContainer: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    settingsStyle: {
        flexDirection: 'row-reverse',
        padding: 10
    }
})

export default Home;