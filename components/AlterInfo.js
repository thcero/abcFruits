import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import theme from "../theme";
import { CustomText } from "./helperComponents/CustomText";
import { pickImage, takePictureAndReturnUri } from "../imagePickerHelper";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useAuth } from "./helperComponents/AuthContextProvider";
import { PrimaryButton } from "./helperComponents/PrimaryButton";
import { updateUser } from "../services";
import { printAllErs } from "../helperFunctions";
import RNPickerSelect from "react-native-picker-select";
import { countriesForPicker } from "../countriesFormattedList";

export const AlterInfo = ({ navigation }) => {
  const { user, setUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      fullname: user?.fullname || "",
      password: "",
      email: user?.email || "",
      picture: user?.picture || "",
      country: user?.country || "United Kingdom",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateUser({ ...user, ...data });
      if (updatedUser) {
        setUser(updatedUser);
        navigation.navigate("ProfScreen");
      }
    } catch (e) {
      printAllErs(e);
    }
  };

  // stores image 'uri' — pre-filled with current profile picture
  const [image, setImage] = useState(user?.picture || null);

  return (
    <SafeAreaView style={styles.formContainer}>
      <ScrollView>
        {/* form title */}
        <CustomText style={styles.title}>Update Info</CustomText>
        <CustomText fontSize="small" style={styles.subtitle}>
          update your account details below
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
                value: 5,
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
            <CustomText style={styles.errorText}>{errors.username.message}</CustomText>
          )}
        </View>

        {/* fullname input */}
        <View style={styles.formField}>
          <CustomText style={styles.label}>
            Fullname<CustomText fontSize="small">*</CustomText>
          </CustomText>
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: {
                value: true,
                message: "Your fullname is required.",
              },
              minLength: {
                value: 6,
                message: "Your fullname must be at least 6 characters.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.inputField, styles.normalInput]}
                placeholder="Fullname"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fullname && (
            <CustomText style={styles.errorText}>{errors.fullname.message}</CustomText>
          )}
        </View>

        {/* email input */}
        <View style={styles.formField}>
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
            <CustomText style={styles.errorText}>{errors.email.message}</CustomText>
          )}
        </View>

        {/* password input */}
        <View style={styles.formField}>
          <CustomText style={styles.label}>Password</CustomText>
          <Controller
            control={control}
            name="password"
            rules={{
              minLength: {
                value: 6,
                message: "Your password must be at least 6 characters long.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.inputField, styles.normalInput]}
                placeholder="Leave blank to keep current"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <CustomText style={styles.errorText}>{errors.password.message}</CustomText>
          )}
        </View>

        {/* country picker */}
        <View style={styles.formField}>
          <CustomText style={styles.label}>Country</CustomText>
          <Controller
            control={control}
            name="country"
            rules={{
              required: {
                value: true,
                message: "Pick your country",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <RNPickerSelect
                  items={countriesForPicker}
                  onValueChange={(val) => {
                    onChange(val);
                  }}
                  onBlur={onBlur}
                  value={value}
                  style={{
                    inputAndroid: {
                      color: "#000",
                    },
                    inputIOS: {
                      color: "#000",
                    },
                  }}
                />
                {value ? (
                  <CustomText style={{ marginLeft: 8 }}>{value}</CustomText>
                ) : (
                  <CustomText style={{ marginLeft: 8 }}>
                    (Nothing selected yet)
                  </CustomText>
                )}
              </View>
            )}
          />
          {errors.country && (
            <CustomText style={styles.errorText}>{errors.country.message}</CustomText>
          )}
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
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.picPreview}
            />
          )}
        </View>

        <PrimaryButton onPress={handleSubmit(onSubmit)} style={{ alignSelf: "flex-end", marginBottom: 50 }}>
          Update
        </PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: theme.paddings.large,
    flex: 1,
    marginBottom: theme.margins.large,
    backgroundColor: theme.colors.prim,
  },
  formField: {
    alignSelf: "flex-start",
    padding: theme.paddings.std,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: theme.fontSizes.heading,
    fontFamily: theme.fonts.mainBold,
    marginBottom: theme.margins.std,
  },
  subtitle: {
    alignSelf: "flex-end",
    maxWidth: theme.widths.screen / 2,
    marginBottom: theme.margins.large,
  },
  label: {
    fontFamily: theme.fonts.mainBold,
  },
  inputField: {
    borderWidth: theme.borderWidths.std,
    borderColor: theme.colors.coconutBrown,
    borderRadius: theme.borderRadius.round,
    padding: theme.paddings.std,
    backgroundColor: theme.colors.back,
  },
  normalInput: { width: theme.widths.screen * 0.86 },
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
  picPreview: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: theme.margins.large,
    borderWidth: theme.borderWidths.std,
    borderColor: theme.colors.coconutBrown,
  },
  errorText: {
    color: "red",
    marginBottom: theme.margins.std,
  },
});
