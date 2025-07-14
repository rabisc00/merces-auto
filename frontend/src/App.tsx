import React, { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const loadFonts = async () => {
	await Ionicons.loadFont();
}

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		loadFonts().then(() => setFontsLoaded(true));
	});

    return (
        <AuthProvider>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </AuthProvider>
    );
};

