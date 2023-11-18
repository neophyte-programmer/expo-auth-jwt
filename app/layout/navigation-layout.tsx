import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/auth-context";
import Home from "../screens/home";
import Login from "../screens/login";
import { Button } from "react-native";

const Stack = createNativeStackNavigator()

export function NavigationLayout() {
    const { authState, onLogout } = useAuth()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    authState?.authenticated ? (
                        <Stack.Screen name="Home" options={{
                            headerRight: () => <Button onPress={onLogout} title="Sign Out" />
                        }} component={Home}></Stack.Screen>
                    ) : (
                        <Stack.Screen name="Login" component={Login} ></Stack.Screen>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}