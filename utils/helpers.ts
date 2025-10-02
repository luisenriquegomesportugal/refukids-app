import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { Alert, Linking, Platform } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import { Endereco } from "./schema";

export const capitalizeWords = (palavra?: string) => palavra!.toLocaleLowerCase('pt-BR')
  .replace(/(^|\s)\S/g, l => l.toLocaleUpperCase('pt-BR'));

export const onlyNumbers = (palavra?: string) => palavra!.replaceAll(/[^\d]+/g, '');

export const formatTelefone = (telefone: string) => telefone.replaceAll(/(\d{2})(\d{4,5})(\d{4})/g, "($1) $2-$3")

export const formatEndereco = (endereco: Endereco) => `${endereco.endereco} ${endereco.numero}, ${endereco.complemento ? `${endereco.complemento}, ` : ''}${endereco.bairro} - ${endereco.cep}, ${endereco.cidade}`

// Date regex
export const DateValidator = new RegExp('(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))');

// Função para abrir telefone, e-mail ou mapas
export function useAbrirInfoExterna() {
  const { showActionSheetWithOptions } = useActionSheet();

  async function abrirInfoExterna(
    tipo: "telefone" | "email" | "mapa",
    valor: string
  ) {
    switch (tipo) {
      case "telefone":
        await abrirTelefone(valor);
        return;

      case "email":
        await abrirEmail(valor);
        return;

      case "mapa":
        await abrirMapa(valor);
        return;
    }
  }

  // ---------------- TELEFONE + WHATSAPP ----------------
  async function abrirTelefone(numero: string) {
    const numeroLimpo = numero.replace(/\D/g, ""); // só dígitos

    showActionSheetWithOptions(
      {
        title: "Como quer prosseguir?",
        options: ["Telefone", "WhatsApp", "Cancelar"],
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // Telefonar → abre direto o discador
          const url = `tel:${numeroLimpo}`;
          Linking.openURL(url).catch(() =>
            Alert.alert("Erro", "Não foi possível abrir o telefone.")
          );
        } else if (buttonIndex === 1) {
          // WhatsApp → precisa ter o app instalado
          const url = `https://wa.me?phone=${numeroLimpo}`;
          const suportado = await Linking.canOpenURL(url);
          if (suportado) {
            Linking.openURL(url);
          } else {
            Alert.alert(
              "WhatsApp não encontrado",
              "O aplicativo não está instalado."
            );
          }
        }
      }
    );
  }

  // ---------------- EMAIL ----------------
  async function abrirEmail(email: string) {
    const url = `mailto:${email}`;
    try {
      const suportado = await Linking.canOpenURL(url);
      if (suportado) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail.");
      }
    } catch (err) {
      console.error("Erro ao abrir email:", err);
    }
  }

  // ---------------- MAPA ----------------
  async function abrirMapa(valor: string) {
    const ehCoordenada = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(valor);
    const endereco = encodeURIComponent(valor);

    let lat = "";
    let lng = "";
    if (ehCoordenada) [lat, lng] = valor.split(",");

    const urls: Record<string, string> = {
      "Google Maps": ehCoordenada
        ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
        : `https://www.google.com/maps/search/?api=1&query=${endereco}`,
      "Apple Maps": ehCoordenada
        ? `http://maps.apple.com/?ll=${lat},${lng}`
        : `http://maps.apple.com/?q=${endereco}`,
      Waze: ehCoordenada
        ? `waze://?ll=${lat},${lng}&navigate=yes`
        : `waze://?q=${endereco}&navigate=yes`,
      Uber: ehCoordenada
        ? `uber://?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`
        : `uber://?action=setPickup&dropoff[formatted_address]=${endereco}`,
      "99": ehCoordenada
        ? `ninety9://open?pickup=my_location&destination_lat=${lat}&destination_lng=${lng}`
        : `ninety9://open?pickup=my_location&destination_address=${endereco}`,
    };

    const disponiveis: { nome: string; url: string }[] = [];
    for (const [nome, link] of Object.entries(urls)) {
      if (await Linking.canOpenURL(link)) disponiveis.push({ nome, url: link });
    }

    if (disponiveis.length === 0) {
      // fallback web
      await Linking.openURL(
        ehCoordenada
          ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
          : `https://www.google.com/maps/search/?api=1&query=${endereco}`
      );
      return;
    }

    showActionSheetWithOptions(
      {
        title: "Como quer prosseguir?",
        options: [...disponiveis.map((d) => d.nome), "Cancelar"],
        cancelButtonIndex: disponiveis.length,
      },
      (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex < disponiveis.length) {
          Linking.openURL(disponiveis[buttonIndex].url);
        }
      }
    );
  }

  return { abrirInfoExterna };
}

//Calc Idade
export const calcularIdadeCompleta = (dataNascimento: string): string => {
  const nascimento = moment(dataNascimento);
  const hoje = moment();

  const anos = hoje.diff(nascimento, "years");
  nascimento.add(anos, "years");

  const meses = hoje.diff(nascimento, "months");

  if (anos === 0 && meses === 0) return "0 meses"; // recém-nascido

  if (meses === 0) {
    return `${anos} ano${anos > 1 ? "s" : ""}`;
  }

  if (anos === 0) {
    return `${meses} mes${meses > 1 ? "es" : ""}`;
  }

  return `${anos} ano${anos > 1 ? "s" : ""} e ${meses} mes${meses > 1 ? "es" : ""}`;

}


// CEP
type BuscarCep = {
  logradouro: string,
  bairro: string,
  localidade: string,
  complemento: string,
  erro?: string
}

export const buscarEndereco = async (cep: string, setValue: UseFormSetValue<any>, clearErrors: UseFormClearErrors<any>) => {
  if (!cep) {
    return;
  }

  if (cep.length < 8) {
    Alert.alert("Falha", "O Campo CEP precisa ter 8 digitos");
    return;
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json() as BuscarCep;
  if (data.erro) {
    Alert.alert("Falha", "CEP inválido");
    return;
  }

  setValue('endereco', data.logradouro);
  clearErrors('endereco')

  setValue('bairro', data.bairro);
  clearErrors('bairro')

  setValue('cidade', data.localidade);
  clearErrors('cidade')

  setValue('complemento', data.complemento);
  clearErrors('complemento')
}

//Notificacoes
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      throw e
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}