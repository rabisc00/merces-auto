import React from 'react';
import { View, Text, TextInput, StyleSheet, DimensionValue } from 'react-native';
import { globalStyles } from '../styles/global';

type Props = {
  label: string;
  errorMessage?: string | false;
  required?: boolean;
  password?: boolean;
  isNumber?: boolean;
  value?: any;
  width?: DimensionValue;
  onChangeText: (text: string) => void;
};

const InputField: React.FC<Props> = ({ 
  label, 
  errorMessage, 
  required, 
  isNumber,
  password, 
  value, 
  width = '100%', 
  onChangeText 
}) => {
  return (
    <View style={[globalStyles.inputContainer, { width }]}>
      <Text style={globalStyles.inputLabel}>
        {label}
        {required && <Text style={globalStyles.asterisk}> *</Text>}
      </Text>
      <TextInput
        style={[globalStyles.input, errorMessage && globalStyles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={isNumber ? 'numeric' : 'default'}
        autoCapitalize='none'
        secureTextEntry={password}
      />
      {errorMessage && <Text style={globalStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default InputField;