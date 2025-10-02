import { styles } from "@/utils/styles";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Checkin, CriancaCheckin, EventoCheckin, Tio, Usuario } from "@/utils/schema";
import { useCacheQuery } from "@/hooks/useCache";
import moment from "moment";
import CheckinEventoSkeleton from "../skeleton/checkin-evento";

type CheckinEventoProps = {
    checkinEvento: EventoCheckin,
    isFirst: boolean,
    isLast: boolean
}

export default function CheckinEvento({ checkinEvento, isFirst, isLast }: CheckinEventoProps) {
    const { data, loading } = useCacheQuery<Usuario>(['usuariosGet', checkinEvento.feitoPor], `usuariosGet?id=${checkinEvento.feitoPor}`)

    if (loading) {
        return <CheckinEventoSkeleton />
    }

    return <View style={styles.checkinListEvento}>
        {/* Linha da timeline */}
        <View style={styles.checkinTimeline}>
            {!isFirst && <View style={styles.checkinLineTop} />}
            <View style={styles.checkinDot} />
            {!isLast && <View style={styles.checkinLineBottom} />}
        </View>

        {/* Card */}
        <View style={styles.checkinListEventoCard}>
            <View style={styles.checkinListEventoIconContainer}>
                <Image source={{ uri: data?.foto }} style={styles.checkinListEventoAvatar} />
            </View>
            <View style={styles.checkinListEventoCardContent}>
                <View style={styles.checkinListEventoHeader}>
                    <Text style={styles.checkinListEventoTitle}>{checkinEvento.tipo}</Text>
                    <Text style={styles.checkinListEventoTime}>{moment(checkinEvento.cadastradoEm).fromNow()}</Text>
                </View>
                <Text style={styles.checkinListEventoSubtitle}>{data?.nome}</Text>
                {
                    checkinEvento.detalhes && <View style={{ marginTop: 6 }}>
                        {
                            Object.values(checkinEvento.detalhes).map(descricao => <View key={descricao.value} style={{ gap: 2, flexDirection: "row" }}>
                                {descricao.label && <Text style={styles.listitemDescricaoLabel}>{descricao.label}:</Text>}
                                <Text style={styles.listitemDescricaoValue}>{descricao.value}</Text>
                            </View>)
                        }
                    </View>
                }
            </View>
        </View>
    </View>
}