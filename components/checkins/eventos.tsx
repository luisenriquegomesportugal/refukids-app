import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Checkin, CriancaCheckin, Tio } from "@/utils/schema";
import { useCacheQuery } from "@/hooks/useCache";
import moment from "moment";
import CheckinEvento from "./evento";
import CheckinEventosSkeleton from "../skeleton/checkin-eventos";

export default function CheckinEventos({ checkin }: { checkin: CriancaCheckin }) {
    const { data, loading } = useCacheQuery<Checkin>(['checkinsGet', checkin.id], `checkinsGet?id=${checkin.id}`)

    if (loading) {
        return <CheckinEventosSkeleton />
    }

    return <>
        <Text style={styles.headerSection}>{new Date(checkin.data).toLocaleDateString('pt-BR', { dateStyle: "long" })}</Text>
        <View>
            {
                Object.values(data?.eventos!)
                    .map((evento, index, checkins) => <CheckinEvento key={evento.id} checkinEvento={evento} isFirst={index === 0} isLast={index === checkins.length-1} />)}
        </View>
    </>
}