import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TabParamList = {
    BusRoutes: undefined;
    WorkedHours: undefined;
    Buses: undefined;
    Users: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SearchOverlay: undefined;
  UserDetails: { userId: string };
};

export type UsersStackParamList = {
  UsersList: undefined;
  UserRegistration: undefined;
  UserDetails: { userId: string };
};

export type BusStackParamList = {
  BusesList: undefined;
  BusRegistration: undefined;
  BusDetails: { busId: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
export type UsersOptionsNavigationProp = NativeStackNavigationProp<UsersStackParamList, 'UsersList'>;
export type BusesOptionsNavigationProp = NativeStackNavigationProp<BusStackParamList, 'BusesList'>;