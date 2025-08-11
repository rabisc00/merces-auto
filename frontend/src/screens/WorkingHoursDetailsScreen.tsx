import { Button, Image, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { UsersOptionsNavigationProp, UsersStackParamList, WorkingHoursOptionsNavigationProp, WorkingHoursStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { WorkingHoursDetails, WorkingHoursUpdate } from "../types/workingHours";
import { getWorkingHoursDetails, saveWorkingHoursChanges } from "../services/workingHoursService";
import dayjs from "dayjs";
import { showNoChangesAlert } from "../utils/alerts";
import { Formik } from "formik";
import { workingHoursUpdateSchema } from "../validations/workingHoursSchema";
import { DatetimePicker } from "../components/DatetimePicker";
import { API_BASE_URL } from "../config/api";
import Timestamps from "../components/Timestamps";

type WorkingHoursDetailsRouteProp = RouteProp<
    WorkingHoursStackParamList & UsersStackParamList,
    'WorkingHoursDetails' | 'UserWorkingHoursDetails'
>;

export default function WorkingHoursDetailsScreen() {
    const route = useRoute<WorkingHoursDetailsRouteProp>();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const workingHoursNavigation = useNavigation<WorkingHoursOptionsNavigationProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();

    const [originalWorkingHours, setOriginalWorkingHours] = useState<WorkingHoursDetails | null>(null);

    const routeName = route.name;
    const { workingHoursId } = route.params;

    const callSaveChanges = async (values: WorkingHoursUpdate) => {
        showLoading();

        try {
            if (dayjs(originalWorkingHours?.startTime).format('YYYY-MM-DD HH:mm') === values.startTime &&
                dayjs(originalWorkingHours?.endTime).format('YYYY-MM-DD HH:mm') === values.endTime
            ) {
                showNoChangesAlert();
                return;
            }

            const validRequest = await saveWorkingHoursChanges(values, workingHoursId, userToken);

            if (validRequest && originalWorkingHours?.user.id != null) {
                if (routeName === 'WorkingHoursDetails') {
                    workingHoursNavigation.navigate('WorkingHoursList');
                } else if (routeName === 'UserWorkingHoursDetails') {
                    userNavigation.navigate('UserWorkingHoursList', {id: originalWorkingHours?.user.id });
                }
            }
        } finally {
            hideLoading();
        }
    } 

    useEffect(() => {
        const fetchWorkingHoursDetails = async () => {
            const data = await getWorkingHoursDetails(workingHoursId, userToken);
            setOriginalWorkingHours(data);
        };

        showLoading();
        fetchWorkingHoursDetails();
        hideLoading();
    }, [workingHoursId]);

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            {
                originalWorkingHours ?
                <Formik<WorkingHoursUpdate>
                    initialValues={{
                        startTime: originalWorkingHours.startTime,
                        endTime: originalWorkingHours.endTime
                    }}
                    validationSchema={workingHoursUpdateSchema}
                    onSubmit={callSaveChanges}
                >
                    {({
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched
                    }) => (
                        <View style={globalStyles.editContainer}>
                            <DatetimePicker
                                label="Start Time"
                                value={values.startTime}
                                onChangeValue={(value) => setFieldValue('startTime', value)}
                                required={true}
                                errorMessage={touched.startTime && errors.startTime}
                                width="100%"
                            />
                            <DatetimePicker
                                label="End Time"
                                value={values.endTime}
                                onChangeValue={(value) => setFieldValue('endTime', value)}
                                required={true}
                                errorMessage={touched.endTime && errors.endTime}
                                width="100%"
                            />

                            <Image 
                                source={{ uri: `${API_BASE_URL}/${originalWorkingHours.signature}` }}
                                style={globalStyles.signature}
                            />

                            <Button
                                title="Save Changes"
                                onPress={() => handleSubmit()}
                            />

                            <Timestamps
                                createdAt={originalWorkingHours.createdAt}
                                updatedAt={originalWorkingHours.updatedAt}
                            />
                        </View>
                    )}
                </Formik> :
                <Text style={globalStyles.error}>Working Hours not found</Text>
            }
        </SafeAreaView>
    )
}