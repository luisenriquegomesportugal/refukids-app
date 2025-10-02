import ListItemCrianca from "@/components/listitem/listitem-crianca";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import { useCacheQuery } from "@/hooks/useCache";
import { Familia } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabIndex() {
  const { data, loading, refetch } = useCacheQuery<Familia>(['familiasGet'], 'familiasGet')

    if (loading) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={Object.values(data?.criancas || {})}
            keyExtractor={item => item}
            refreshing={loading}
            onRefresh={refetch}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() =>
                <View style={styles.addRegistroButtonContainer}>
                    <TouchableOpacity style={styles.addRegistroButton} onPress={() => router.push('/criancas/cadastro')}>
                        <Text style={styles.addRegistroButtonText}>Adicionar criança</Text>
                    </TouchableOpacity>
                </View>}
            renderItem={({ item }) => <ListItemCrianca criancaId={item} />}
        />
    </View>;
}