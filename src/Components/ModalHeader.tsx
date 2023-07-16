import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type IModalHeaderProps = {
  name: string;
  url: string;
  icon: string;
}


export default function ModalHeader({ name, url, icon }: IModalHeaderProps) {
  return (
    <View style={styles.modalHeaderContainer}>
      <View>
        <Image
          source={{
            uri: icon,
          }}
          style={styles.WCLogoLeft}
        />
      </View>

      <Text style={styles.dappTitle}>{name}</Text>
      <Text style={styles.wouldLikeToConnectText}>would like to connect</Text>
      <Text style={styles.urlText}>{url?.slice(8)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  WCLogoLeft: {
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  WCLogoRight: {
    width: 60,
    height: 60,
    borderRadius: 8,
    left: -30,
    top: -8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emojiContainer: {
    opacity: 0.8,
    width: 290,
    height: 44,
    borderRadius: 8,
    marginBottom: 8,
  },
  dappTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  wouldLikeToConnectText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    opacity: 0.6,
  },
  urlText: {
    paddingTop: 8,
    color: 'rgba(60, 60, 67, 0.6)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
    marginVertical: 16,
  },
});
