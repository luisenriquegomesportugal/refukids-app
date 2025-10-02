import LogoSvg from "@/assets/images/logo.svg";
import CadastroForm from "@/components/forms/autenticacao/cadastro/formulario";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CadastroFormulario() {
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
        Cadastro do responsável
      </Text>
      <Text style={styles.headerDescription}>
        Preencha os dados abaixo para fazer seu cadastro.
      </Text>
    </View>
    <CadastroForm />
  </View>
}
