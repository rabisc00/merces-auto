import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TabParamList = {
    BusRoutes: undefined;
    WorkingHours: undefined;
    Buses: undefined;
    Users: undefined;
    Trips: undefined;
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
  UserTripsList: { id: string };
  UserTripRegistration: { id: string };
  UserTripDetails: { tripId: string };
  UserWorkingHoursList: { id: string };
  UserWorkingHoursRegistration: { id: string };
  UserWorkingHoursDetails: { workingHoursId: string };
};

export type BusStackParamList = {
  BusesList: undefined;
  BusRegistration: undefined;
  BusDetails: { busId: string };
  BusTripsList: { id: string };
  BusTripRegistration: { id: string };
  BusTripDetails: { tripId: string }
};

export type BusRouteStackParamList = {
  BusRoutesList: undefined;
  BusRouteRegistration: undefined;
  BusRouteDetails: { 
    busRouteId: string,
  };
  TimetableCalendar: { 
    busRouteId: string 
  };
  TimetableDetails: { 
    timetableId: string 
  };
  TimetableList: { 
    busRouteId: string, 
    date: string
  },
  TimetableRegistration: {
    busRouteId: string
  };
};

export type WorkingHoursStackParamList = {
  WorkingHoursList: undefined;
  WorkingHoursRegistration: undefined;
  WorkingHoursDetails: {
    workingHoursId: string
  };
};

export type TripStackParamList = {
  TripsList: undefined;
  TripsRegistration: { id: string };
  TripDetails: { tripId: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
export type UsersOptionsNavigationProp = NativeStackNavigationProp<UsersStackParamList, 'UsersList'>;
export type BusesOptionsNavigationProp = NativeStackNavigationProp<BusStackParamList, 'BusesList'>;
export type BusRoutesOptionsNavigationProp = NativeStackNavigationProp<BusRouteStackParamList, 'BusRoutesList'>;
export type WorkingHoursOptionsNavigationProp = NativeStackNavigationProp<WorkingHoursStackParamList, 'WorkingHoursList'>;
export type TripsOptionsNavigationProp = NativeStackNavigationProp<TripStackParamList, 'TripsList'>;