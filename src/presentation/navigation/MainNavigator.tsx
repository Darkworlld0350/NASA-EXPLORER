import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsteroidsScreen from '../screens/asteroids/AsteroidsScreen';
import MarsPhotosScreen from '../screens/mars/MarsPhotosScreen';
import HomeScreen from '../../ui/screens/search/HomeScreen';
import MarsWeatherScreen from '../screens/mars/MarsWeatherScreen';
import EpicScreen from '../screens/epic/EpicScreen';
import ImageSearchScreen from '../screens/search/ImageSearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="APOD" component={HomeScreen} />
    <Tab.Screen name="CLIMA" component={MarsWeatherScreen} />
    <Tab.Screen name="ASTEROIDES" component={AsteroidsScreen} />
    <Tab.Screen name="MARTE" component={MarsPhotosScreen} />
    <Tab.Screen name="TIERRA" component={EpicScreen} />
    <Tab.Screen name="Buscar Imágenes" component={ImageSearchScreen} />
  </Tab.Navigator>
)

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }} // Oculta header del Stack sobre las tabs
      />
      {/* Aquí puedes agregar más pantallas si necesitas navegación fuera de las tabs */}
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
