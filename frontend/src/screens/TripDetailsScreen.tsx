import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusesOptionsNavigationProp, BusStackParamList, UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { useEffect, useState } from "react";
import { ListObject } from "../types/listObject";
import { fetchTimetables, getTimetableDetails } from "../services/timetableService";
import { fetchBuses, getBusDetails } from "../services/busService";
import { fetchUsers, getUserDetails } from "../services/userService";
import { TripDetails, TripUpdate } from "../types/trip";
import { Formik } from "formik";
import { showNoChangesAlert } from "../utils/alerts";
import { fetchTripsByBus, getTripDetails, saveTripChanges } from "../services/tripService";
import { tripUpdateSchema } from "../validations/tripSchema";
import { DropdownList } from "../components/DropdownList";
import Timestamps from "../components/Timestamps";
import { DatePicker } from "../components/DatePicker";
import InputField from "../components/InputField";

type TripRegistrationRouteProp = RouteProp<
    BusStackParamList & UsersStackParamList,
    'BusTripDetails' | 'UserTripDetails'
>;

export default function TripDetailsScreen() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const route = useRoute<TripRegistrationRouteProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();

    const { tripId } = route.params;
    const routeName = route.name;

    const [timetables, setTimetables] = useState<ListObject[]>([]);
    const [timetablesPage, setTimetablesPage] = useState<number>(1);
    const [hasMoreTimetables, setHasMoreTimetables] = useState<boolean>(true);
    const [loadingTimetables, setLoadingTimetables] = useState<boolean>(false);

    const [buses, setBuses] = useState<ListObject[]>([]);
    const [busesPage, setBusesPage] = useState<number>(1);
    const [hasMoreBuses, setHasMoreBuses] = useState<boolean>(true);
    const [loadingBuses, setLoadingBuses] = useState<boolean>(false);

    const [users, setUsers] = useState<ListObject[]>([]);
    const [usersPage, setUsersPage] = useState<number>(1);
    const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

    const [originalTrip, setOriginalTrip] = useState<TripDetails | null>(null);

    const populateTimetables = async () => {
        if (loadingTimetables || !hasMoreTimetables) return;
        setLoadingTimetables(true);

        try {
            const response = await fetchTimetables(timetablesPage, userToken);
            const dropdownObjects: ListObject[] = response.records.map((t) => ({
                value: t.id,
                label: `${t.busRoute.lineNumber}: ${t.busRoute.origin} (${t.departureTime}) -> ${t.busRoute.destination} (${t.arrivalTime})`
            }));

            setTimetables(prev => [...prev, ...dropdownObjects]);
            if (response.totalPages === response.currentPage) {
                setHasMoreTimetables(false);
            } else {
                setTimetablesPage(prev => prev + 1);
            }

            if (originalTrip == null) return;

            const foundTimetable = timetables.find((t) => t.value === originalTrip.timetable.id);
            if (!foundTimetable) {
                const selectedTimetable = await getTimetableDetails(originalTrip.timetable.id, userToken);
                const selectedDropdownObject: ListObject = {
                    value: selectedTimetable.id,
                    label: `${selectedTimetable.busRoute.lineNumber}: ${selectedTimetable.busRoute.origin} (${selectedTimetable.departureTime}) -> ${selectedTimetable.busRoute.destination} (${selectedTimetable.arrivalTime})`
                };

                setTimetables(prev => [...prev, selectedDropdownObject]);
            }   
        } finally {
            setLoadingTimetables(false);
        }
    };

    const populateBuses = async () => {
        if (loadingBuses || !hasMoreBuses) return;
        setLoadingBuses(true);

        try {
            const response = await fetchBuses(busesPage, userToken);
            const dropdownObjects: ListObject[] = response.records.map((bus) => ({
                value: bus.id,
                label: `${bus.busNumber} | Model: ${bus.model || 'Undefined'}`
            }));

            setBuses(prev => [...prev, ...dropdownObjects]);
            if (response.totalPages === response.currentPage) {
                setHasMoreBuses(false);
            } else {
                setBusesPage(prev => prev + 1);
            }

            if (originalTrip == null) return;

            const foundBus = buses.find((b) => b.value === originalTrip.bus.id);
            if (!foundBus) {
                const selectedBus = await getBusDetails(originalTrip.bus.id, userToken);
                const selectedDropdownObject: ListObject = {
                    value: selectedBus.id,
                    label: `${selectedBus.busNumber} | Model: ${selectedBus.model || 'Undefined'}`
                }
            }
        } finally {
            setLoadingBuses(false);
        }
    };

    const populateUsers = async () => {
        if (loadingUsers || !hasMoreUsers) return;
        setLoadingUsers(true);

        try {
            const response = await fetchUsers(usersPage, userToken);
            const dropdownObjects: ListObject[] = response.records.map((user) => ({
                value: user.id,
                label: `${user.name}: ${user.documentNumber}`
            }));

            setUsers(prev => [...prev, ...dropdownObjects]);
            if (response.totalPages === response.currentPage) {
                setHasMoreUsers(false);
            } else {
                setUsersPage(prev => prev + 1);
            }

            if (originalTrip == null) return;

            const foundUser = users.find((u) => u.value === originalTrip.user.id);
            if (!foundUser) {
                const selectedUser = await getUserDetails(originalTrip.user.id, userToken);
                const selectedDropdownObject: ListObject = {
                    value: selectedUser.id,
                    label: `${selectedUser.name}: ${selectedUser.documentNumber}`
                }

                setUsers(prev => [...prev, selectedDropdownObject]);
            }
        } finally {
            setLoadingUsers(false);
        }
    };

    const callSaveChanges = async (values: TripUpdate) => {
        try {
            showLoading();

            if (!originalTrip) return;

            if (
                originalTrip.user.id === values.userId &&
                originalTrip.bus.id === values.busId &&
                originalTrip.timetable.id === values.timetableId &&
                originalTrip.numberOfPassengers === values.numberOfPassengers &&
                originalTrip.date === values.date &&
                originalTrip.observations === values.observations
            ) {
                showNoChangesAlert();
            } else {
                const validRequest = await saveTripChanges(values, tripId, userToken);

                
                if (validRequest) {
                    if (routeName === 'BusTripDetails') {
                        busNavigation.navigate('BusTripsList', { id: originalTrip.bus.id })
                    } else if (routeName === 'UserTripDetails') {
                        userNavigation.navigate('UserTripsList', { id: originalTrip.user.id });
                    }
                }
            }
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        const populateData = async () => {
            showLoading();

            const tripData = await getTripDetails(tripId, userToken);
            setOriginalTrip(tripData);

            await populateTimetables();
            await populateBuses();
            await populateUsers();

            hideLoading();
        };

        populateData();
    }, [])

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            {originalTrip ?
                <Formik<TripUpdate>
                    initialValues={{
                        userId: originalTrip.user.id,
                        busId: originalTrip.bus.id,
                        timetableId: originalTrip.timetable.id,
                        numberOfPassengers: originalTrip.numberOfPassengers,
                        date: originalTrip.date,
                        observations: originalTrip.observations
                    }}
                    onSubmit={callSaveChanges}
                    validationSchema={tripUpdateSchema}
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
                            <DropdownList
                                label="Driver"
                                placeholder="Select driver..."
                                required={true}
                                selectedValue={values.userId}
                                options={users}
                                onValueChange={(value) => setFieldValue('userId', value)}
                                onEndReached={populateUsers}
                                errorMessage={touched.userId && errors.userId}
                                width="100%"
                            />

                            <DropdownList
                                label="Bus"
                                placeholder="Select bus..."
                                required={true}
                                selectedValue={values.busId}
                                options={buses}
                                onValueChange={(value) => setFieldValue('busId', value)}
                                onEndReached={populateBuses}
                                errorMessage={touched.busId && errors.busId}
                                width="100%"
                            />

                            <DropdownList
                                label="Timetable"
                                placeholder="Select timetable..."
                                required={true}
                                selectedValue={values.timetableId}
                                options={timetables}
                                onValueChange={(value) => setFieldValue('timetableId', value)}
                                onEndReached={populateTimetables}
                                errorMessage={touched.timetableId && errors.timetableId}
                                width="100%"
                            />

                            <View style={globalStyles.inputRow}>
                                <DatePicker
                                    label="Date"
                                    value={values.date}
                                    onChangeValue={(value) => setFieldValue('date', value)}
                                    required={true}
                                    errorMessage={touched.date && errors.date}
                                    width="48%"
                                />

                                <InputField
                                    label="Number of passengers"
                                    errorMessage={touched.numberOfPassengers && errors.numberOfPassengers}
                                    isNumber={true}
                                    value={values.numberOfPassengers.toString()}
                                    required={true}
                                    width={'48%'}
                                    onChangeText={(value) => setFieldValue('numberOfPassengers', value)}
                                />
                            </View>

                            <InputField
                                label="Observations"
                                errorMessage={touched.observations && values.observations}
                                multiline={true}
                                value={values.observations}
                                width="100%"
                                onChangeText={(value) => setFieldValue('observations', value)}
                            />

                            <Button
                                title="Register"
                                onPress={() => handleSubmit()}
                            />

                            <Timestamps
                                createdAt={originalTrip.createdAt}
                                updatedAt={originalTrip.updatedAt}
                            />
                        </View>
                    )}
                </Formik> :
                <Text style={globalStyles.error}>Trip not found</Text>
            }
        </SafeAreaView>
    )
}