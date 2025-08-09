import { Button, SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { UsersOptionsNavigationProp, UsersStackParamList, WorkingHoursOptionsNavigationProp, WorkingHoursStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { useEffect, useState } from "react";
import { ListObject } from "../types/listObject";
import { fetchUsers, getUserDetails } from "../services/userService";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { Formik } from "formik";
import { WorkingHoursCreate } from "../types/workingHours";
import { registerWorkingHours } from "../services/workingHoursService";
import { workingHoursCreateSchema } from "../validations/workingHoursSchema";
import { DatetimePicker } from "../components/DatetimePicker";
import { DropdownList } from "../components/DropdownList";

type WorkingHoursRegistrationRouteProp = RouteProp<
    WorkingHoursStackParamList & UsersStackParamList,
    'WorkingHoursRegistration' | 'UserWorkingHoursRegistration'
>;

export default function WorkingHoursRegistrationScreen() {
    const { userToken, userId, isUserAdmin } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const route = useRoute<WorkingHoursRegistrationRouteProp>();
    const workingHoursNavigation = useNavigation<WorkingHoursOptionsNavigationProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();

    const [users, setUsers] = useState<ListObject[]>([]);
    const [usersPage, setUsersPage] = useState<number>(1);
    const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

    const routeName = route.name;

    const populateUsers = async () => {
        if (loadingUsers || !hasMoreUsers) return;
        setLoadingUsers(true);

        try {
            const response = await fetchUsers(usersPage, userToken);
            const dropdownObject: ListObject[] = response.records.map((user) => ({
                value: user.id,
                label: `${user.name} | ${user.documentNumber}`
            }));

            setUsers((prev) => [...prev, ...dropdownObject]);
            if (response.currentPage == response.totalPages) {
                setHasMoreUsers(false);
            } else {
                setUsersPage(prev => prev + 1);
            }

            if (userId == null) return;

            const foundUser = users.find((user) => user.value === userId);
            if (!foundUser) {
                const initialUser = await getUserDetails(userId, userToken);
                const initialUserDropdownObject: ListObject = {
                    value: initialUser.id,
                    label: `${initialUser.name} | ${initialUser.documentNumber}`
                };

                setUsers(prev => [...prev, initialUserDropdownObject]);
            }
        } finally {
            setLoadingUsers(false);
        }
    };

    const callRegisterWorkingHours = async (values: WorkingHoursCreate) => {
        showLoading();
        const validRegister = await registerWorkingHours(values, userToken);
        if (validRegister) {
            if (routeName === 'WorkingHoursRegistration') {
                workingHoursNavigation.navigate('WorkingHoursList');
            } else if (routeName === 'UserWorkingHoursRegistration') {
                if (userId == null) return;
                userNavigation.navigate('UserWorkingHoursList', { id: userId });
            }
        }

        hideLoading();
    }

    useEffect(() => {
        const populateData = async () => {
            showLoading();
            await populateUsers();
            hideLoading();
        };

        populateData();
    }, []);

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            { 
                userId ? 
                <Formik<WorkingHoursCreate>
                    initialValues={{
                        userId: userId,
                        startTime: '',
                        endTime: ''
                    }}
                    onSubmit={callRegisterWorkingHours}
                    validationSchema={workingHoursCreateSchema}
                >
                    {({
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched
                    }) => (
                        <View style={globalStyles.mainContainer}>
                            <DropdownList
                                label="Driver"
                                placeholder="Select driver..."
                                required={true}
                                selectedValue={values.userId}
                                options={users}
                                onValueChange={(value) => setFieldValue('userId', value)}
                                onEndReached={populateUsers}
                                disabled={!isUserAdmin}
                                errorMessage={touched.userId && errors.userId}
                                width="100%"
                            />
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

                            <Button title="Register" onPress={() => handleSubmit()} />
                        </View>
                    )}
                </Formik> :
                <Text>User not found</Text>
            }
            
        </SafeAreaView>
    )
}