import LogoSvg from "@/assets/images/logo";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";

export default function CheckinsSkeleton() {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.8,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return <View style={styles.pagesContainer}>
        <View style={styles.layoutHeader}>
            <View style={styles.pagesHeader}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left-circle" style={styles.pagesActionButton} />
                </TouchableOpacity>
                <LogoSvg
                    width={140}
                    height={60}
                    style={styles.headerLogo} />
            </View>
        </View>
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
                Checkins
            </Text>
            <Text style={styles.headerDescription}>
                Aqui você verá todos os checkins já realizados
            </Text>
            <View style={styles.full}>
                <Animated.View style={[styles.skeleton, { opacity, width: "auto", height: 80 }]} />
            </View>
        </View>
        <Animated.View style={[styles.skeleton, { opacity, width: 80, height: 20, marginTop: 12 }]} />
        <View>
            {
                Array
                    .from({ length: 3 })
                    .map((_, index) => (
                        <View key={index} style={styles.checkinListEvento}>
                            {/* Linha da timeline */}
                            <View style={styles.checkinTimeline}>
                                {index !== 0 && <View style={styles.checkinLineTop} />}
                                <View style={styles.checkinDot} />
                                {index !== 2 && <View style={styles.checkinLineBottom} />}
                            </View>

                            {/* Card */}
                            <View style={styles.checkinListEventoCard}>
                                <View style={styles.checkinListEventoIconContainer}>
                                    <Animated.View style={[styles.skeleton, { opacity, width: 36, height: 36, borderRadius: 18, marginRight: 4 }]} />
                                </View>
                                <View style={styles.checkinListEventoCardContent}>
                                    <View style={styles.checkinListEventoHeader}>
                                        <Animated.View style={[styles.skeleton, { opacity, width: 60, height: 16 }]} />
                                        <Animated.View style={[styles.skeleton, { opacity, width: 50, height: 14 }]} />
                                    </View>
                                    <Animated.View style={[styles.skeleton, { opacity, width: 50, height: 14 }]} />
                                    <Animated.View style={[styles.skeleton, { opacity, width: "auto", height: 14, marginTop: 6 }]} />
                                </View>
                            </View>
                        </View>
                    ))}
        </View>
    </View>
}
