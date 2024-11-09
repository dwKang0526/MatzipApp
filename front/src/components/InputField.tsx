import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {Dimensions, StyleSheet, Text, TextInputProps, View} from 'react-native';
import {Pressable, TextInput} from 'react-native-gesture-handler';
import {colors} from '../constants';
import {mergeRefs} from '../utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

// forwardRef: 부모 컴포넌트에서 ref 속성을 사용할 수 있도록 함
const InputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    // 입력창 클릭 범위 확장 ("이메일을 입력하세요", "비밀번호를 입력하세요" 클릭 시 입력창에 포커스)
    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={() => innerRef.current?.focus()}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(ref, innerRef) : innerRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
