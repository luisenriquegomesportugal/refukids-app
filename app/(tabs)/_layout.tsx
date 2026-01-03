import BebeSvg from "@/assets/images/icones/bebe.svg";
import NotificacoesSvg from "@/assets/images/icones/notificacoes.svg";
import ResponsaveisSvg from "@/assets/images/icones/responsaveis.svg";
import TiosSvg from "@/assets/images/icones/tios.svg";
import LogoSvg from '@/assets/images/logo.svg';
import TextSkeleton from "@/components/skeleton/text";
import { useAuth } from "@/hooks/useAuth";
import useFamilia from "@/services/useFamilia";
import { styles } from '@/utils/styles';
import { Image } from 'expo-image';
import { router, Tabs } from "expo-router";
import { PropsWithChildren, useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View, ViewStyle } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

type PageBadgeViewProps = PropsWithChildren<{ style: Partial<ViewStyle> }>;

const PageBadgeView: React.FC<PageBadgeViewProps & { isFocused: number }> = props => {
  const widthAnimate = useAnimatedValue(10);

  useEffect(() => {
    Animated
      .timing(widthAnimate, {
        toValue: props.isFocused ? 20 : 10,
        duration: 100,
        useNativeDriver: false,
      })
      .start();
  }, [props.isFocused]);

  return <Animated.View
    style={{
      ...props.style,
      width: widthAnimate
    }} />
};

export default function TabsLayout() {
  const { usuario } = useAuth()
  const { familia, carregandoFamilia } = useFamilia()

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <View style={styles.layoutHeader}>
          <View style={styles.pagesHeader}>
            <LogoSvg
              width={140}
              height={60}
              style={styles.headerLogo} />
          </View>
          <TouchableOpacity style={styles.layoutHeaderUserContainer} onPress={() => router.push('/perfil')}>
            <Image
              placeholder={require('@/assets/images/user.png')}
              cachePolicy={"memory-disk"}
              style={styles.layoutHeaderUser}
              source={{ uri: usuario?.picture }} />
          </TouchableOpacity>
        </View>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarPosition: 'top',
            tabBarStyle: {
              backgroundColor: '#F2F0EF',
              height: 110
            },
          }}
          tabBar={({ state, descriptors, navigation }) =>
            <>
              <Text style={styles.navLabel}>Família</Text>
              {
                carregandoFamilia
                  ? <TextSkeleton style={{ maxHeight: 36, maxWidth: '70%' }} />
                  : <Text style={styles.navFamilia}>{familia?.nome}</Text>
              }
              <View style={styles.menulist}>
                {
                  state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    const onPress = () => {
                      const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                      });

                      if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                      }
                    };

                    return (
                      <TouchableOpacity
                        key={route.key}
                        style={styles.menu}
                        onPress={onPress}>
                        <>
                          <View style={[styles.menuIconContainer, { backgroundColor: options.tabBarActiveBackgroundColor }]}>
                            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: '#FFFFFF', size: 50 })}
                          </View>
                          <Text style={styles.menuLabel}>
                            {options.tabBarLabel as string}
                          </Text>
                        </>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
              <View style={styles.pagesTitle}>
                <Text style={styles.pagesTitleLabel}>
                  {descriptors[state.routes[state.index].key].options.tabBarLabel as string}
                </Text>
                <View style={styles.pagesBadges}>
                  {
                    state.routes.map((route, index) => {
                      const { options } = descriptors[route.key];
                      const isFocused = state.index === index;

                      return <PageBadgeView
                        key={route.key}
                        isFocused={isFocused ? 1 : 0}
                        style={StyleSheet.flatten([
                          styles.pagesBadge,
                          { backgroundColor: options.tabBarActiveBackgroundColor }
                        ])} />;
                    })
                  }
                </View>
              </View>
            </>}>
          <Tabs.Screen name="index" options={{
            tabBarLabel: 'Crianças',
            tabBarActiveBackgroundColor: '#F1C61C',
            tabBarIcon: () => (
              <BebeSvg
                style={styles.menuIcon} />
            ),
          }} />
          <Tabs.Screen name="responsaveis" options={{
            tabBarLabel: 'Responsáveis',
            tabBarActiveBackgroundColor: '#883CD5',
            tabBarIcon: () => (
              <ResponsaveisSvg
                style={styles.menuIcon} />
            ),
          }} />
          <Tabs.Screen name="tios" options={{
            tabBarLabel: 'Tios',
            tabBarActiveBackgroundColor: '#F8282C',
            tabBarIcon: () => (
              <TiosSvg
                style={styles.menuIcon} />
            ),
          }} />
          <Tabs.Screen name="notificacoes" options={{
            tabBarLabel: 'Notificações',
            tabBarActiveBackgroundColor: '#0178E1',
            tabBarIcon: () => (
              <NotificacoesSvg
                style={styles.menuIcon} />
            ),
          }} />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}