import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { colors } from "../../colors/colors";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { getAddress } from "../../util/location";

const PlaceForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  async function savePlace() {
    if (!image || !location) {
      Alert.alert("Incomplete information!", "Complete all the data");
      return;
    }

    const address = await getAddress(location.lat, location.lng);
    const id = new Date().toString() + Math.random().toString();
    onSave({ title, image, location, address, id });
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} />
        <ImagePicker onImageTaken={setImage} />
        <LocationPicker onLocationPick={setLocation} />
        <Button onPress={savePlace}>Add Place</Button>
      </View>
    </ScrollView>
  );
};
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: colors.primary100,
  },
});
