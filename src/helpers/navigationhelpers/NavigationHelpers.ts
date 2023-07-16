import React from "react";
import { CommonActions, NavigationContainerRef } from '@react-navigation/native'
import { RootStackParamList } from "../../types/NavigationTypes";


export const navref = React.createRef<NavigationContainerRef<RootStackParamList>>()


export const navigate = (name: any, params?: any) => {
    navref.current?.navigate(name, params)
}

export const goBack = () => {
    navref.current?.goBack();
};

export const resetNavigationStack = (name: any, index: number = 0, params?: any) => {
    navref.current?.dispatch(
        CommonActions.reset({
            index,
            routes: [{ name, params }],
        }),
    );
};