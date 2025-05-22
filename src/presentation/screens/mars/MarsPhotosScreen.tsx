import React, { useEffect } from "react";
import { FlatList, Image, Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarsPhotos } from "../../store/marsPhotosSlice";
import { AppDispatch, RootState } from "../../store/store";
import Animated, { FadeInUp, useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate, } from "react-native-reanimated";
import { StyleSheet } from 'react-native'; // ✅ correcto


const MarsPhotosScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.marsPhotos
  );

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });


  useEffect(() => {
    dispatch(fetchMarsPhotos(1000)); // Día marciano "sol" arbitrario
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Animated.Text style={[styles.title]}>
        Fotos de Marte
      </Animated.Text>

      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeInUp.duration(400)}
            style={styles.cardContainer}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.text}>
                {item.roverName} - {item.cameraName}
              </Text>
              <Text style={styles.date}>{item.earthDate}</Text>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
  listContent: {
    padding: 12,
    paddingBottom: 60,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    padding: 14,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ccc",
  },
  text: {
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    color: "#666",
    fontSize: 12,
  },
});
export default MarsPhotosScreen;

