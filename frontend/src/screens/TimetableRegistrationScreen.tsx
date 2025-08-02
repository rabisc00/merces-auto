import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { TimetableCreate } from "../types/timetable";
import { useLoading } from "../context/LoadingContext";
import { useAuth } from "../context/AuthContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../types/navigation";
import { timetableCreateSchema } from "../validations/timetableSchema";
import { fetchBusRoutes } from "../services/busRouteService";
import { useEffect, useState } from "react";
import { ListObject } from "../types/listObject";
import { DropdownList } from "../components/DropdownList";
import { DatetimePicker } from "../components/DatetimePicker";
import { MultiSelectList } from "../components/MultiSelectList";
import { daysOfTheWeek } from "../const/days";

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

    const callRegisterTimetable = async (values: TimetableCreate) => {
        showLoading();
        console.log(values);
        // const registerValid = await registerTimetable(values, userToken);
        // if (registerValid) {
        //     navigation.navigate('TimetableCalendar', { busRouteId });
        // }
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
            <Formik<TimetableCreate>
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
                    setFieldTouched,
                    setTouched,
                    values,
                    errors,
                    touched
                }) => {
                    return (
                        <View style={globalStyles.mainContainer}>
                            <DropdownList
                                label="Bus Route"
                                required={true}
                                selectedValue={values.busRouteId}
                                options={busRoutes}
                                onValueChange={(value) => {
                                    setFieldValue('busRouteId', value);
                                    setFieldTouched('busRouteId', true);
                                }}
                                errorMessage={touched.busRouteId && errors.busRouteId}
                                width='100%'
                            />
                            
                            <DatetimePicker
                                label="Arrival Time"
                                value={values.arrivalTime}
                                onChangeValue={(value) => {
                                    setFieldValue('arrivalTime', value);
                                    setFieldTouched('arrivalTime', true);
                                }}
                                required={true}
                                errorMessage={touched.arrivalTime && errors.arrivalTime}
                                width='100%'
                            />

                            <DatetimePicker
                                label="Departure Time"
                                value={values.departureTime}
                                onChangeValue={(value) => {
                                    setFieldValue('departureTime', value);
                                    setFieldTouched('departureTime', true);
                                }}
                                required={true}
                                errorMessage={touched.departureTime && errors.departureTime}
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

                            <Button 
                                title="Register" 
                                onPress={() => {
                                    setTouched({
                                        busRouteId: true,
                                        arrivalTime: true,
                                        departureTime: true,
                                        days: true
                                    });

                                    handleSubmit();
                                }}
                            />
                        </View>
                    )
                }}
            </Formik>
        </SafeAreaView>
    )
}