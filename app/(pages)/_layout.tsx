import { styles } from "@/utils/styles";
import { Slot, Stack } from "expo-router";
import { useRef } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StackLayout() {
  const prevY = useRef(0);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer} onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset.y < (prevY.current - 5)) Keyboard.dismiss();
            prevY.current = nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}>
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView >
    </SafeAreaView>
  );
}
