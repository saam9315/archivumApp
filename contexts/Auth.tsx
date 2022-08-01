import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
//import { AuthData, authService } from '../services/authService';
import { TokenResponseConfig, useAutoDiscovery, TokenType, RefreshTokenRequestConfig, RevokeTokenRequestConfig, TokenRequestConfig, TokenResponse } from 'expo-auth-session';
import { Alert } from 'react-native';
import { isLoadingAtom, userTokenAtom } from '../stores/Atoms';
import { useSetRecoilState } from 'recoil';

export type AuthData = {
  accessToken: string;
  tokenType?: TokenType;
  expiresIn?: number;
  refreshToken?: string;
  scope?: string;
  state?: string;
  idToken?: string;
  issuedAt?: number;
};

type AuthContextData = {
  signIn(): Promise<void>;
  signOut(): void;
};

const clientId = "69f454ab-2519-4656-841c-c8cce1183656";
const scope = ["api://3ebe89cf-5f90-4df5-afc4-f5dadae2c1a6/all", "offline_access"];
const callBackUrl = "msauth.org.reactjs.native.archivum://auth";

const config = {
  clientId: clientId,
  scopes: scope,
  redirectUri: callBackUrl,
  usePKCE: false,
  grant_type: "authorization_code",
};

WebBrowser.maybeCompleteAuthSession();


//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const setUserToken = useSetRecoilState<AuthData | undefined>(userTokenAtom);

  const discovery = useAutoDiscovery(
    "https://login.microsoftonline.com/f2658745-f87e-4fb9-8ff6-6b616a8cec41/v2.0"
  );


  const [request, result, promptAsync] = AuthSession.useAuthRequest(config, discovery);



  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);


  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('tokenObject');

      console.log("\n============================================= Token stored locally =============================================\n", authDataSerialized);


      if (authDataSerialized !== null) {

        const parsedToken = JSON.parse(authDataSerialized);
        const tokenResConf = new TokenResponse(parsedToken);

        console.log("\n============================================= Local Token should be refreshed =============================================\n", tokenResConf.shouldRefresh());

        if (tokenResConf.shouldRefresh()) {
          try {

            const refreshConfig: RefreshTokenRequestConfig = { clientId: clientId, refreshToken: tokenResConf.refreshToken }
            let newToken: AuthSession.TokenResponse;
            if (discovery) {
              newToken = await AuthSession.refreshAsync(refreshConfig, discovery);

              console.log("\n============================================= Refreshed Token =============================================\n", newToken);

              setUserToken(newToken);
              AsyncStorage.setItem('tokenObject', JSON.stringify(newToken));
              setIsLoading(false);
            }
            else {
              console.log("\n============================================= Discovery is null =============================================\n", discovery);
              setUserToken(undefined);
              setIsLoading(false);
            }
            //Persist the data in the Async Storage
            //to be recovered in the next user session
          }

          catch (err: any) {
            console.log(err)
            setUserToken(undefined);
            setIsLoading(false);

          }
        }
        else {
          setUserToken(tokenResConf);
          setIsLoading(false);
        }
        //If there are data, it's converted to an Object and the state is updated.

      }
      else {
        console.log("\n============================================= No Token stored locally =============================================\n");
        setUserToken(undefined);
        setIsLoading(false);
      }

    } catch (error) {
      console.log(error);
      setUserToken(undefined)
      setIsLoading(false);
    }
  }

  async function signIn() {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    const response = await promptAsync()

    if (response?.type === "success") {
      const code = response.params.code;
      //console.log("============================================= Code =============================================\n", code);
      if (code) {
        try {
          const accessTokenConfig = new AuthSession.AccessTokenRequest({
            clientId: clientId,
            code: code,
            redirectUri: callBackUrl,
            scopes: scope,
          });
          const responseToken = await AuthSession.exchangeCodeAsync(
            accessTokenConfig,
            { tokenEndpoint: discovery?.tokenEndpoint }
          );

          console.log(
            //"============================================= Token Exchanged =============================================\n",
            responseToken
          );
          const authData: TokenResponseConfig = responseToken?.getRequestConfig();


          console.log(
            "============================================= AuthData =============================================\n",
            authData
          );
          if (authData) {
            //Set the data in the context, so the App can be notified
            //and send the user to the AuthStack
            setUserToken(authData);
            //Persist the data in the Async Storage
            //to be recovered in the next user session.
            AsyncStorage.setItem('tokenObject', JSON.stringify(authData));
            setIsLoading(false);
            return;

          }
        } catch (err: any) {
          Alert.alert(err);
          setIsLoading(false);
        }
      }
      Alert.alert("Authentication error!");
      setUserToken(undefined)
      setIsLoading(false);
    }
    Alert.alert("Authentication error!");
    setUserToken(undefined)
    setIsLoading(false);

  };

  async function signOut() {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    try {
      const authDataSerialized = await AsyncStorage.getItem('tokenObject');

      if (authDataSerialized !== null) {
        const storedToken: TokenResponseConfig = JSON.parse(authDataSerialized);

        let revokeRequestConfig: RevokeTokenRequestConfig = { token: storedToken.accessToken };

        const revokeResponse = await AuthSession.revokeAsync(revokeRequestConfig, { revocationEndpoint: discovery?.authorizationEndpoint });


        console.log("============================================= Revoke =============================================\n", revokeResponse);

        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        await AsyncStorage.removeItem('tokenObject');
        setUserToken(undefined);
        const isTokenDeleted = await AsyncStorage.getItem('tokenObject');
        console.log("============================================= Token Revoked =======================================\n Token stored locally = ", isTokenDeleted);
        //}

      }

    } catch (error) {
      console.log('ERROR', error)
      setUserToken(undefined);
      setIsLoading(false);
    }

  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };


