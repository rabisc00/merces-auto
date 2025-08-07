import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { BusRouteDetails, BusRouteUpdate } from "../types/busRoute";
import { getBusRouteDetails, saveBusRouteChanges } from "../services/busRouteService";
import { showNoChangesAlert } from "../utils/alerts";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { busRouteUpdateSchema } from "../validations/busRouteSchema";
import InputField from "../components/InputField";
import Timestamps from "../components/Timestamps";

type BusRouteRouteProp = RouteProp<BusRouteStackParamList, 'BusRouteDetails'>;

export default function BusRouteDetailsScreen() {
    const { userToken, isUserAdmin } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();
    const route = useRoute<BusRouteRouteProp>();

    const { busRouteId } = route.params;
    const [originalBusRoute, setOriginalBusRoute] = useState<BusRouteDetails | null>(null);

    useEffect(() => {
        const fetchBusRouteDetails = async () => {
            const data = await getBusRouteDetails(busRouteId, userToken);
            setOriginalBusRoute(data);
        };

        showLoading();
        fetchBusRouteDetails();
        hideLoading();
    }, [busRouteId]);

    const callSaveChanges = async (values: BusRouteUpdate) => {
        showLoading();
        
        if (
            originalBusRoute?.lineNumber === values.lineNumber &&
            originalBusRoute?.origin === values.origin &&
            originalBusRoute?.destination === values.destination
        ) {
            showNoChangesAlert();
        } else {
            const validRequest = await saveBusRouteChanges(values, busRouteId, userToken);
            if (validRequest) {
                navigation.navigate('BusRoutesList');
            }
        }

        hideLoading();
    };

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            {
                originalBusRoute ? 
                isUserAdmin ? 
                <Formik
                    initialValues={{ 
                        lineNumber: originalBusRoute.lineNumber,
                        origin: originalBusRoute.origin,
                        destination: originalBusRoute.destination
                    }}
                    validationSchema={busRouteUpdateSchema}
                    onSubmit={callSaveChanges}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched
                    }) => (
                        <View style={globalStyles.editContainer}>
                            <Text style={[globalStyles.boldText, { marginBottom: 20 }]}>Distance: {originalBusRoute.distanceInKm} Km | Duration: {originalBusRoute.averageTimeInMinutes} Minutes</Text>
                            <InputField
                                label="Line Number"
                                errorMessage={touched.lineNumber && errors.lineNumber}
                                value={values.lineNumber}
                                required={true}
                                onChangeText={handleChange('lineNumber')}
                            />
                            <InputField
                                label="Origin"
                                errorMessage={touched.origin && errors.origin}
                                required={true}
                                value={values.origin}
                                onChangeText={handleChange('origin')}
                            />
                            <InputField
                                label="Destination"
                                errorMessage={touched.destination && errors.destination}
                                required={true}
                                value={values.destination}
                                onChangeText={handleChange('destination')}
                            />

                            <Button
                                title="Save Changes"
                                onPress={() => handleSubmit()}
                            />

                            <Timestamps
                                createdAt={originalBusRoute.createdAt}
                                updatedAt={originalBusRoute.updatedAt}
                            />
                        </View>
                    )}
                    </Formik> :
                    <View style={globalStyles.mainContainer}>
                        <Text>Distance: {originalBusRoute.distanceInKm}</Text>
                        <Text>Duration: {originalBusRoute.averageTimeInMinutes}</Text>
                        <Text>Line Number: {originalBusRoute.lineNumber}</Text>
                        <Text>Origin: {originalBusRoute.origin}</Text>
                        <Text>Destination: {originalBusRoute.destination}</Text>
                    </View> :
                <Text style={globalStyles.error}>Bus route not found</Text>
            }
        </SafeAreaView>
    )
}