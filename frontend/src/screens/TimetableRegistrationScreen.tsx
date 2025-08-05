import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { TimetableCreateForm, TimetableCreateRequest } from "../types/timetable";
import { useLoading } from "../context/LoadingContext";
import { useAuth } from "../context/AuthContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../types/navigation";
import { timetableCreateSchema } from "../validations/timetableSchema";
import { fetchBusRoutes } from "../services/busRouteService";
import { useEffect, useState } from "react";
import { ListObject } from "../types/listObject";
import { DropdownList } from "../components/DropdownList";
import { TimePicker } from "../components/TimePicker";
import { MultiSelectList } from "../components/MultiSelectList";
import { daysOfTheWeek } from "../const/days";
import { registerTimetable } from "../services/timetableService";

type BusRouteRouteProp = RouteProp<BusRouteStackParamList, 'TimetableRegistration'>;

export default function TimetableRegistrationScreen() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();
    const route = useRoute<BusRouteRouteProp>();

    const [busRoutes, setBusRoutes] = useState<ListObject[]>([]);
    const [busRoutePage, setBusRoutePage] = useState<number>(1);
    const [loadingBusRoute, setLoadingBusRoute] = useState(false);
    const [hasMoreBusRoutes, setHasMoreBusRoutes] = useState(true);
    
    const { busRouteId } = route.params;

    const fetchData = async () => {
        if (loadingBusRoute || !hasMoreBusRoutes) return;
        setLoadingBusRoute(true);

        try {
            const response = await fetchBusRoutes(busRoutePage, userToken);
            const dropdownObjects: ListObject[] = response.records.map((br) => {
                return {
                    value: br.id,
                    label: `${br.lineNumber}: ${br.origin} -> ${br.destination}`
                }
            });

            setBusRoutes(prevItems => [...prevItems, ...dropdownObjects]);

            if (response.currentPage === response.totalPages) {
                setHasMoreBusRoutes(false);
            } else {
                setBusRoutePage(prevPage => prevPage + 1);
            }
        } finally {
            setLoadingBusRoute(false);
        }
    };

    const callRegisterTimetable = async (values: TimetableCreateForm) => {
        showLoading();

        const obj: TimetableCreateRequest = {
            busRouteId: values.busRouteId,
            arrivalTime: (new Date(values.arrivalTime)).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
                departureTime: (new Date(values.departureTime)).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            days: values.days.map((d: string) => parseInt(d))
        };

        const registerValid = await registerTimetable(obj, userToken);
        if (registerValid) {
            navigation.navigate('TimetableCalendar', { busRouteId });
        }

        hideLoading();
    }

    useEffect(() => {
        const populateBusRoutes = async () => {
            showLoading();
            await fetchData();
            hideLoading();
        }
        
        populateBusRoutes();
    }, []);

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <Formik<TimetableCreateForm>
                initialValues={{ 
                    busRouteId: '', 
                    arrivalTime: '', 
                    departureTime: '', 
                    days: []
                }}
                onSubmit={callRegisterTimetable}
                validationSchema={timetableCreateSchema}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                    setTouched,
                    values,
                    errors,
                    touched,
                    isValid
                }) => {
                    return (
                        <View style={globalStyles.mainContainer}>
                            <DropdownList
                                label="Bus Route"
                                placeholder="Select a bus route..."
                                required={true}
                                selectedValue={values.busRouteId}
                                options={busRoutes}
                                onValueChange={(value) => setFieldValue('busRouteId', value)}
                                onEndReached={fetchData}
                                errorMessage={touched.busRouteId && errors.busRouteId}
                                width='100%'
                            />

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
                                    required={true}
                                    errorMessage={touched.arrivalTime && errors.arrivalTime}
                                    width='45%'
                                />

                                <TimePicker
                                    label="Departure Time"
                                    value={values.departureTime}
                                    onChangeValue={(value) => setFieldValue('departureTime', value)}
                                    required={true}
                                    errorMessage={touched.departureTime && errors.departureTime}
                                    width='45%'
                                />
                            </View>

                            <Button 
                                title="Register" 
                                onPress={async () => {
                                    setTouched({
                                        busRouteId: true,
                                        arrivalTime: true,
                                        departureTime: true,
                                        days: true
                                    });

                                    if (isValid) {
                                        handleSubmit();
                                    }
                                }}
                            />
                        </View>
                    )
                }}
            </Formik>
        </SafeAreaView>
    )
}