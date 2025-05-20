import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/presentation/store/store';
import MainNavigator from './src/presentation/navigation/MainNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
