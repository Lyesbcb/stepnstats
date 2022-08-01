import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
  registerUser,
  authenticateUser,
  updateUser,
  logoutUser,
} from "../services/users/index";
import {
  createRun,
  uploadRun,
  getAllMyRun,
  updateRun,
  deleteRun,
} from "../services/runs/index";
import {
  createMb,
  uploadMb,
  getAllMyMb,
  updateMb,
  deleteMb,
} from "../services/mbs/index";
export default function TestScreen({ styles, setScreen }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    await uploadMb(result)
  };
  var paramsCreateRun = {
    mbLvl: 0,
    id: 1,
    date: "2000-12-09T23:20:35.000Z",
    realm: "Solana",
    duration: "00:25:32",
    energy: "4.6",
    quality: "Common",
    type: "Runner",
    lvl: "24",
    km: "3.43",
    steps: "4232",
    fileName: "18-12-2000_20:35_2182638.png",
    gst: "26.73",
    nftId: "2182638",
    durabilityLost: "8",
  };
  var paramsRegister = {
    username: "test",
    password: "Azerty1",
    anonymous: false,
  };
  return (
    <View
      style={{
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
          height: "10%",
          flexDirection: "row",
        }}
      >
        <Text>USER: </Text>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await registerUser(paramsRegister);
          }}
        >
          <Text>Register User</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await authenticateUser(paramsRegister);
          }}
        >
          <Text>Authenticate User</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await updateUser(paramsRegister);
          }}
        >
          <Text>Update User</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await logoutUser();
          }}
        >
          <Text>Logout User</Text>
        </Pressable>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
          height: "10%",
          flexDirection: "row",
        }}
      >
        <Text>RUN: </Text>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await createRun(paramsCreateRun);
          }}
        >
          <Text>Create</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await uploadRun(params);
          }}
        >
          <Text>Upload</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await getAllMyRun(1);
          }}
        >
          <Text>Get all my</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await updateRun(params);
          }}
        >
          <Text>Update</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await deleteRun(params);
          }}
        >
          <Text>Delete</Text>
        </Pressable>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
          height: "10%",
          flexDirection: "row",
        }}
      >
        <Text>MB: </Text>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await createMb(paramsCreateRun);
          }}
        >
          <Text>Create</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await pickImage();
          }}
        >
          <Text>Upload</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await getAllMyMb();
          }}
        >
          <Text>Get all my</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await updateMb(params);
          }}
        >
          <Text>Update</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await deleteMb(params);
          }}
        >
          <Text>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}
