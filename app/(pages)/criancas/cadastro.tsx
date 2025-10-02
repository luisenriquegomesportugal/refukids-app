import LogoSvg from "@/assets/images/logo.svg";
import CadastroCriancaForm from "@/components/forms/cadastros/criancas";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CadastroCriancas() {
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
        Cadastro de Criança
      </Text>
    </View>
    <CadastroCriancaForm />
  </View>
}
