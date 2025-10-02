import LogoSvg from "@/assets/images/logo.svg";
import CadastroTiosForm from "@/components/forms/cadastros/tios";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CadastroTios() {
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
        Cadastro de Tios
      </Text>
    </View>
    <CadastroTiosForm />
  </View>
}
