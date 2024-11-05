import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import useForm from '../../hooks/useForm';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {validateSignUp} from '../../utils';

function SignUpScreen() {
  const signUp = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignUp,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={signUp.errors.email}
          touched={signUp.touched.email}
          inputMode="email"
          {...signUp.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={signUp.errors.password}
          touched={signUp.touched.password}
          secureTextEntry
          {...signUp.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          secureTextEntry
          {...signUp.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {gap: 20, marginBottom: 30},
});

export default SignUpScreen;
