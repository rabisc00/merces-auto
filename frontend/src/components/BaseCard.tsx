import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/global';

type BaseCardProps = {
  children: React.ReactNode;
  deleteAction: () => void;
  detailsAction: () => void;
};

export default function BaseCard({ children, deleteAction, detailsAction }: BaseCardProps) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});