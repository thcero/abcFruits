import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import theme from "../theme";
import CustomText from "./helperComponents/CustomText";
import { pickImage, takePictureAndReturnUri } from "../imagePickerHelper";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export const RegForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      picture: "",
      age: "",
      gender: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  // stores image 'uri'
  const [image, setImage] = useState(null);

  return (
    <SafeAreaView style={[theme.container, styles.formContainer]}>
      {/* form title */}
      <CustomText style={styles.title}>Register Here</CustomText>
      <CustomText style={styles.subtitle}>
        to start saving your fav fruits and to make fruity friends
      </CustomText>

      {/* username input */}
      <View style={styles.formField}>
        <CustomText style={styles.label}>
          Username<CustomText fontSize="small">*</CustomText>
        </CustomText>
        <Controller
          control={control}
          name="username"
          rules={{
            required: {
              value: true,
              message: "Your username is required.",
            },
            minLength: {
              value: 6,
              message: "Your username must be at least 5 characters.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputField, styles.normalInput]}
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username.message}</Text>
        )}
      </View>
      <View style={styles.formField}>
        {/* email input */}
        <CustomText style={styles.label}>
          Email<CustomText fontSize="small">*</CustomText>
        </CustomText>

        <Controller
          control={control}
          name="email"
          rules={{
            required: {
              value: true,
              message: "Your email is required.",
            },
            minLength: {
              value: 6,
              message: "Your email must be at least 6 characters long.",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Your email is in an incorrect format",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputField, styles.normalInput]}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>
      <View style={styles.ageAndGenderContainer}>
        <View style={styles.formField}>
          {/* age input */}
          <View style={[styles.formField, styles.smallFormField]}>
            <CustomText style={styles.label}>
              Age<CustomText fontSize="small">*</CustomText>
            </CustomText>

            <Controller
              control={control}
              name="age"
              rules={{
                required: "Your age is required.",
                min: {
                  value: 8,
                  message: "Your age must be at least 8.",
                },
                max: {
                  value: 130,
                  message: "Your age cannot be greater than 130.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.inputField, styles.smallInput]}
                  placeholder="Age"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.age && (
              <Text style={styles.errorText}>{errors.age.message}</Text>
            )}
          </View>
        </View>
        {/* gender input */}
        <View style={[styles.formField, styles.smallFormField]}>
          <CustomText style={styles.label}>Gender</CustomText>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropBox}>
                <Picker
                  selectedValue={value}
                  onValueChange={(val) => onChange(val)}
                  style={{ width: 175, height: 55 }}
                >
                  <Picker.Item label="Select gender" value="" />
                  <Picker.Item label="female" value="female" />
                  <Picker.Item label="male" value="male" />
                  <Picker.Item label="non-binary" value="non-binary" />
                </Picker>
              </View>
            )}
          />
        </View>
      </View>

      {/* picture input */}
      <View style={styles.formField}>
        <CustomText style={styles.label}>Picture</CustomText>
        <Controller
          control={control}
          name="picture"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.pictureButtonsContainer}>
              <TouchableOpacity
                style={styles.picFunc}
                onPress={async () => {
                  const image = await pickImage();
                  setImage(image);
                  onChange(image);
                }}
              >
                <CustomText>🔼</CustomText>
                <CustomText>upload</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picFunc}
                onPress={async () => {
                  const image = await takePictureAndReturnUri();
                  setImage(image);
                  onChange(image);
                }}
              >
                <CustomText>📸</CustomText>
                <CustomText>Take a pic</CustomText>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* submit form btn */}
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: theme.paddings.large,
    justifyContent: "space-evenly",
    marginBottom: theme.margins.large * 5,
  },
  formField: {
    alignSelf: "flex-start",
  },
  smallFormField: {
    marginRight: theme.margins.large * 4,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.weights.bold,
    marginBottom: theme.margins.std,
  },
  subtitle: {
    alignSelf: "flex-end",
    maxWidth: theme.widths.screen / 2,
    margin: theme.margins.large,
  },
  label: {
    fontWeight: theme.weights.bold,
  },
  inputField: {
    borderWidth: theme.borderWidths.std,
    borderColor: "#ccc",
    borderRadius: theme.borderRadius.round,
    padding: theme.paddings.std,
  },
  normalInput: { width: theme.widths.screen * 0.86 },
  smallInput: { width: theme.widths.screen * 0.28 },
  ageAndGenderContainer: {
    width: theme.widths.screen * 0.86,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "stretch",
  },
  pictureButtonsContainer: {
    flexDirection: "row",
    width: theme.widths.screen * 0.46,
  },
  picFunc: {
    maxWidth: 150,
    alignItems: "center",
    padding: theme.paddings.std,
    marginTop: theme.margins.large,
  },
  buttonContainer: { alignSelf: "flex-end" },
  errorText: {
    color: "red",
    marginBottom: theme.margins.std,
  },
  dropBox: {
    borderWidth: theme.borderWidths.std,
    borderColor: "#ccc",
    borderRadius: theme.borderRadius.round,
  },
});
