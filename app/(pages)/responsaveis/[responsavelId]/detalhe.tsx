import LogoSvg from "@/assets/images/logo.svg";
import DetalheSkeleton from "@/components/skeleton/detalhe";
import { useCacheQuery } from "@/hooks/useCache";
import { formatEndereco, formatTelefone, useAbrirInfoExterna } from "@/utils/helpers";
import { Responsavel } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { cpf } from "cpf-cnpj-validator";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DetalheResponsaveis() {
  const { abrirInfoExterna } = useAbrirInfoExterna();

  const { responsavelId } = useLocalSearchParams<{ responsavelId: string }>()
  const { data, loading } = useCacheQuery<Responsavel>(['responsaveisGet', responsavelId], `responsaveisGet?id=${responsavelId}`)

  if (loading) {
    return <DetalheSkeleton />
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
      {/* <TouchableOpacity onPress={() => Alert.alert('Editar')}>
        <Feather name="edit" style={styles.pagesActionButton} />
      </TouchableOpacity> */}
    </View>
    <View style={styles.headerUserEditWrapper}>
      <Image
        placeholder={require('@/assets/images/user.png')}
        cachePolicy={"memory-disk"}
        source={{ uri: data?.foto }}
        style={styles.headerUser} />
    </View>
    <View style={[styles.headerContainer, styles.center]}>
      <Text style={styles.headerTitle}>
        {data?.nome}
      </Text>
      <View style={styles.center}>
        <Text style={styles.headerDescription}>
          {cpf.format(data?.cpf!)}
        </Text>
        <Text style={styles.headerDescription}>
          {data?.parentesco}
        </Text>
      </View>
    </View>
    <View style={styles.formControl}>
      <Text style={styles.formLabel}>Célula</Text>
      <TextInput
        readOnly
        style={styles.formInputDisabled}
        value={data?.participaDeCelula === "Sim" ? `${data.celula} (${data.rede})` : "Convidado"} />
    </View>
    <View style={styles.formControl}>
      <Text style={styles.formLabel}>Telefone</Text>
      <View style={styles.formInputWithActionWrapper}>
        <Text style={styles.formInputWithActionValue}>{formatTelefone(data?.telefone!)}</Text>
        <TouchableOpacity onPress={() => abrirInfoExterna("telefone", data?.telefone!)}>
          <Ionicons name="call-outline" size={24} color={"#0178E1"} />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.formControl}>
      <Text style={styles.formLabel}>Endereço</Text>
      <View style={styles.formInputWithActionWrapper}>
        <Text style={styles.formInputWithActionValue}>{formatEndereco(data!)}</Text>
        <TouchableOpacity onPress={() => abrirInfoExterna("mapa", formatEndereco(data!))}>
          <Ionicons name="map-outline" size={24} color={"#0178E1"} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
}

