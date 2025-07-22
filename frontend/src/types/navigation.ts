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
};

export type TableOptionsStackParamList = {
  TableOptionsMain: undefined;
  DriversList: undefined;
  DriverDetails: { driverId: string };
  DriverRegistration: undefined;
  BusRegistration: undefined;
  BusRouteRegistration: undefined;
  TimetableRegistration: undefined;
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
export type TableOptionsNavigationProp = NativeStackNavigationProp<TableOptionsStackParamList, 'TableOptionsMain'>;