import { Notificacao, Usuario } from "@/utils/schema";
import { styles } from "@/utils/styles";
import { Text, View } from "react-native";
import ListaItemSkeleton from "../skeleton/listitem";
import { Image } from "expo-image";
import moment from "moment";
import "moment/locale/pt-br";
import { useCacheQuery } from "@/hooks/useCache";

export default function ListItemNotificacao({ nofiticacaoId }: { nofiticacaoId: string }) {
    const { data, loading } =  useCacheQuery<Notificacao>(['notificacaoGet', nofiticacaoId], `notificacaoGet?id=${nofiticacaoId}`)
    
    const { data: usuarioNotificacao, loading: usuarioloading } = useCacheQuery<Usuario>(['usuariosGet', data?.notificadoPor!], `usuariosGet?id=${data?.notificadoPor}`)

    if (loading || usuarioloading) {
        return <ListaItemSkeleton />
    }

    return <View
        style={styles.listitem}>
        <View style={styles.listitemImageContainer}>
            <Image
                cachePolicy={"memory-disk"}
                placeholder={require('@/assets/images/user.png')}
                source={{ uri: usuarioNotificacao?.foto}}
                style={styles.listitemImage} />
        </View>
        <View style={styles.listitemTextContainer}>
            <View style={styles.listitemHeader}>
                <Text style={styles.listitemTitulo} numberOfLines={1}>{data?.titulo}</Text>
                <Text style={styles.listitemData}>{moment(data?.cadastradoEm).fromNow()}</Text>
            </View>
            <Text style={styles.listitemBy}>{usuarioNotificacao?.nome}</Text>
            <Text style={styles.listitemDescricao} numberOfLines={2}>{data?.corpo}</Text>
        </View>
    </View>
}