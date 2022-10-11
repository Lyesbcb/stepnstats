import * as SecureStore from "expo-secure-store";

module.exports = {
  secureSave,
  getSecuretValueFor,
  deleteSecuretValueFor
};

async function secureSave(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getSecuretValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteSecuretValueFor(key){
  await SecureStore.deleteItemAsync(key)
}