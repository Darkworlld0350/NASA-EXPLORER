import React, { useEffect } from "react";
import { FlatList, Image, Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpicImages } from "../../store/epicSlice";
import { RootState, AppDispatch } from "../../store/store";
import Animated, { BounceIn } from "react-native-reanimated";

const EpicScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.epic
  );

  useEffect(() => {
    dispatch(fetchEpicImages());
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Animated.View
          entering={BounceIn.duration(500)}
          style={{ padding: 10 }}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "100%", height: 250, borderRadius: 8 }}
            resizeMode="cover"
          />
          <Text style={{ fontWeight: "bold" }}>{item.caption}</Text>
          <Text>{item.date}</Text>
        </Animated.View>
      )}
    />
  );
};

export default EpicScreen;
