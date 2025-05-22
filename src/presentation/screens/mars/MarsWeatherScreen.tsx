import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
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

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;
  if (!data) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(500)}
        style={styles.card}
      >
        <Text style={styles.title}>Sol {data.sol}</Text>
        <Text style={styles.text}>Fecha: {data.earthDate}</Text>
        <Text style={styles.text}>Temp. Mínima: {data.minTemp}°C</Text>
        <Text style={styles.text}>Temp. Máxima: {data.maxTemp}°C</Text>
        <Text style={styles.text}>Presión: {data.pressure} Pa</Text>
        <Text style={styles.text}>Estación: {data.season}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 16,
  },
  loading: {
    marginTop: 40,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default MarsWeatherScreen;
