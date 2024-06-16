import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { sessionsService } from "@/services/infrastructure";

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const token = await sessionsService.create({ phoneNumber, password });
      console.log("Login successful. Token:", token);
      router.replace("/(stack)/");
      // Navigate to your tabs screen or any other screen upon successful login
      // Replace "/tabs" with your actual route
      // router.replace("/tabs");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login failed");
      // Handle login error (e.g., display error message)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(stack)/");
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Norris</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: "#F24452",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
