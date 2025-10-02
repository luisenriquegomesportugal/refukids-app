import LogoSvg from "@/assets/images/logo.svg";
import DetalheSkeleton from "@/components/skeleton/detalhe";
import { useCacheQuery } from "@/hooks/useCache";
import { calcularIdadeCompleta } from "@/utils/helpers";
import { Crianca } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DetalheCriancas() {
  const { criancaId } = useLocalSearchParams<{ criancaId: string }>()
  const { data, loading } = useCacheQuery<Crianca>(['criancasGet', criancaId], `criancasGet?id=${criancaId}`)

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
          {data?.sexo}
        </Text>
        <Text style={styles.headerDescription}>
          {calcularIdadeCompleta(data?.dataNascimento!)}
        </Text>
      </View>
    </View>
    {
      data?.celula
        ?
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>Célula</Text>
          <TextInput
            readOnly
            style={styles.formInputDisabled}
            value={data?.celula} />
        </View>
        : null
    }
    {
      data?.observacao
        ? <View style={styles.formControl}>
          <Text style={styles.formLabel}>Observação</Text>
          <TextInput
            readOnly
            style={styles.formInputDisabled}
            multiline={true}
            value={data?.observacao} />
        </View>
        : null
    }
    <Text style={styles.headerSection}>Últimos checkins</Text>
    <View style={styles.listInfoContainer}>
      {
        data?.checkins
          ? <>
            <View style={styles.listInfoWrapper}>
              {
                Object.values(data?.checkins)
                  .sort((a, b) => Date.parse(a.data) > Date.parse(b.data) ? 1 : -1)
                  .slice(0, 5)
                  .map((checkin, index, checkins) =>
                    <View key={checkin.id} style={[styles.listInfoItem, index === 0 ? styles.listInfoItemFirst : index === checkins.length - 1 ? styles.listInfoItemLast : null]}>
                      <Text style={styles.listInfoItemLabel}>{new Date(checkin.data).toLocaleDateString('pt-BR', { dateStyle: "long" })}</Text>
                    </View>)
              }
            </View>
            <View style={styles.listInfoItemMoreButtonWrapper}>
              <TouchableOpacity style={styles.listInfoItemMoreButton} onPress={() => router.push({ pathname: '/criancas/[criancaId]/checkins', params: { criancaId } })}>
                <Text style={styles.listInfoItemMoreButtonLabel}>Visualizar todos</Text>
              </TouchableOpacity>
            </View>
          </>
          : <View style={styles.listInfoWrapper}>
            <View style={[styles.listInfoItem, styles.listInfoItemFirst, styles.listInfoItemLast]}>
              <Text style={styles.listInfoItemLabel}>Nenhum checkin realizado</Text>
            </View>
          </View>
      }
    </View>
  </View>
}
