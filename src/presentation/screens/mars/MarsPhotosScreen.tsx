import React, { useEffect } from "react";
import { FlatList, Image, Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarsPhotos } from "../../store/marsPhotosSlice";
import { AppDispatch, RootState } from "../../store/store";
import Animated, { FadeInUp } from "react-native-reanimated";

const MarsPhotosScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.marsPhotos
  );

  useEffect(() => {
    dispatch(fetchMarsPhotos(1000)); // Día marciano "sol" arbitrario
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={{ padding: 10 }}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Text>
            {item.roverName} - {item.cameraName}
          </Text>
          <Text>{item.earthDate}</Text>
        </Animated.View>
      )}
    />
  );
};

export default MarsPhotosScreen;
