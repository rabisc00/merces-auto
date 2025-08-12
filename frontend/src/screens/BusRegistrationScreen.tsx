import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { useLoading } from "../context/LoadingContext";
import { registerBus } from "../services/busService";
import { BusCreate } from "../types/bus";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { BusesOptionsNavigationProp } from "../types/navigation";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { busCreateSchema } from "../validations/busSchema";
import InputField from "../components/InputField";

export default function BusRegistrationScreen() {
    const navigation = useNavigation<BusesOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken } = useAuth();

    const callRegisterBus = async (values: BusCreate) => {
        showLoading();

        const registrationValid = await registerBus(values, userToken);
        if (registrationValid) {
            navigation.navigate('BusesList');
        }

        hideLoading();
    };

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <Formik<BusCreate>
                initialValues={{ busNumber: '', model: '', capacity: undefined, manufacturingYear: undefined }}
                validationSchema={busCreateSchema}
                onSubmit={callRegisterBus}
            >
                {({
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    values,
                    errors,
                    touched
                }) => (
                    <View style={globalStyles.mainContainer}>
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
                            value={values.model}
                            onChangeText={handleChange('model')}
                        />
                        <View style={globalStyles.inputRow}>
                            <InputField
                                label="Capacity"
                                errorMessage={touched.capacity && errors.capacity}
                                isNumber={true}
                                value={values.capacity?.toString() ?? ''}
                                width={'45%'}
                                onChangeText={(value) => setFieldValue('capacity', value ? parseInt(value, 10) : undefined)}
                            />
                            <InputField
                                label="Manufacturing Year"
                                errorMessage={touched.manufacturingYear && errors.manufacturingYear}
                                isNumber={true}
                                value={values.manufacturingYear?.toString() ?? ''}
                                width={'45%'}
                                onChangeText={(value) => setFieldValue('manufacturingYear', value ? parseInt(value, 10) : undefined)}
                            />
                        </View>
                        <Button title="Register" onPress={() => handleSubmit()} />
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}