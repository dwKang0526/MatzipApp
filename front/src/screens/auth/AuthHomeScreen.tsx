import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button title="로그인 화면으로 이동" onPress={()=> navigation.navigate(authNavigations.LOGIN)} />
         <Button title="회원가입으로 이동" onPress={()=> navigation.navigate(authNavigations.SIGN_UP)} /> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;