import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";


const VerifyEmail = ({ email, onBack }) => {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!code || code.length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    if (!isLoaded) return;

    setLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("Sign up attempt status:", signUpAttempt.status);
      console.log("Missing requirements:", signUpAttempt.missingRequirements);
      console.log("Unverified fields:", signUpAttempt.unverifiedFields);

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        console.log("Session activated, redirecting to tabs");
        router.replace("/(tabs)");
      } else if (signUpAttempt.status === "missing_requirements") {
        // Check what's missing and complete the signup
        console.log("Attempting to complete signup with missing requirements");

        try {
          const completeSignUp = await signUp.update({
            unsafeMetadata: {}
          });

          if (completeSignUp.status === "complete") {
            await setActive({ session: completeSignUp.createdSessionId });
            console.log("Session activated after update, redirecting to tabs");
            router.replace("/(tabs)");
          } else {
            Alert.alert("Error", `Please complete all required fields. Status: ${completeSignUp.status}`);
          }
        } catch (updateError) {
          console.error("Update error:", updateError);
          Alert.alert("Error", updateError.errors?.[0]?.message || "Failed to complete signup");
        }
      } else {
        Alert.alert("Error", `Verification status: ${signUpAttempt.status}. Please try again.`);
      }
    } catch (error) {
      console.error("Verification error:", error);

      // Check if already verified
      if (error.message?.includes("already been verified")) {
        // Try to complete the signup anyway
        try {
          if (signUp.status === "complete") {
            await setActive({ session: signUp.createdSessionId });
            router.replace("/(tabs)");
          } else {
            const updatedSignUp = await signUp.update({});
            if (updatedSignUp.status === "complete") {
              await setActive({ session: updatedSignUp.createdSessionId });
              router.replace("/(tabs)");
            }
          }
        } catch (recoveryError) {
          Alert.alert("Error", "Email already verified. Please sign in instead.");
        }
      } else {
        Alert.alert("Error", error.errors?.[0]?.message || error.message || "Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={70}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>
          <Text style={authStyles.title}>Verify Your Email </Text>
          <Text style={authStyles.subtitle}>
            We've sent a verification code to {email}
          </Text>
          <View style={authStyles.formContainer}>
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter Verification code"
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={[
                authStyles.authButton,
                loading && authStyles.buttonDisabled,
              ]}
              onPress={handleVerification}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Verifying..." : "Verify Email"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={onBack}
            >
              <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Back to Sign Up</Text>
              </Text>
            </TouchableOpacity>

           

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmail;
