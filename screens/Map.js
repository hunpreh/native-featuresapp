import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

const region = {
  latitude: 20.6406,
  longitude: -103.3163,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(false);

  function selectLocation({ nativeEvent }) {
    setLocation({
      lat: nativeEvent.coordinate.latitude,
      lng: nativeEvent.coordinate.longitude,
    });
  }

  const saveLocation = useCallback(() => {
    if (!location) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (tap on map)"
      );
      return;
    }

    navigation.navigate("AddPlace", { location });
  }, [navigation, location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          size={24}
          icon={"save"}
          onPress={saveLocation}
        />
      ),
    });
  }, [navigation, saveLocation]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocation}>
      {location && (
        <Marker
          title="Picked Location"
          coordinate={{ latitude: location.lat, longitude: location.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
