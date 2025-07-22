import React, { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppNavigator from './navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoadingProvider } from './context/LoadingContext';

const loadFonts = async () => {
	await Promise.all([
        MaterialCommunityIcons.loadFont(),
        Ionicons.loadFont()
    ]);
};

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		loadFonts().then(() => setFontsLoaded(true));
	});

    return (
        <PaperProvider>
            <LoadingProvider>
                <AuthProvider>
                    <SafeAreaProvider>
                        <AppNavigator />
                    </SafeAreaProvider>
                </AuthProvider>
            </LoadingProvider>
        </PaperProvider>
    );
};

