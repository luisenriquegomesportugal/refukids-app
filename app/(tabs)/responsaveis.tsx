import ListItemResponsavel from "@/components/listitem/listitem-responsavel";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import useFamilia from "@/services/useFamilia";
import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabResponsaveis() {
    const {responsaveis, carregandoFamilia, recarregarFamilia, recarregandoFamilia} = useFamilia()

    if (carregandoFamilia) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={responsaveis}
            keyExtractor={item => item}
            refreshing={recarregandoFamilia}
            onRefresh={recarregarFamilia}
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