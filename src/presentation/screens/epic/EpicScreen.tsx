import React, { useEffect } from "react";
import { Image, Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpicImages } from "../../store/epicSlice";
import { RootState, AppDispatch } from "../../store/store";
import Animated, { BounceIn, Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { StyleSheet } from 'react-native';

const AnimatedFlatList = Animated.FlatList<any>;

const EpicScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.epic
  );

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 150],
            [0, -30],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    dispatch(fetchEpicImages());
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <Animated.Text style={[styles.title, headerStyle]}>
        Fotos Planeta Tierra
      </Animated.Text>

      <AnimatedFlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={BounceIn.duration(500).delay(index * 100)}
            style={styles.card}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{item.caption}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 30,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 6,
  color: "#333",
},
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
  date: {
    color: "#555",
    fontSize: 14,
  },
});

export default EpicScreen;