import LogoSvg from "@/assets/images/logo.svg";
import { auth } from "@/configs/firebase";
import { useAuth } from "@/hooks/useAuth";
import { colors, styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { cpf } from "cpf-cnpj-validator";
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const { usuario } = useAuth();

  return <View style={styles.pagesContainer}>
    <View style={styles.layoutHeader}>
      <View style={styles.pagesHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left-circle" style={styles.pagesActionButton} />
        </TouchableOpacity>
        <LogoSvg
          width={140}
          height={60}
          style={styles.headerLogo} />
      </View>
    </View>
    <View style={styles.headerUserEditWrapper}>
      <Image
        placeholder={require('@/assets/images/user.png')}
        cachePolicy={"memory-disk"}
        source={{ uri: usuario?.picture }}
        style={styles.headerUser} />
    </View>
    <View style={[styles.headerContainer, styles.center]}>
      <Text style={styles.headerTitle}>
        {usuario?.name}
      </Text>
      <View style={styles.center}>
        <Text style={styles.headerDescription}>
          {cpf.format(usuario?.cpf!)}
        </Text>
      </View>
    </View>
    <Text style={styles.headerSection}>
      Configurações
    </Text>
    <View style={styles.formControl}>
      <Text style={styles.formLabel}>Versão</Text>
      <TextInput
        readOnly
        style={styles.formInputDisabled}
        value="1.0.0" />
    </View>
    <TouchableOpacity style={styles.cancelButton} onPress={() => auth.signOut()}>
      <Text style={[styles.cancelButtonLabel, { color: colors.textInvalid }]}>Sair</Text>
    </TouchableOpacity>
  </View>
}
