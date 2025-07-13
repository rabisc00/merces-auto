import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  focusedButton: {
    backgroundColor: '#e3f2fd', // Light blue background when focused
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  focusedText: {
    fontWeight: 'bold',
    color: '#2196f3',
  }
});

export default styles;