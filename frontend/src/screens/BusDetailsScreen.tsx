import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusesOptionsNavigationProp, BusStackParamList } from "../types/navigation";
import { BusDetails, BusUpdate } from "../types/bus";
import { useEffect, useState } from "react";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { busUpdateSchema } from "../validations/busSchema";
import { showNoChangesAlert } from "../utils/alerts";
import { getBusDetails, saveBusChanges } from "../services/busService";
import InputField from "../components/InputField";
import { Checkbox } from "react-native-paper";
import Timestamps from "../components/Timestamps";

type BusDetailsRouteProp = RouteProp<BusStackParamList, 'BusDetails'>;

export default function BusDetailsScreen() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigation = useNavigation<BusesOptionsNavigationProp>();
    const route = useRoute<BusDetailsRouteProp>();

    const { busId } = route.params;
    const [originalBus, setOriginalBus] = useState<BusDetails | null>(null);

    useEffect(() => { 
        const fetchBusDetails = async () => {
            const data = await getBusDetails(busId, userToken);
            setOriginalBus(data);
        }

        showLoading();
        fetchBusDetails();
        hideLoading();
    }, [busId]);

    const callSaveChanges = async (values: BusUpdate) => {
        showLoading();
        
        if (
            values.busNumber === originalBus?.busNumber &&
            values.model === originalBus?.model &&
            values.manufacturingYear === originalBus?.manufacturingYear &&
            values.capacity === originalBus?.capacity &&
            values.inRepair === originalBus?.inRepair
        ) {
            showNoChangesAlert();
        } else {
            const validRequest = await saveBusChanges(busId, values, userToken);
            if (validRequest) navigation.navigate('BusesList');
        }

        hideLoading();
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            {
                originalBus ?
                    <Formik
                        initialValues={{ 
                            busNumber: originalBus.busNumber,
                            model: originalBus.model, 
                            capacity: originalBus.capacity, 
                            manufacturingYear: originalBus.manufacturingYear, 
                            inRepair: originalBus.inRepair
                        }}
                        validationSchema={busUpdateSchema}
                        onSubmit={callSaveChanges}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            values,
                            errors,
                            touched
                        }) => (
                                <View style={globalStyles.editContainer}>
                                    <InputField
                                        label="Bus Number"
                                        errorMessage={touched.busNumber && errors.busNumber}
                                        required={true}
                                        value={values.busNumber}
                                        onChangeText={handleChange('busNumber')}
                                    />
                                    <InputField
                                        label="Model"
                                        errorMessage={touched.model && errors.model}
                                        value={values.model || ''}
                                        onChangeText={handleChange('model')}
                                    />
                                    <View style={globalStyles.inputRow}>
                                        <InputField
                                            label="Capacity"
                                            errorMessage={touched.capacity && errors.capacity}
                                            isNumber={true}
                                            value={values.capacity?.toString()}
                                            width={'48%'}
                                            onChangeText={(text) => {
                                                const parsed = parseInt(text, 10);
                                                setFieldValue('capacity', isNaN(parsed) ? '' : parsed);
                                            }}
                                        />
                                        <InputField
                                            label="Manufacturing Year"
                                            errorMessage={touched.manufacturingYear && errors.manufacturingYear}
                                            isNumber={true}
                                            value={values.manufacturingYear?.toString()}
                                            width={'48%'}
                                            onChangeText={(text) => {
                                                const parsed = parseInt(text, 10);
                                                setFieldValue('manufacturingYear', isNaN(parsed) ? '' : parsed);
                                            }}
                                        />
                                    </View>
                                    <Checkbox.Item
                                        label="In Repair"
                                        status={values.inRepair ? 'checked' : 'unchecked'}
                                        onPress={() => setFieldValue('inRepair', !values.inRepair)}
                                        style={globalStyles.checkboxItem}
                                    />

                                    <Button 
                                        title="Save Changes"
                                        onPress={() => handleSubmit()}
                                    />

                                    <Timestamps
                                        createdAt={originalBus.createdAt}
                                        updatedAt={originalBus.updatedAt}
                                    />
                                </View>
                            )}
                    </Formik> :
                    <Text style={globalStyles.error}>Bus not found</Text>
            }
        </SafeAreaView>
    )
}