import { AuthProvider } from '@/contexts/Auth';
import { useAuth } from '@/hooks/useAuth';
import { Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { usuario, carregando } = useAuth();

  return (
    <ThemeProvider value={DefaultTheme}>
      <ExpoStatusBar style="dark" translucent />
      <ActionSheetProvider>
        <SafeAreaProvider>
          {
            carregando
              ? <ActivityIndicator />
              : <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={!!usuario}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="(pages)" />
                </Stack.Protected>

                <Stack.Protected guard={!usuario}>
                  <Stack.Screen name="(autenticacao)" />
                </Stack.Protected>
              </Stack>
          }
        </SafeAreaProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
