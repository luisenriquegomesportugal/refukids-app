import ListItemNotificacao from "@/components/listitem/listitem-notificacao";
import ListaItemSkeleton from "@/components/skeleton/listitem";
import useNotificacoes from "@/services/useNotificacoes";
import { styles } from "@/utils/styles";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabNotificacoes() {
    const {notificacoes, carregandoNotificacoes, recarregarNotificacoes, recarregandoNotificacoes} = useNotificacoes()

    if (carregandoNotificacoes) {
        return <ListaItemSkeleton />
    }

    return <View style={styles.full}>
        <FlatList
            data={notificacoes}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            refreshing={recarregandoNotificacoes}
            onRefresh={recarregarNotificacoes}
            ListFooterComponent={<View style={styles.addRegistroButtonContainer}>
                <TouchableOpacity style={styles.addRegistroButton} onPress={() => null}>
                    <Text style={styles.addRegistroButtonText}>Limpar notificações</Text>
                </TouchableOpacity>
            </View>}
            renderItem={({ item }) => <ListItemNotificacao nofiticacaoId={item} />}
        />
    </View>;
}