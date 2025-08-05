import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusesOptionsNavigationProp, BusStackParamList, UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { ListObject } from "../types/listObject";
import { useLoading } from "../context/LoadingContext";
import { fetchTimetables, fetchTimetablesByRoute } from "../services/timetableService";
import { fetchBuses } from "../services/busService";
import { fetchUsers } from "../services/userService";
import { Formik } from "formik";
import { TripCreate } from "../types/trip";
import { registerTrip } from "../services/tripService";
import { tripCreateSchema } from "../validations/tripSchema";
import { DropdownList } from "../components/DropdownList";
import HeaderWithSearch from "../components/HeaderWithSearch";

type TripRegistrationRouteProp = RouteProp<
    BusStackParamList & UsersStackParamList,
    'BusTripRegistration' | 'UserTripRegistration'
>;

export default function TripRegistrationScreen() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const route = useRoute<TripRegistrationRouteProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();

    const { id } = route.params;
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

    const populateTimetables = async () => {
        if (loadingTimetables || !hasMoreTimetables) return;
        setLoadingTimetables(true);

        try {
            const response = await fetchTimetables(timetablesPage, userToken);
            const dropdownObjects: ListObject[] = response.records.map((t) => ({
                value: t.id,
                label: `${t.busRoute.lineNumber}: 
                    ${t.busRoute.origin} (${t.departureTime}) -> 
                    ${t.busRoute.destination} (${t.arrivalTime})`
            }));

            setTimetables(prev => [...prev, ...dropdownObjects]);
            if (response.totalPages === response.currentPage) {
                setHasMoreTimetables(false);
            } else {
                setTimetablesPage(prev => prev + 1);
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
        } finally {
            setLoadingUsers(false);
        }
    };

    const callRegisterTrip = async (values: TripCreate) => {
        showLoading();

        const validRegister = await registerTrip(values, userToken);

        if (validRegister) {
            if (routeName === 'BusTripRegistration') {
                busNavigation.navigate('BusTripsList', { id });
            } else if (routeName === 'UserTripRegistration') {
                userNavigation.navigate('UserTripsList', { id });
            }
        }

        hideLoading();
    }

    useEffect(() => {
        const populateDropdowns = async () => {
            showLoading();

            await populateTimetables();
            await populateBuses();
            await populateUsers();

            hideLoading();
        }

        populateDropdowns();
    }, []);

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            
            <Formik<TripCreate>
                initialValues={{
                    userId: '',
                    busId: '',
                    timetableId: '',
                    date: '',
                    observations: '',
                    numberOfPassengers: 0
                }}
                onSubmit={callRegisterTrip}
                validationSchema={tripCreateSchema}
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
                        </View>
                    )
                }}
            </Formik>
        </SafeAreaView>
    );
}