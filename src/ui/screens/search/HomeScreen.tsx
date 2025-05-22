import React from 'react';
import { Text, ScrollView, ActivityIndicator, useWindowDimensions, View, StyleSheet } from 'react-native';
import { useHomeViewModel } from '../../../ui/screens/home/HomeViewModel';
import Animated, { BounceIn, Layout, } from 'react-native-reanimated';

const HomeScreen = () => {
  const { data, loading, error } = useHomeViewModel();
  useWindowDimensions();

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return null;

  return (
  <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{data.title}</Text>

        {data.mediaType === "image" && (
          <Animated.Image
            entering={BounceIn.duration(500)}
            layout={Layout.springify()}
            source={{ uri: data.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={styles.description}>{data.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#ccc",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default HomeScreen;
