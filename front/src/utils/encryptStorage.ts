import EncryptedStorage from 'react-native-encrypted-storage';

// 암호화된 데이터를 저장하는 함수
const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

// 암호화된 데이터를 가져오는 함수
const getEncryptStorage = async <T>(key: string) => {
  const storage = await EncryptedStorage.getItem(key);

  return storage ? JSON.parse(storage) : null;
};

// 암호화된 데이터를 삭제하는 함수
const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);
  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
