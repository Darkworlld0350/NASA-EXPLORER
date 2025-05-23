import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MarsPhotosScreen from '../screens/mars/MarsPhotosScreen';
import ImageSearchScreen from '../screens/search/ImageSearchScreen';
import MarsWeatherScreen from '../screens/mars/MarsWeatherScreen';
import AsteroidsScreen from '../screens/asteroids/AsteroidsScreen';
import HomeScreen from '../../ui/screens/search/HomeScreen';
import EpicScreen from '../screens/epic/EpicScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'APOD':
              return <Ionicons name="planet" size={size} color={color} />;
            case 'MARTE':
              return <Ionicons name="camera" size={size} color={color} />;
            case 'TIERRA':
              return <Ionicons name="earth" size={size} color={color} />;
            case 'BUSCAR IMÁGENES':
              return <Ionicons name="search" size={size} color={color} />;
            case 'CLIMA':
              return <Ionicons name="cloudy-night" size={size} color={color} />;
            case 'ASTEROIDES':
              return <MaterialCommunityIcons name="meteor" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="APOD" component={HomeScreen} />
      <Tab.Screen name="MARTE" component={MarsPhotosScreen} />
      <Tab.Screen name="TIERRA" component={EpicScreen} />
      <Tab.Screen name="BUSCAR IMÁGENES" component={ImageSearchScreen} />
      <Tab.Screen name="CLIMA" component={MarsWeatherScreen} />
      <Tab.Screen name="ASTEROIDES" component={AsteroidsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
