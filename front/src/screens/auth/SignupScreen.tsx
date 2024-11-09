import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import useForm from '../../hooks/useForm';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {validateSignUp} from '../../utils';
import {TextInput} from 'react-native-gesture-handler';

function SignUpScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signUp = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignUp,
  });

  const handleSubmit = () => {
    console.log('signUp.values', signUp.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signUp.errors.email}
          touched={signUp.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signUp.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signUp.errors.password}
          touched={signUp.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signUp.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signUp.errors.passwordConfirm}
          touched={signUp.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signUp.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
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
