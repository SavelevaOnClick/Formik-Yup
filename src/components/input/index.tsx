import React, {ForwardRefRenderFunction, Ref, useCallback, useMemo, useState} from 'react';
import {NativeSyntheticEvent, StyleProp, TextInput as TI, TextInputFocusEventData, ViewStyle} from 'react-native';
import {Text, TextInput, View} from '@components';
import styles from './styles';

type TProps = {
  value: string;
  setValue: (value: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string | null;
  styleInput?: StyleProp<ViewStyle>;
  placeholder?: string;
};

const Input: ForwardRefRenderFunction<TI, TProps> = (
  {value, setValue, error, onBlur, styleInput = {}, placeholder = ''},
  ref,
) => {
  const [isBlur, setIsBlur] = useState(true);

  const container = useMemo(() => [styles.container, styleInput], []);

  const onBlurHandler = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur(e);
    setIsBlur(true);
  }, []);

  const onFocusHandler = useCallback(() => setIsBlur(false), []);

  return (
    <View style={container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        placeholder={placeholder}
      />
      <View style={styles.errorContainer}>{error && isBlur ? <Text style={styles.error}>{error}</Text> : null}</View>
    </View>
  );
};

export default Input;
