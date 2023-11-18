import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/auth-context";
import Home from "../screens/home";
import Login from "../screens/login";
import { Button } from "react-native";
import Register from "../screens/register";

const Stack = createNativeStackNavigator()

export function NavigationLayout() {
    const { authState, onLogout } = useAuth()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    authState?.authenticated ? (
                        <Stack.Group>
                            <Stack.Screen name="Home" options={{
                                headerRight: () => <Button onPress={onLogout} title="Sign Out" />
                            }} component={Home}></Stack.Screen>
                        </Stack.Group>
                    ) : (
                        <Stack.Group>

                            <Stack.Screen name="Login" component={Login} ></Stack.Screen>
                            <Stack.Screen name="Register" component={Register} ></Stack.Screen>
                        </Stack.Group>

                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}