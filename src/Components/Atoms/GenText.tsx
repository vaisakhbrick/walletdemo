
import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';


interface TextPropz extends TextProps {
  style?: TextStyle
  children: any
  fontWeight?: any
  testID?: string,
  fontStyle?: string,
  color?: string,
  fontSize?: number,
  textAlign?: TextAlignType,
  opacity?: number,
  regular?: boolean,
  heavy?: boolean,
  semibold?: boolean,
  bold?: boolean,
  left?: boolean,
  medium?: boolean,
  pBottom?: number,
  pLeft?: number,
  pRight?: number | string,
  pTop?: number,
  pHorizontal?: number,
  pVertical?: number,
  backgroundColor?: string,
}

type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;

export enum TextAlign {
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify',
  auto = 'auto'
}

const GenText: React.FC<TextPropz> = ({
  style,
  children,
  fontWeight,
  testID,
  fontStyle,
  fontSize,
  textAlign,
  opacity,
  color,
  pLeft,
  pRight,
  pTop,
  pBottom,
  pHorizontal,
  pVertical,
  onPress,
  backgroundColor}) => {


  return (
    <Text allowFontScaling={false}
      //@ts-ignore
      style={
        {
          fontStyle: fontStyle || 'normal',
          color: color || 'black',
          fontSize: fontSize || 14,
          textAlign: textAlign || 'auto',
          opacity: opacity ? opacity : 1,
          fontWeight: fontWeight || null,
          backgroundColor: backgroundColor ,
          paddingBottom: pBottom || 0,
          paddingLeft: pLeft || 0,
          paddingRight: pRight || 0,
          paddingTop: pTop || 0,
          paddingVertical: pVertical || 0,
          paddingHorizontal: pHorizontal || 0,
          ...style
        }
      }
      onPress={onPress}
      accessibilityLabel={testID}
      testID={testID}>{children}
    </Text>
  )
}



export default GenText;