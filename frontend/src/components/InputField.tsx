import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label: string;
  errorMessage?: string;
  required?: boolean;
  password?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

const InputField: React.FC<Props> = ({ label, errorMessage, required, password, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.asterisk}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, errorMessage &&styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize='none'
        secureTextEntry={password}
      />
      {errorMessage && <Text style={styles.errorText}>errorMessage</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  asterisk: {
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginBottom: 8
  }
});

export default InputField;