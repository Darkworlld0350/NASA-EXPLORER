import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarsWeather } from "../../store/marsWeatherSlice";
import { AppDispatch, RootState } from "../../store/store";
import Animated, { FadeInDown } from "react-native-reanimated";

const MarsWeatherScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.marsWeather
  );

  useEffect(() => {
    dispatch(fetchMarsWeather());
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return null;

  return (
    <Animated.View entering={FadeInDown.duration(500)} style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sol {data.sol}</Text>
      <Text>Fecha: {data.earthDate}</Text>
      <Text>Temp. Mínima: {data.minTemp}°C</Text>
      <Text>Temp. Máxima: {data.maxTemp}°C</Text>
      <Text>Presión: {data.pressure} Pa</Text>
      <Text>Estación: {data.season}</Text>
    </Animated.View>
  );
};

export default MarsWeatherScreen;
