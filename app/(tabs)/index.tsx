import ListItemCrianca from "@/components/listitem/listitem-crianca";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import useFamilia from "@/services/useFamilia";
import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabIndex() {
    const {criancas, carregandoFamilia, recarregarFamilia, recarregandoFamilia} = useFamilia()

    if (carregandoFamilia) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={criancas}
            keyExtractor={item => item}
            refreshing={recarregandoFamilia}
            onRefresh={recarregarFamilia}
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