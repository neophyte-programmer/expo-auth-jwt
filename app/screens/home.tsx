import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/auth-context'

const Home = () => {
    const { authState} = useAuth()
  return (
    <View>
          <Text>Home</Text>
          
    </View>
  )
}

export default Home
