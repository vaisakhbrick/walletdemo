import { useCallback, useEffect, useState } from "react"
import { currentETHAddress, web3WalletPair, web3wallet } from "../helpers/wallethelper/WalletConnectUtils";
import { EIP155_SIGNING_METHODS } from "../helpers/wallethelper/EIP155Lib";
import { eip155Wallets } from "../helpers/wallethelper/EIP155Wallet";
import { getSdkError } from "@walletconnect/utils";
import { SignClientTypes, SessionTypes } from "@walletconnect/types";
import { Alert } from "react-native";

type HomeState = {
    showProposalModal: boolean,
    showSignModal: boolean,
    showTransactionModal: boolean,
    showSignDataModal: boolean,
    currentProposal: any,
    requestSessionData: any,
    requestEventData: any,
    currentEthAdress?: string
    currentMnemonic?: string,
    dappWCURI: string,
    loading: boolean
}

export default () => {

    const initialState: HomeState = {
        showProposalModal: false,
        showSignModal: false,
        currentProposal: undefined,
        requestSessionData: undefined,
        requestEventData: undefined,
        dappWCURI: '',
        loading: false,
        currentEthAdress: currentETHAddress,
        currentMnemonic: eip155Wallets[currentETHAddress].getMnemonic(),
        showTransactionModal: false,
        showSignDataModal: false
    }

    const [homeState, setHomeState] = useState<HomeState>(initialState)

    useEffect(() => {
        web3wallet?.on("session_proposal", onSessionProposal);
        web3wallet?.on("session_request", onSessionRequest);
    }, [])


    const onSessionRequest = useCallback(
        async (requestEvent: SignClientTypes.EventArguments["session_request"]) => {
            const { topic, params } = requestEvent;
            const { request } = params;
            const requestSessionData =
                web3wallet.engine.signClient.session.get(topic);

            switch (request.method) {
                case EIP155_SIGNING_METHODS.ETH_SIGN:
                case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
                    setHomeState({
                        ...homeState,
                        showSignModal: true,
                        requestSessionData: requestSessionData,
                        requestEventData: requestEvent
                    });
                    return;
                case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
                case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
                case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:

                    setHomeState({
                        ...homeState,
                        showSignDataModal: true,
                        requestSessionData: requestSessionData,
                        requestEventData: requestEvent
                    });
                    return;
                case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
                case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:

                    setHomeState({
                        ...homeState,
                        showTransactionModal: true,
                        requestSessionData: requestSessionData,
                        requestEventData: requestEvent
                    });
                    return;
            }
        },
        []
    );

    const onSessionProposal = useCallback(
        (proposal: SignClientTypes.EventArguments["session_proposal"]) => {
            setHomeState({
                ...homeState,
                showProposalModal: true,
                currentProposal: proposal
            });
        },
        []
    );

    const setdappWCURI = (curi: string) => {
        setHomeState({
            ...homeState,
            dappWCURI: curi
        });
    }

    const pair = async () => {
        try {
            await web3WalletPair({ uri: homeState.dappWCURI });
        } catch (error) {
            console.log("pir error", error)
        }

    }

    const acceptPairing = async () => {

        if (homeState.currentProposal) {
            const { id, params } = homeState.currentProposal;
            const { requiredNamespaces, relays } = params;
            const namespaces: SessionTypes.Namespaces = {};
            Object.keys(requiredNamespaces).forEach((key) => {
                const accounts: string[] = [];
                requiredNamespaces[key].chains.map((chain: any) => {
                    [currentETHAddress].map((acc) => accounts.push(`${chain}:${acc}`));
                });

                namespaces[key] = {
                    accounts,
                    methods: requiredNamespaces[key].methods,
                    events: requiredNamespaces[key].events,
                };
            });

            try {

                await web3wallet.approveSession({
                    id,
                    relayProtocol: relays[0].protocol,
                    namespaces,
                });
                Alert.alert('Wooho', 'Pairing Successful')
                console.log('pairing accepted')
            } catch (error) {

            }

            setHomeState({
                ...homeState,
                showProposalModal: false,
                currentProposal: undefined,
                dappWCURI: ''
            });
        }
    }

    const rejectPairing = async () => {

        if (homeState.currentProposal) {
            const { id } = homeState.currentProposal;
            try {

                await web3wallet.rejectSession({
                    id,
                    reason: getSdkError("USER_REJECTED_METHODS"),
                });
                Alert.alert('Oops', 'Pairing Rejected')
                console.log('pairing rejected')


            } catch (error) {


            }
            setHomeState({
                ...homeState,
                showProposalModal: false,
                currentProposal: undefined,
                dappWCURI: ''
            });
        }
    }

    const dismissSignModal = (flag: boolean) => {
        setHomeState({
            ...homeState,
            showSignModal: false
        });
    }

    const dismissTransactionModal = (flag: boolean) => {
        setHomeState({
            ...homeState,
            showTransactionModal: false
        });
    }

    const dismissSignDataModal = (flag: boolean) => {
        setHomeState({
            ...homeState,
            showSignDataModal: false
        });
    }


    return {
        homeState,
        actions: {
            setdappWCURI,
            pair,
            acceptPairing,
            rejectPairing,
            dismissSignModal,
            dismissSignDataModal,
            dismissTransactionModal
        }
    }

}