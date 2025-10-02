import ListItemResponsavel from "@/components/listitem/listitem-responsavel";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import { useCacheQuery } from "@/hooks/useCache";
import { Familia } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabResponsaveis() {
  const { data, loading, refetch } = useCacheQuery<Familia>(['familiasGet'], 'familiasGet')

    if (loading) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={Object.values(data?.responsaveis || {})}
            keyExtractor={item => item}
            refreshing={loading}
            onRefresh={refetch}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() =>
                <View style={styles.addRegistroButtonContainer}>
                    <TouchableOpacity style={styles.addRegistroButton} onPress={() => router.push('/responsaveis/cadastro')}>
                        <Text style={styles.addRegistroButtonText}>Adicionar responsável</Text>
                    </TouchableOpacity>
                </View>}
            renderItem={({ item }) => <ListItemResponsavel responsavelId={item} />}
        />
    </View>;
}