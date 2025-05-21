import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsteroids } from '../../store/asteroidsSlice';
import { RootState, AppDispatch } from '../../store/store';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import dayjs from 'dayjs';

const AsteroidsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.asteroids);

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    dispatch(fetchAsteroids({ start: today, end: tomorrow }));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
      <Animated.View entering={FadeInLeft.duration(500)} style={{ marginBottom: 10, backgroundColor: '#eee', padding: 10, borderRadius: 8 }}>
          <Text>{item.name}</Text>
          <Text> {item.date}</Text>
          <Text>Velocidad: {item.speedKph} km/h</Text>
          <Text>Distancia: {item.missDistanceKm} km</Text>
          <Text>Peligroso: {item.isHazardous ? 'SI' : 'NO'}</Text>
        </Animated.View>
      )}
    />
  );
};

export default AsteroidsScreen;
