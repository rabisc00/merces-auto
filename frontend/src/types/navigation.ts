import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TabParamList = {
    Home: undefined;
    AddList: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  UserRegistration: undefined;
};

export type AddListStackParamList = {
  AddListMain: undefined;
  UserRegistration: undefined;
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
export type AddListNavigationProp = NativeStackNavigationProp<AddListStackParamList, 'AddListMain'>;