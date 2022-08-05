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
import * as ImagePicker from "expo-image-picker";
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
import {
  createNft,
  uploadNft,
  getAllMyNft,
  updateNft,
  deleteNft,
} from "../services/nfts/index";
import { getAllMp } from "../services/mps/index";
export default function TestScreen({ route, navigation }) {
  const [image, setImage] = useState(null);
  console.log(route)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    await uploadMb(result, "Solana");
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
  var paramsCreateNft = {
    lvl: "28",
    realm: "Solana",
    fileName: "2020-11-11_20:21:43.png",
    type: "runner",
    quality: "common",
    efficiency: "9.4",
    luck: "7.2",
    comfort: "6.4",
    resilience: "4.2",
    mint: "2",
    nftId: "23712932",
    socket1: "comfort1",
    socket2: "comfort1",
    socket3: "efficiency1",
    socket4: "efficiency1",
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
            await uploadRun(paramsCreateRun);
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
            await updateRun(776, paramsCreateRun);
          }}
        >
          <Text>Update</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await deleteRun(775);
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
        <Text>NFT: </Text>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await createNft(paramsCreateNft);
          }}
        >
          <Text>Create</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await uploadNft(paramsCreateNft);
          }}
        >
          <Text>Upload</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            console.log(await getAllMyNft(1));
          }}
        >
          <Text>Get all my</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await updateNft(3, paramsCreateNft);
          }}
        >
          <Text>Update</Text>
        </Pressable>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await deleteNft(3);
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
            console.log(await getAllMyMb(1));
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
            await deleteMb(2);
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
        <Text>Marketplaces: </Text>
        <Pressable
          style={{ borderWidth: 1 }}
          onPress={async () => {
            await getAllMp("Solana");
          }}
        >
          <Text>Get all Mp</Text>
        </Pressable>
      </View>
    
    </View>
  );
}
