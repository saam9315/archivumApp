import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { Loading } from './components/Loading';
import { AuthProvider } from './contexts/Auth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Router } from './routes/Router';

export default function App() {
  const isLoadingComplete = useCachedResources();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <AuthProvider>

          <Suspense fallback={<Loading></Loading>}>
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
