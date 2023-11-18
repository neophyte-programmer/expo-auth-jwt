import { View, Text, Button } from 'react-native'
import React from 'react'
import LoginForm from '../forms/login/login-form'

const Login = ({ navigation }: { navigation: any }) => {
    return (
        <View>
            <Button
                title="Go to Register"
                onPress={() => navigation.navigate('Register')}
            />
            <LoginForm />
        </View>
    )
}

export default Login