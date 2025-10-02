import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ListaItemSkeleton from "../skeleton/listitem";
import { useQuery } from "@tanstack/react-query";
import { Tio } from "@/utils/schema";
import { useCacheQuery } from "@/hooks/useCache";
import { formatTelefone } from "@/utils/helpers";

export default function ListItemTio({ tioId }: { tioId: string }) {
    const { data, loading } = useCacheQuery<Tio>(['tiosGet', tioId], `tiosGet?id=${tioId}`)

    if (loading) {
        return <ListaItemSkeleton />
    }

    return <TouchableOpacity
        style={styles.listitem}
        onPress={() => router.push({
            pathname: '/tios/[tioId]/detalhe',
            params: { tioId }
        })}>
        <View style={styles.listitemImageContainer}>
            <Image
                source={{ uri: data?.foto }}
                style={styles.listitemImage} />
        </View>
        <View style={styles.listitemTextContainer}>
            <Text style={styles.listitemTitulo}>{data?.nome}</Text>
            <Text style={styles.listitemDescricao}>{formatTelefone(data?.telefone!)}</Text>
            <Text style={styles.listitemDescricao}>{data?.parentesco}</Text>
        </View>
    </TouchableOpacity>
}