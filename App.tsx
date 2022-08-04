import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { Loading } from './components/Loading';
import { AuthProvider } from './contexts/Auth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Router } from './routes/Router';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return (<ActivityIndicator color= {colorScheme==='dark'?'white':'black'} animating={true} size='small'/>)
  } else {
    return (
      <RecoilRoot>
        <AuthProvider>

          <Suspense fallback={<ActivityIndicator color= {colorScheme==='dark'?'white':'black'} animating={true} size='small'/>}>
            <SafeAreaProvider>
              <Router />
              <StatusBar />
            </SafeAreaProvider>
          </Suspense>
        </AuthProvider>
      </RecoilRoot>
    );
  }
}
