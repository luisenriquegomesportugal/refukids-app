import LogoSvg from "@/assets/images/logo.svg";
import CadastroEsqueceuSenhaForm from "@/components/forms/autenticacao/esqueceu-senha";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CadastroEsqueceuSenha() {
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
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>
        Esqueceu sua Senha
      </Text>
      <Text style={styles.headerDescription}>
        Você irá receber um link no email cadastrado com informações para restaurar sua senha.
      </Text>
    </View>
    <CadastroEsqueceuSenhaForm />
  </View>
}
