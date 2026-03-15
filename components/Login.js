import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CustomText } from "./helperComponents/CustomText";
import { PrimaryButton } from "./helperComponents/PrimaryButton";
import { loginUser } from "../services";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { printAllErs } from "../helperFunctions";
import theme from "../theme";

export const Login = ({ navigation }) => {
  const { setUser, setIsAuth, key } = useAuth();
  const [loginError, setLoginError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoginError(null);
    try {
      const usrLgd = await loginUser(data);
      if (usrLgd) {
        await AsyncStorage.setItem(key, usrLgd.sessionToken);
        setUser(usrLgd);
        setIsAuth(true);
        navigation.navigate("ProfScreen");
      }
    } catch (e) {
      printAllErs(e);
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formField}>
        <CustomText style={styles.label}>Username</CustomText>
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Username is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Your username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && (
          <CustomText style={styles.errorText}>
            {errors.username.message}
          </CustomText>
        )}
      </View>

      <View style={styles.formField}>
        <CustomText style={styles.label}>Password</CustomText>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputField}
              placeholder="Your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <CustomText style={styles.errorText}>
            {errors.password.message}
          </CustomText>
        )}
      </View>

      {loginError && (
        <CustomText style={styles.errorText}>{loginError}</CustomText>
      )}

      <PrimaryButton onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        Log In
      </PrimaryButton>

      {/* Register link — bottom left */}
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("RegForm")}>
        <CustomText fontSize="small" style={{ color: theme.colors.backSeed }}>Don't have an account? </CustomText>
        <CustomText fontSize="small" fontWeight="bold" style={{ color: theme.colors.bananaSkin }}>Register here</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: theme.colors.prim,
  },
  topImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
    backgroundColor: "#eee",
  },
  formField: {
    width: "80%",
    marginVertical: 10,
  },
  label: {
    fontFamily: theme.fonts.mainBold,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.coconutBrown,
    borderRadius: 6,
    padding: 10,
    backgroundColor: theme.colors.back,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  registerLink: {
    position: "absolute",
    bottom: theme.paddings.large * 2,
    left: theme.paddings.large,
    flexDirection: "row",
  },
});
