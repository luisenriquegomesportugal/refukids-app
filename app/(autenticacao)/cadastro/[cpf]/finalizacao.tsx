import LogoSvg from "@/assets/images/logo.svg";
import CadastroForm from "@/components/forms/autenticacao/cadastro/formulario";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

type CadastroFinalizacaoProps = {
  cpf: string
}

export default function CadastroFinalizacao() {
  const { cpf } = useGlobalSearchParams<CadastroFinalizacaoProps>();

  if (!cpf) {
    Alert.alert("Erro", "O parametro CPF é obrigátorio", [
      { text: "Voltar", isPreferred: true }
    ], {
      onDismiss: () => {
        router.navigate({
          pathname: "/cadastro/verificacao"
        })
      }
    })
  }

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
        Olá Luis, verificamos que você já foi adicionado como responsável, precisamos só finalizar seu cadastro para continuar.
      </Text>
    </View>
    <CadastroForm cpf={cpf} />
  </View>
}
