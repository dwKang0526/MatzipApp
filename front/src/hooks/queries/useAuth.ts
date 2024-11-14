import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '../../api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import axiosInstance from '../../api/axios';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';

// v4
// function useSignup() {
//     return useMutation(postSignup, {
//         onSuccess: () =>
//     })
// }

// 회원가입
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

// 로그인
function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    // 성공 시 accessToken, refreshToken을 저장하고 axios header에 accessToken을 설정
    onSuccess: ({accessToken, refreshToken}) => {
      // refreshToken은 암호화하여 저장
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
      // axiosInstance의 Authorization 헤더에 accessToken을 설정해 이후 요청에서 인증 토큰을 자동으로 포함
      axiosInstance.defaults.headers.common['Authorization'] = accessToken;
    },
    // 성공, 실패 유무와 관계없이 실행
    onSettled: () => {
      // 쿼리를 다시 실행하여 새로운 accessToken을 받아옴
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      // 로그인 후 프로필 정보가 항상 최신 상태로 유지되도록 쿼리를 다시 실행 (쿼리 무효화)
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
    },
    ...mutationOptions,
  });
}

// Access Token이 만료되기 전에 자동으로 갱신, 지속적으로 인증 상태를 유지
function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    // 데이터의 유효 시간 (27분)
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    // 정해진 간격으로 쿼리 다시 호출 (27분),
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    // 네트워크가 다시 연결되면 쿼리가 다시 실행되도록 설정
    refetchOnReconnect: true,
    // 백그라운드에서도 쿼리 재실행이 가능하도록 설정
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setHeader('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}

// 4버전
// useQuery(['auth', 'getAccessToken'], getAccessToken, {
//     onSuccess,
// })

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
