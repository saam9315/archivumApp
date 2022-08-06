import React from 'react';
import { View, ActivityIndicator, useColorScheme } from 'react-native';

export const Loading = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colorScheme === 'dark' ? "#161f28" : "white"
      }}>
      <ActivityIndicator color={'#000'} animating={true} size='small' />
    </View>
  );
};
