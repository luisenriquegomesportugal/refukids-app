import { useApi } from '@/hooks/useApi';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";

const abrirCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        base64: true,
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1]
    });

    if (result.canceled) {
        return;
    }

    return result.assets[0];
};

const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1]
    });

    if (result.canceled) {
        return;
    }

    return result.assets[0];
};

export const escolherImagemUpload = async (): Promise<ImagePicker.ImagePickerAsset> => {
    return new Promise<ImagePicker.ImagePickerAsset>((resolve, reject) => {
        Alert.alert(
            'Selecionar imagem',
            'Escolha uma opção:',
            [
                {
                    text: 'Tirar foto',
                    onPress: async () => {
                        const uri = await abrirCamera();
                        resolve(uri!)
                    }
                },
                {
                    text: 'Escolher da galeria',
                    onPress: async () => {
                        const uri = await abrirGaleria();
                        resolve(uri!)
                    }
                },
                { text: 'Cancelar', style: 'cancel' },
            ],
            { cancelable: true }
        );
    })
};

export const requerirPermissao = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permita acesso à câmera e galeria para continuar.');
    }
}

export const enviarImagem = async (image: ImagePicker.ImagePickerAsset) => {
    const client = useApi()

    try {
        const data = await client<{ downloadUrl: string }, { error: string }>('arquivosPost', {
            body: JSON.stringify({
                arquivo: image.fileName,
                formato: image.mimeType,
                conteudo: image.base64,
            })
        })

        return data.downloadUrl;
    } catch (error) {
        Alert.alert("Falha ao salvar a foto", `Erro ao enviar imagem (${error})`);

        return null;
    }
};