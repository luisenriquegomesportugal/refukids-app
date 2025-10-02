import { Responsavel } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ListaItemSkeleton from "../skeleton/listitem";
import { useCacheQuery } from "@/hooks/useCache";
import { formatTelefone } from "@/utils/helpers";

export default function ListItemResponsavel({ responsavelId }: { responsavelId: string }) {
    const { data, loading } = useCacheQuery<Responsavel>(['responsaveisGet', responsavelId], `responsaveisGet?id=${responsavelId}`)

    if (loading) {
        return <ListaItemSkeleton />
    }

    return <TouchableOpacity
        style={styles.listitem}
        onPress={() => router.push({
            pathname: '/responsaveis/[responsavelId]/detalhe',
            params: { responsavelId }
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