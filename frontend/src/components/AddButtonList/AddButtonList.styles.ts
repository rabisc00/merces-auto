import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#219EBC'
  },
  icon: {
    marginRight: 16,
    color: '#219EBC'
  },
  text: {
    fontSize: 16,
    color: '#219EBC'
  }
});

export default styles;