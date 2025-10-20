import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect, useCallback } from 'react'
import CustomSplashScreen from '../components/SplashScreen'
import * as SplashScreen from 'expo-splash-screen'

// Keep the native splash screen visible while we load
SplashScreen.preventAutoHideAsync()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key')
}

export default function RootLayoutNav() {
  const [showSplash, setShowSplash] = useState(true)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // You can add any initialization logic here
        // For example: loading fonts, assets, etc.
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the native splash screen
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  useEffect(() => {
    if (appIsReady) {
      onLayoutRootView()
    }
  }, [appIsReady, onLayoutRootView])

  if (!appIsReady || showSplash) {
    return <CustomSplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <StatusBar style="light" backgroundColor={COLORS.primary} />
        <Slot />
      </SafeAreaView>

    </ClerkProvider>
  )
}
