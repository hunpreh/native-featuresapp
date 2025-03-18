import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {
  const focused = useIsFocused();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (focused && route.params) {
      if (places.findIndex((p) => p.id === route.params.place.id) === -1)
        setPlaces((current) => [...current, route.params.place]);
    }
  }, [focused, route]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
