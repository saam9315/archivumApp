/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: undefined;
  Home: undefined;
  FileUploadScreen: ContainerProps | undefined;
  KeyParameterInputScreen: Container | undefined;
  EntitiesTableScreen: Container | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  GroupsScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface Group {
  name: string;
  users: User[];
  owners?: User[];
}

export interface KeyParameter {
  name: string;
  type: string;
  values?: string[];
}

export interface ContainerParameters {
  containerParameters: KeyParameter[];
}

export interface Container {
  apiKey?: string;
  archivalDuration?: string; // pattern: ^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?$
  connectors?: ContainerConnector[];
  description: string;
  displayName: string;
  indexingProperties?: Array<{}>;
  creationDateTime?: string;
  mediaType?: string;
  name: string;
  owner?: string[];
  ownerGroups?: Array<{}>;
  requiredParameters?: Array<{}>;
  retentionDuration?: string; // pattern: ^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?$
  rules?: Rule[];
  userGroups?: Array<Group>;
  bulkActionEnabled: boolean;
}

export interface ContainerList {
  containers: Array<Container>;
}

export type ContainerProps = {
  container: Container;
};

export type ContainerConnector = {
  id: string;
  name: string;
  description: string;
  source: string;
  syncPeriod: string;
  connectionId: string;
  connectionActive: boolean;
};

export type Rule = {
  subjectId: string;
  subjectType: string;
  subjectDisplay: string;
  restrictions: Restriction[];
};

export interface Condition {
  [key: string]: [];
}

export type PermissionType = "READ" | "WRITE";

export interface Restriction {
  condition: Condition | {};
  permissions: PermissionType[];
}

export interface file {
  cancelled?: boolean;
  height?: number;
  base64?: string;
  type?: string;
  uri: string;
  width?: number;
}
