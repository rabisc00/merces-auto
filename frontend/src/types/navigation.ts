import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TabParamList = {
    Home: undefined;
    TableOptions: undefined;
    WorkedHours: undefined;
    Calendar: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SearchOverlay: undefined;
};

export type TableOptionsStackParamList = {
  TableOptionsMain: undefined;
  UsersList: undefined;
  UserDetails: { userId: string };
  UserRegistration: undefined;
  BusRegistration: undefined;
  BusRouteRegistration: undefined;
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
export type TableOptionsNavigationProp = NativeStackNavigationProp<TableOptionsStackParamList, 'TableOptionsMain'>;