import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


type IAcceptRejectButtonProps = {
  accept: boolean;
  onPress: () => void;
}

const AcceptRejectButton = ({
  accept,
  onPress,
}: IAcceptRejectButtonProps) => {

  const buttonText = accept ? 'Accept' : 'Decline';

  return (
    <TouchableOpacity
      style={!accept ? styles.accept : styles.daccept}
      onPress={() => onPress()}>
      <Text style={styles.mainText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  accept: {
    marginRight: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  daccept: {
    marginRight: 20,
    backgroundColor: 'green',
    padding: 10,
            borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 56,
    width: 160,
  },
  mainText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: 'white',
  },
  imageContainer: {
    width: 24,
    height: 24,
  },
});


export default AcceptRejectButton;