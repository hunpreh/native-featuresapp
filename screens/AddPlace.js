import { StyleSheet } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = ({ navigation }) => {
  function onAdd(place) {
    navigation.navigate("AllPlaces", { place });
  }
  
  return <PlaceForm onSave={onAdd} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
