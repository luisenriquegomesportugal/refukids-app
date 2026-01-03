import ListItemTio from "@/components/listitem/listitem-tio";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import useFamilia from "@/services/useFamilia";
import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabTios() {
    const {tios, carregandoFamilia, recarregarFamilia, recarregandoFamilia} = useFamilia()

    if (carregandoFamilia) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={tios}
            keyExtractor={item => item}
            refreshing={recarregandoFamilia}
            onRefresh={recarregarFamilia}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() =>
                <View style={styles.addRegistroButtonContainer}>
                    <TouchableOpacity style={styles.addRegistroButton} onPress={() => router.push('/tios/cadastro')}>
                        <Text style={styles.addRegistroButtonText}>Adicionar tio</Text>
                    </TouchableOpacity>
                </View>}
            renderItem={({ item }) => <ListItemTio tioId={item} />}
        />
    </View>;
}