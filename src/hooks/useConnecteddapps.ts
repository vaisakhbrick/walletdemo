import { web3wallet } from "../helpers/wallethelper/WalletConnectUtils"
import { useState } from "react"
import { getSdkError } from "@walletconnect/utils";

type CdappsState = {
    cDapps: any[],
    loading: boolean
}

const initialState: CdappsState = {
    cDapps: [],
    loading: false
}

export default () => {

    const [cDappsState, setcDappsState] = useState<CdappsState>(initialState)

    const getActiveDapps = () => {
        let sessions = web3wallet.getActiveSessions()
        let activeSessions = Object.values(sessions) && Object.values(sessions).map((session) => {
            const { name, icons, url } = session?.peer.metadata;
            const { topic } = session
            return {
                name, icons, url, topic
            }
        })
        setcDappsState({
            ...cDappsState, cDapps: activeSessions
        })
    }

    const disconnectSession = async (topic: string) => {
        await web3wallet.disconnectSession({
            topic,
            reason: getSdkError("USER_DISCONNECTED"),
        });
        getActiveDapps()
    }

    return {
        cDappsState,
        actions: {
            getActiveDapps,
            disconnectSession
        }
    }
}