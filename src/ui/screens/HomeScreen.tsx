import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useHomeViewModel } from '../../ui/screens/home/HomeViewModel';

const HomeScreen = () => {
  const { data, loading, error } = useHomeViewModel();

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return null;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.title}</Text>
      {data.mediaType === 'image' && (
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: '100%', height: 300, marginVertical: 16 }}
          resizeMode="cover"
        />
      )}
      <Text>{data.description}</Text>
    </ScrollView>
  );
};

export default HomeScreen;
