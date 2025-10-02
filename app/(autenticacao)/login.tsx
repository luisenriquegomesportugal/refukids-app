import LogoSvg from "@/assets/images/logo.svg";
import LoginForm from "@/components/forms/autenticacao/login";
import { styles } from "@/utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { OnboardFlow } from "react-native-onboard";

export default function Login() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Erro ao acessar AsyncStorage', error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return <View style={styles.containerActivityIndicator}>
      <ActivityIndicator size={"large"} />
    </View>;
  }

  if (isFirstLaunch) {
    return <OnboardFlow
      type={'fullscreen'}
      primaryButtonStyle={{
        backgroundColor: "#883CD5"
      }}
      pages={[
        {
          title: 'Bem vindo ao aplicativo da Refukids',
          imageUri: Image.resolveAssetSource(require('@/assets/images/icon.png')).uri,
          primaryButtonTitle: "Próximo"
        },
        {
          title: 'Crianças',
          subtitle: 'Aqui você cadastra seus filhos para que tenham acesso às salinhas da Refukids em todos os cultos',
          imageUri: Image.resolveAssetSource(require('@/assets/images/onboarding/criancas.png')).uri,
          primaryButtonTitle: "Próximo"
        },
        {
          title: 'Responsáveis',
          subtitle: 'Aqui você cadastra os responsáveis, apenas eles poderão fazer o check-in e levar a criança para a salinha',
          imageUri: Image.resolveAssetSource(require('@/assets/images/onboarding/responsaveis.png')).uri,
          primaryButtonTitle: "Próximo"
        },
        {
          title: 'Tios',
          subtitle: 'Aqui você cadastrar os tios, que são pessoas autorizadas a buscar a criança no final do culto',
          imageUri: Image.resolveAssetSource(require('@/assets/images/onboarding/tios.png')).uri,
          primaryButtonTitle: "Próximo"
        },
        {
          title: 'Check-in',
          subtitle: 'Agora o check-in do seu filho é feito em uma de nossas impressoras: aperte o botão de check-in, aponte para o QR Code da impressora, imprima a etiqueta e leve até a salinha',
          imageUri: Image.resolveAssetSource(require('@/assets/images/onboarding/checkin.png')).uri,
          primaryButtonTitle: "Próximo"
        },
        {
          title: 'Tudo certo',
          subtitle: 'Vamos iniciar essa nova experiencia',
          imageUri: Image.resolveAssetSource(require('@/assets/images/onboarding/tudocerto.png')).uri,
          primaryButtonTitle: "Vamos lá"
        }
      ]}
    />;
  }

  return <View style={styles.full}>
    <View style={styles.pagesContainer}>
      <View style={styles.pagesHeader}>
        <LogoSvg
          width={140}
          height={60}
          style={styles.headerLogo} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Login
        </Text>
        <Text style={styles.headerDescription}>
          Digite suas credenciais para acessar seus dados.
        </Text>
      </View>
      <LoginForm />
    </View>
  </View>
}
