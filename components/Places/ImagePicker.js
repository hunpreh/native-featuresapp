import { useState } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { PermissionStatus } from "expo-image-picker";

import { colors } from "../../colors/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onImageTaken }) => {
  const [img, setImg] = useState();
  const [permission, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (permission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }
    if (permission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissionst to use this App."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setImg(image.assets[0].uri);
      onImageTaken(image.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (img) imagePreview = <Image style={styles.image} source={{ uri: img }} />;

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon={"camera"} onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
