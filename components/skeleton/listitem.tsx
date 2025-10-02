import { styles } from "@/utils/styles";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function ListaItemSkeleton() {
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

    return <View style={{ flexDirection: "row", paddingVertical: 10, gap: 12 }}>
        <Animated.View style={[styles.skeleton, { width: 60, height: 60, borderRadius: 16, opacity}]} />
        <View style={{ flex: 1, gap: 2 }}>
            <Animated.View style={[styles.skeleton, { flex: 1, maxWidth: '100%', opacity}]} />
            <Animated.View style={[styles.skeleton, { flex: 1, maxWidth: '70%', opacity}]} />
            <Animated.View style={[styles.skeleton, { flex: 1, maxWidth: '40%', opacity}]} />
        </View>
    </View>
}
