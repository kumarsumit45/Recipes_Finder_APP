import React, { useEffect, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'

interface CustomSplashScreenProps {
  onFinish: () => void
}

export default function CustomSplashScreen({ onFinish }: CustomSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Animate the splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()

    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      onFinish()
    }, 2500)

    return () => clearTimeout(timer)
  }, [fadeAnim, scaleAnim, onFinish])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Recipe Finder</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A148C',
    letterSpacing: 1,
  },
})
