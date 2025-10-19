import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors'
import { StatusBar } from 'react-native'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key')
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <StatusBar backgroundColor={COLORS.primary} barStyle={"light-content"}/>
        <Slot />
      </SafeAreaView>

    </ClerkProvider>
  )
}
