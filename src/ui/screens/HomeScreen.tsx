import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useHomeViewModel } from '../../ui/screens/home/HomeViewModel';
import Animated, { BounceIn, Layout, } from 'react-native-reanimated';


const HomeScreen = () => {
  const { data, loading, error } = useHomeViewModel();
  const { width } = useWindowDimensions();

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return null;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.title}</Text>
      {data.mediaType === 'image' && (
        <Animated.Image
          entering={BounceIn.duration(500)}
          layout={Layout.springify()}
          source={{ uri: data.imageUrl }}
          style={{ width: '100%', height: 300, marginVertical: 1, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}
      <Text>{data.description}</Text>
    </ScrollView>
  );
};

export default HomeScreen;

