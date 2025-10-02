import LogoSvg from "@/assets/images/logo";
import { styles } from "@/utils/styles";
import { Feather } from "@expo/vector-icons";
import { BarcodeScanningResult, Camera, CameraView, PermissionStatus } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Checkin() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);

    setTimeout(() => router.back(), 3000);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
        Checkin da Criança
      </Text>
      <Text style={styles.headerDescription}>
        Aponte a câmera para o QR Code da impressora para gerar a etiqueta, cole-a na criança e encaminhe-a para a sala indicada.
      </Text>
    </View>
    {
      scanned
        ? <View style={styles.containerActivityIndicator}>
          <ActivityIndicator size={"large"} />
          <Text style={styles.headerDescription}>
            Imprimindo
          </Text>
        </View>
        : <View style={styles.full}>
          <CameraView
            flash="auto"
            facing="back"
            mode="picture"
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        </View>
    }
  </View>
}
