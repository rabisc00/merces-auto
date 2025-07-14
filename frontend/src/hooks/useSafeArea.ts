import { useSafeAreaInsets } from "react-native-safe-area-context"

export const useSafeArea = () => {
    const insets = useSafeAreaInsets();
    return {
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16
    };
}

