import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import { BusRouteCreate } from "../types/busRoute";
import { useLoading } from "../context/LoadingContext";
import { useNavigation } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp } from "../types/navigation";
import { registerBusRoute } from "../services/busRouteService";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import { busRouteCreateSchema } from "../validations/busRouteSchema";

export default function BusRouteRegistration() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();

    const callRegisterBusRoute = async (values: BusRouteCreate) => {
        showLoading();
        const registrationValid = await registerBusRoute(values, userToken);
        if (registrationValid) {
            navigation.navigate('BusRoutesList');
        }
        hideLoading();
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <Formik<BusRouteCreate>
                initialValues={{ lineNumber: '', origin: '', destination: '' }}
                validationSchema={busRouteCreateSchema}
                onSubmit={callRegisterBusRoute}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched
                }) => (
                    <View style={globalStyles.mainContainer}>
                        <InputField
                            label="Line Number"
                            errorMessage={touched.lineNumber && errors.lineNumber}
                            required={true}
                            value={values.lineNumber}
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
                            title="Register"
                            onPress={() => handleSubmit()}
                        />
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
};