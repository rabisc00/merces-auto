import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get(('window'));

export default function LoadingOverlay() {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});