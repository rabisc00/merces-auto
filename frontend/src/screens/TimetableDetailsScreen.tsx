import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { getTimetableDetails, saveTimetableChanges } from "../services/timetableService";
import { TimetableDetails, TimetableUpdateForm, TimetableUpdateRequest } from "../types/timetable";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { showNoChangesAlert } from "../utils/alerts";
import { timetableUpdateSchema } from "../validations/timetableSchema";
import { MultiSelectList } from "../components/MultiSelectList";
import { daysOfTheWeek } from "../const/days";
import { TimePicker } from "../components/TimePicker";
import dayjs from "dayjs";

type TimetableRouteProp = RouteProp<BusRouteStackParamList, 'TimetableDetails'>; 

export default function TimetableDetailsScreen() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();
    const route = useRoute<TimetableRouteProp>();

    const { timetableId } = route.params;

    const [originalTimetable, setOriginalTimetable] = useState<TimetableDetails | null>();

    useEffect(() => {
        const fetchTimetableDetails = async () => {
            const data = await getTimetableDetails(timetableId, userToken);
            setOriginalTimetable(data);
        }

        showLoading();
        fetchTimetableDetails();

        hideLoading();
    }, [timetableId]);

    const callSaveChanges = async (values: TimetableUpdateForm) => {
        showLoading();

        if (originalTimetable == null || originalTimetable.days == null || 
            values == null || values.days == null) {
                return;
            }

        const sortedOriginal = [...originalTimetable?.days].sort();
        const sortedValues = [...values?.days].sort();

        const sameDays = sortedOriginal.every((val, index) => val.dayId.toString() === sortedValues[index]);

        if (values.arrivalTime === originalTimetable?.arrivalTime &&
            values.departureTime === originalTimetable?.departureTime &&
            sameDays
        ) {
            showNoChangesAlert();
        } else {
            const requestObj: TimetableUpdateRequest = {
                arrivalTime: values.arrivalTime,
                departureTime: values.departureTime,
                days: values.days.map((d: string) => parseInt(d))
            };

            const validRequest = await saveTimetableChanges(requestObj, timetableId, userToken);
            if (validRequest) {
                navigation.navigate('TimetableCalendar', { busRouteId: originalTimetable.busRoute.id });
            }
        }
    }
 
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            {originalTimetable ?
                <Formik<TimetableUpdateForm>
                    initialValues={{
                        arrivalTime: originalTimetable.arrivalTime,
                        departureTime: originalTimetable.departureTime,
                        days: originalTimetable.days.map((d) => d.dayId.toString())
                    }}
                    onSubmit={callSaveChanges}
                    validationSchema={timetableUpdateSchema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        setTouched,
                        errors,
                        values,
                        touched,
                        isValid
                    }) => (
                        <View style={globalStyles.editContainer}>
                            <MultiSelectList
                                label="Days of the Week"
                                required={true}
                                onValueChange={(currentValue) => {
                                    let updatedDays;
                                    if (values.days.includes(currentValue)) {
                                        updatedDays = values.days.filter(d => d != currentValue);
                                    } else {
                                        updatedDays = [...values.days, currentValue];
                                    }
                                    
                                    setFieldValue('days', updatedDays);
                                }}
                                selectedItems={values.days}
                                options={daysOfTheWeek}
                                errorMessage={touched.days && typeof errors.days === 'string' ? errors.days : undefined}
                                width='100%'
                            />

                            <View style={globalStyles.inputRow}>
                                <TimePicker
                                    label="Arrival Time"
                                    value={values.arrivalTime}
                                    onChangeValue={(value) => setFieldValue('arrivalTime', value)}
                                    errorMessage={touched.arrivalTime && errors.arrivalTime}
                                    width='48%'
                                />

                                <TimePicker
                                    label="Departure Time"
                                    value={values.departureTime}
                                    onChangeValue={(value) => setFieldValue('departureTime', value)}
                                    errorMessage={touched.departureTime && errors.departureTime}
                                    width='48%'
                                />
                            </View>

                            <Button
                                title="Register"
                                onPress={() => {
                                    setTouched({
                                        arrivalTime: true,
                                        departureTime: true,
                                        days: true
                                    });

                                    if (isValid) {
                                        handleSubmit()
                                    }
                                }}
                            />
                        </View>
                    )}
                </Formik> :
                <Text style={globalStyles.error}>Timetable not found</Text>
            }
            
        </SafeAreaView>
    )
}