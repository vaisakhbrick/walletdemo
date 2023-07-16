import { View, ActivityIndicator, StyleSheet } from "react-native";
import { resetNavigationStack } from "../helpers/navigationhelpers/NavigationHelpers";
import { useEffect } from "react";
import useInitialization, { currentETHAddress, web3wallet } from "../helpers/wallethelper/WalletConnectUtils";
import Spacer from "../Components/Atoms/Spacer";
import GenText from "../Components/Atoms/GenText";
import { NavigationConstants } from "../constants/Constants";



const Root = () => {

    useInitialization()
    useEffect(() => {
        if (web3wallet && currentETHAddress) {
            console.log(currentETHAddress)
            resetNavigationStack(NavigationConstants.Tabs)
        }
    }, [web3wallet, currentETHAddress])

    return (
        <View style={styles.container}>
            <GenText>Initialising Wallet, Please Wait .....</GenText>
            <Spacer height={20} />
            <ActivityIndicator animating={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
})

export default Root;