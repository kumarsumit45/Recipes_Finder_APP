import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors'
export default function RootLayoutNav() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <Slot />
      </SafeAreaView>
      
    </ClerkProvider>
  )
}
