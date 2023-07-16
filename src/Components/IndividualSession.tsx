import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type IndividualSessionProps = {
    name: string | undefined;
    icons: string;
    url: string;
    topic: string
    disconnect: (x: string) => {}
}

const IndividualSession = ({ name, icons, url, topic, disconnect }: IndividualSessionProps) => {
    const icon = icons ? icons : null;
    return (
        <View style={styles.sessionContainer}>
                {icon ? (
                    <Image source={{ uri: icon }} style={styles.iconContainer}
                    />
                ) : null}
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{name ? name : 'No Name'}</Text>
                    <Text style={styles.greyText}>{url.slice(8)} </Text>
                </View>
                <TouchableOpacity onPress={() => disconnect(topic)} style={styles.disconnect}>
                    <Ionicons name={'power'} size={20} color={'red'} />
                    <Text style={styles.greyText}>Disconnect</Text>
                </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    sessionContainer: {
        height: 80,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    disconnect: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        paddingLeft: 10,
    },
    mainText: {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '600',
    },
    greyText: {
        fontSize: 13,
        lineHeight: 28,
        color: '#798686',
    },
});


export default IndividualSession;