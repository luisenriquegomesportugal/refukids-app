import ListItemNotificacao from "@/components/listitem/listitem-notificacao";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import { useApi } from "@/hooks/useApi";
import { useCacheQuery } from "@/hooks/useCache";
import { Notificacao } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabNotificacoes() {
    const { data, loading, refetch } = useCacheQuery<string[]>(['notificacoesGet'], 'notificacoesGet', {
        ttl: 1000 * 60
    })

    if (loading) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            refreshing={loading}
            onRefresh={refetch}
            ListFooterComponent={<View style={styles.addRegistroButtonContainer}>
                <TouchableOpacity style={styles.addRegistroButton} onPress={() => null}>
                    <Text style={styles.addRegistroButtonText}>Limpar notificações</Text>
                </TouchableOpacity>
            </View>}
            renderItem={({ item }) => <ListItemNotificacao nofiticacaoId={item} />}
        />
    </View>;
}