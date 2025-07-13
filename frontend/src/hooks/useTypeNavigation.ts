import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { TabParamList } from "../types/navigation"

export const useTypedNavigation = () => {
    return useNavigation<BottomTabNavigationProp<TabParamList>>();
};