import LogoSvg from "@/assets/images/logo";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

export default function DetalheSkeleton() {
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
        <View style={styles.headerUserEditWrapper}>
            <Animated.View style={[styles.skeleton, { width: 120, height: 120, borderRadius: 100, opacity }]} />
        </View>
        <View style={[styles.headerContainer, styles.center]}>
            <Animated.View style={[styles.skeleton, { width: 250, height: 28, opacity }]} />
            <View style={[styles.center, {gap: 4}]}>
                <Animated.View style={[styles.skeleton, { width: 100, height: 20, opacity }]} />
                <Animated.View style={[styles.skeleton, { width: 140, height: 20, opacity }]} />
            </View>
        </View>
        <View style={styles.formControl}>
            <Animated.View style={[styles.skeleton, { width: 60, height: 16, opacity }]} />
            <Animated.View style={[styles.skeleton, { width: 'auto', height: 44, opacity }]} />
        </View>
        <View style={styles.formControl}>
            <Animated.View style={[styles.skeleton, { width: 130, height: 16, opacity }]} />
            <Animated.View style={[styles.skeleton, { width: 'auto', height: 44, opacity }]} />
        </View>
        <Animated.View style={[styles.skeleton, { width: 90, height: 20, marginTop: 20, opacity }]} />
        <View style={styles.listInfoContainer}>
            <Animated.View style={[styles.skeleton, { width: 'auto', height: 44, opacity }]} />
            <View style={styles.listInfoItemMoreButtonWrapper}>
                <Animated.View style={[styles.skeleton, { width: 150, height: 26, opacity }]} />
            </View>
        </View>
    </View>
}
