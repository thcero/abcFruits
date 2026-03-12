import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CustomText } from "./helperComponents/CustomText"; // If you have a custom text component
import { loginUser } from "../services";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { printAllErs } from "../helperFunctions";
import theme from "../theme";

export const Login = ({ navigation }) => {
  const { setUser, setIsAuth, key } = useAuth();

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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Placeholder image at the top */}
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          paddingRight: theme.paddings.large,
        }}
        onPress={() => navigation.navigate("RegForm")}
      >
        <CustomText fontSize="subtitle" fontWeight="bold" style={{}}>
          Register here:
          <CustomText fontSize="huge" fontWeight="bold" style={{}}>
            💿
          </CustomText>
        </CustomText>
      </TouchableOpacity>
      <CustomText fontSize="subtitle" fontWeight="bold" style={{}}>
        Or login below:
      </CustomText>

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

      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
