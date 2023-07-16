import React from 'react';
import { View, ViewProps } from 'react-native';


interface SpaceProps extends ViewProps {
    width?: number;
    height?: number;
    color?: string;
}

const Spacer: React.FC<SpaceProps> = ({
    height = 10,
    width = 10,
    color
}) => {
    return <View style={{
        height: height,
        width: width,
        backgroundColor: color
    }} />;
};


export default Spacer;
