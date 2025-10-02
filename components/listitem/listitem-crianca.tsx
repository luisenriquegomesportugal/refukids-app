import CheckinSvg from "@/assets/images/icones/checkin.svg";
import { calcularIdadeCompleta } from "@/utils/helpers";
import { Crianca } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import ListaItemSkeleton from "../skeleton/listitem";
import { useCacheQuery } from "@/hooks/useCache";
import { useApi } from "@/hooks/useApi";

export default function ListItemCrianca({ criancaId }: { criancaId: string }) {
    const {data, loading} = useCacheQuery<Crianca>(['criancasGet', criancaId], `criancasGet?id=${criancaId}`)

    if (loading) {
        return <ListaItemSkeleton />
    }

    return <TouchableOpacity
        onPress={() => router.push({
            pathname: "/criancas/[criancaId]/detalhe",
            params: { criancaId }
        })}
        style={styles.listitem}>
        <View style={styles.listitemImageContainer}>
            <Image
                source={{ uri: data?.foto }}
                style={styles.listitemImage} />
        </View>
        <View style={styles.listitemTextContainer}>
            <Text style={styles.listitemTitulo}>{data?.nome}</Text>
            <Text style={styles.listitemDescricao}>{calcularIdadeCompleta(data?.dataNascimento!)}</Text>
            <Text style={styles.listitemDescricao}>{data?.sexo}</Text>
        </View>
        <View style={styles.listitemCheckinContainer}>
            <TouchableOpacity
                style={styles.listitemCheckinButton}
                onPress={() => router.push({
                    pathname: '/criancas/[criancaId]/checkin',
                    params: { criancaId }
                })}>
                <CheckinSvg
                    width={34}
                    height={34} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
}