import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsteroids } from '../../store/asteroidsSlice';
import { RootState, AppDispatch } from '../../store/store';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import dayjs from 'dayjs';

const AnimatedFlatList = Animated.FlatList<any>;

const AsteroidsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.asteroids);

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
    dispatch(fetchAsteroids({ start: today, end: tomorrow }));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <Text style={styles.title}>Asteroides Cercanos</Text>
      <AnimatedFlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInLeft.duration(500).delay(index * 100)}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.text}>Fecha: {item.date}</Text>
            <Text style={styles.text}>Velocidad: {item.speedKph} km/h</Text>
            <Text style={styles.text}>Distancia: {item.missDistanceKm} km</Text>
            <Text style={styles.text}>
              Peligroso: <Text style={{ fontWeight: 'bold' }}>{item.isHazardous ? 'Sí' : 'No'}</Text>
            </Text>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { marginTop: 30 },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default AsteroidsScreen;
