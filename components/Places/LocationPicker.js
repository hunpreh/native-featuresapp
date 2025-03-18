import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { getMapPreview } from "../../util/location";
import { colors } from "../../colors/colors";

import OutlinedButton from "../UI/OutlinedButton";

const LocationPicker = ({ onLocationPick }) => {
  const focused = useIsFocused();
  const nav = useNavigation();
  const route = useRoute();
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [load, setLoad] = useState(false);
  const [permission, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    if (focused && route.params) {
      const location = route.params && {
        lat: route.params.location.lat,
        lng: route.params.location.lng,
      };
      setCoords(location);
      onLocationPick(location);
    }
  }, [route, focused]);

  async function verifyPermission() {
    if (permission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }
    if (permission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this App."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    setLoad(true);
    const location = await getCurrentPositionAsync();
    const data = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setCoords(data);
    onLocationPick(data);
    setLoad(false);
  }

  function pickOnMapHandler() {
    nav.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;
  if (load) locationPreview = <Text>Loading location...</Text>;
  if (coords.lat.length !== 0 && !load)
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(coords.lat, coords.lng) }}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
