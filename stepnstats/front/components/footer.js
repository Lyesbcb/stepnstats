

import { Text, View, Pressable, Image, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { RFValue } from "react-native-responsive-fontsize";

export default function Footer({ styles }) {
    function support() {
        Clipboard.setString('FYN3cUXxReNqVuuEUEiRMDk9SHSXWax21RrgKb7mxrSv')
        Alert.alert("Wallet adress copied!")
        // TODO: remove this 
    }
    return (
        <Pressable style={styles.support} onPress={() => support()}>
            <View style={{
                justifyContent: 'center',
                alignItems: "center",
                flexDirection: "column",
            }}>
                <View style={{
                    flexDirection: "row",
                    marginBottom: 5
                }}>
                    <View style={styles.supportButton}>
                        <Text style={styles.supportText}>Support project</Text>
                    </View>
                    <Image source={require('../assets/sol.png')} style={styles.imageSupport}></Image>
                    <Image source={require('../assets/usdc.png')} style={styles.imageSupport}></Image>
                    <Image source={require('../assets/gst.png')} style={styles.imageSupport}></Image>
                    <Image source={require('../assets/gmt.png')} style={styles.imageSupport}></Image>
                </View>
                <Text style={styles.unofficial}>Unofficial Step'n app and data</Text>
            </View>
        </Pressable >
    );
}