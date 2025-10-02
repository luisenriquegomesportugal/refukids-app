import LogoSvg from '@/assets/images/logo';
import { styles } from '@/utils/styles';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return <SafeAreaView style={styles.safeAreaViewContainer}>
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.pagesContainer}>
        <View style={styles.layoutHeader}>
          <View style={styles.pagesHeader}>
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Feather name="arrow-left-circle" style={styles.pagesActionButton} />
            </TouchableOpacity>
            <LogoSvg
              width={140}
              height={60}
              style={styles.headerLogo} />
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Página não encontrada
          </Text>
          <Text style={styles.headerDescription}>
            Sentimos muito pelo ocorrido! entre em contato com sua liderança e descreva o erro.
          </Text>
        </View>
        <View style={styles.containerActivityIndicator}>
          <MaterialIcons name='error-outline' size={72} />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
}