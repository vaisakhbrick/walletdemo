import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useConnecteddapps from "../hooks/useConnecteddapps";
import IndividualSession from "../Components/IndividualSession";
import GenText from "../Components/Atoms/GenText";
import Spacer from "../Components/Atoms/Spacer";

const ConnectedDapps = () => {

    const { cDappsState, actions } = useConnecteddapps()

    useFocusEffect(
        useCallback(() => {
            actions.getActiveDapps()
        }, [])
    );

    if (!cDappsState.cDapps || cDappsState.cDapps.length === 0) {
        return (
            <View style={styles.emptycontainer}>

                <GenText style={styles.greyText}>
                    Apps you connect with will appear here. To connect paste the
                    code that is displayed in the app in home screen and pair.
                </GenText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Spacer height={50} />
            <View style={styles.textContainer}>
                <GenText style={styles.greyText}>
                    Apps you connect with will appear here.
                </GenText>
            </View>
            <Spacer height={30} />
            <ScrollView >
                {cDappsState.cDapps.map((session, index) => {

                    return (
                        <IndividualSession
                            key={index}
                            icons={session.icons.toString()}
                            name={session.name}
                            url={session.url}
                            topic={session.topic}
                            disconnect={actions.disconnectSession}
                        />
                    );
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({


    greyText: {
        fontSize: 15,
        lineHeight: 21,
        color: '#798686',
        width: '80%',
        textAlign: 'center',
    },
    imageContainer: {
        height: 30,
        width: 35,
        marginBottom: 16,
    },
    container: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        marginTop: 36,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptycontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});

export default ConnectedDapps;