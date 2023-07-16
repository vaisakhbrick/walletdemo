import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navref } from '../helpers/navigationhelpers/NavigationHelpers'
import Home from '../screens/HomeScreen'
import Root from '../screens/Root'
import ConnectedDapps from '../screens/ConnectedDapps'
import { NavigationConstants } from '../constants/Constants'
import Ionicons from '@expo/vector-icons/Ionicons';
import Settings from '../screens/Settings'



const Navigation = () => {

    return (
        <NavigationContainer ref={navref}>
            <Stack />
        </NavigationContainer>
    )
}

const AppStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()

const TabStack = createBottomTabNavigator()

const Tabs = () => {
    return <TabStack.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === NavigationConstants.Home) {
                iconName = focused
                    ? 'home'
                    : 'home-outline';
            } else if (route.name === NavigationConstants.ConnectedDApps) {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            //@ts-ignore
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
    })}
    >
        <TabStack.Screen name={NavigationConstants.Home} component={HomeFlow} />
        <TabStack.Screen name={NavigationConstants.ConnectedDApps} component={ConnectedDapps} />
    </TabStack.Navigator>
}


const Stack = () => {
    return (
        <AppStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <AppStack.Screen name={NavigationConstants.Root} component={Root} />
            <AppStack.Screen name={NavigationConstants.Tabs} component={Tabs} />
        </AppStack.Navigator>
    )
}


const HomeFlow = () => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <HomeStack.Screen name={NavigationConstants.HomeFlow} component={Home} />
            <HomeStack.Screen name={NavigationConstants.Settings} component={Settings} />
        </HomeStack.Navigator>
    )
}

export default Navigation