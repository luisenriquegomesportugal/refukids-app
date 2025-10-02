import LogoSvg from "@/assets/images/logo.svg";
import CheckinEventos from "@/components/checkins/eventos";
import CheckinsSkeleton from "@/components/skeleton/checkins";
import { useCacheQuery } from "@/hooks/useCache";
import { Checkin, Crianca, CriancaCheckin } from "@/utils/schema";
import { colors, fonts, styles } from "@/utils/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CheckinsCriancas() {
  const [checkin, setCheckin] = useState<CriancaCheckin>()

  const { criancaId } = useLocalSearchParams<{ criancaId: string }>()
  const { data, loading } = useCacheQuery<Crianca>(['criancasGet', criancaId], `criancasGet?id=${criancaId}`)

  if (loading) {
    return <CheckinsSkeleton />
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
        Checkins
      </Text>
      <Text style={styles.headerDescription}>
        Aqui você verá todos os checkins já realizados
      </Text>
      <View style={styles.full}>
        <FlatList
          data={Object.values(data?.checkins!)}
          horizontal={true}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.checkinListData}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TouchableOpacity
            style={styles.checkinListDataItem}
            onPress={() => setCheckin(item)}>
            <Text style={[styles.headerSection, checkin && checkin == item ? { fontFamily: fonts.inter.semibold } : null]}>{new Date(item.data).getDate()}</Text>
            <Text style={[styles.headerDescription, checkin && checkin == item ? { fontFamily: fonts.inter.semibold } : null]}>{new Date(item.data).toLocaleString('pt-BR', { month: 'short' })}</Text>
          </TouchableOpacity>}
        />
      </View>
    </View>
    {checkin && <CheckinEventos checkin={checkin} />}
  </View>
}