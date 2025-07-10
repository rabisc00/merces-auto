import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TimerResetExample = () => {
  const [isHungry, setIsHungry] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store timer ID

  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsHungry(false);

    timerRef.current = setTimeout(() => {
      setIsHungry(true);
    }, 5000)
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Scribbles is {isHungry ? 'hungry' : 'satisfied'}</Text>
      <Button title="Feed Mr. Scribbles" onPress={startTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default TimerResetExample;