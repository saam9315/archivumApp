import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
//import { AuthData, authService } from '../services/authService';
import { TokenResponseConfig, useAutoDiscovery, TokenType, RefreshTokenRequestConfig, RevokeTokenRequestConfig, TokenRequestConfig, TokenResponse } from 'expo-auth-session';
import { Alert } from 'react-native';

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
  authData?: AuthData;
  loading: boolean;
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

  let discovery = useAutoDiscovery(
    "https://login.microsoftonline.com/f2658745-f87e-4fb9-8ff6-6b616a8cec41/v2.0"
  );

  const [request, result, promptAsync] = AuthSession.useAuthRequest(config, discovery);

  const [authData, setAuthData] = useState<AuthData>();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);


  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('tokenObject');

      console.log("\n============================================= Token stored locally =============================================\n", authDataSerialized);


      if (authDataSerialized !== null) {

        const parsedToken: AuthSession.TokenResponse = JSON.parse(authDataSerialized);
        const tokenResConf = new TokenResponse(parsedToken);

        if (tokenResConf.shouldRefresh()) {
          try {
            const refreshConfig: RefreshTokenRequestConfig = { clientId: clientId, refreshToken: tokenResConf.refreshToken }
            const newToken = await AuthSession.refreshAsync(refreshConfig, { tokenEndpoint: discovery?.tokenEndpoint });

            console.log("\n============================================= Refreshed Token =============================================\n", newToken);

            setAuthData(newToken);
            AsyncStorage.setItem('tokenObject', JSON.stringify(newToken));
            setLoading(false);
            //Persist the data in the Async Storage
            //to be recovered in the next user session
          }

          catch (err: any) {
            Alert.alert("Error", err);
            setLoading(false);
          }
        }
        //If there are data, it's converted to an Object and the state is updated.
        setAuthData(parsedToken);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function signIn() {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    //
    //const _authData = await authService.signIn();
    const response = await promptAsync()

    if (response?.type === "success") {
      const code = response.params.code;
      console.log("============================================= Code =============================================\n", code);
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
            "============================================= Token Exchanged =============================================\n",
            responseToken
          );
          const authData: TokenResponseConfig = responseToken?.getRequestConfig();
          if (authData) {
            //Set the data in the context, so the App can be notified
            //and send the user to the AuthStack
            setAuthData(responseToken);
            //Persist the data in the Async Storage
            //to be recovered in the next user session.
            AsyncStorage.setItem('tokenObject', JSON.stringify(authData));
            setLoading(false);

          }
        } catch (err) {
          console.log(err);
        }
      }
    }

  };

  async function signOut() {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    try {
      const authDataSerialized = await AsyncStorage.getItem('tokenObject');

      if (authDataSerialized !== null) {
        const storedToken: TokenResponseConfig = JSON.parse(authDataSerialized);

        let revokeRequestConfig: RevokeTokenRequestConfig = { token: storedToken.accessToken };

        //If there are data, it's converted to an Object and the state is updated.

        const revokeResponse = await AuthSession.revokeAsync(revokeRequestConfig, { revocationEndpoint: discovery?.authorizationEndpoint });


        console.log("============================================= Revoke =============================================\n", revokeResponse);

        //Remove the data from Async Storage
        //to NOT be recoverede in next session.
        await AsyncStorage.removeItem('tokenObject');
        setAuthData(undefined);

        const isTokenDeleted = await AsyncStorage.getItem('tokenObject');
        console.log("============================================= Token Revoked =======================================\n Token stored locally = ", isTokenDeleted);
        //}

      }

    } catch (error) {
      console.log('ERROR', error)
    }

  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
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
