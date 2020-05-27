import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import { withFirebaseHOC } from "../config/Firebase";
import User from "../assets/databases/User";

const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password should be at least 6 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required"),
  check: Yup.boolean().oneOf([true], "Please check the agreement")
});

function Signup({ navigation, firebase }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("ios-eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("ios-eye");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );

  function goToLogin() {
    return navigation.navigate("Login");
  }

  function handlePasswordVisibility() {
    if (passwordIcon === "ios-eye") {
      setPasswordIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === "ios-eye-off") {
      setPasswordIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === "ios-eye") {
      setConfirmPasswordIcon("ios-eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === "ios-eye-off") {
      setConfirmPasswordIcon("ios-eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  function drop_table_user() {
    User.dropTable();
    console.log('테이블 초기화 성공');
  }
  
  async function create_user(value) {
    User.createTable();

    const user = new User(value);
    user.save();
  }


  async function firebase_user(values){
    const { displayName, email, password, age ,height,weight } = values;
    try {
      const response = await firebase.signupWithEmail(email, password)
      if (response.user.uid) {
        const { uid } = response.user;
        const userData = { email, displayName, uid };
        await firebase.createNewUser(userData);    
        }        
        navigation.navigate("App");
      } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  async function handleOnSignup(values, actions) {

    const { displayName, email, password, age ,height,weight } = values;
    const formData = new FormData();
    formData.append('user_name',displayName);
    formData.append('user_email',email);
    formData.append('user_password',password);
    formData.append('user_birthday','1996-09-24');
    formData.append('user_height',height);
    formData.append('user_weight',weight);
    formData.append('user_gender','M');

    fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/signup`,
    { 
      method: 'POST',
      body:formData
    })
    .then((res) => res.text())
    .then(res => {
      const abc = {name:displayName,email:email,age:Number(age),height:Number(height),weight:Number(weight),gender:'M'};
      create_user(abc);
      firebase_user(values);
      console.log(res);
    })
    .catch((e) => console.log(e));
  }
  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <ScrollView>
        <Formik
          initialValues={{
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
            age: "",
            height:"",
            weight:'',
            check: false
          }}
          onSubmit={(values, actions) => {
            handleOnSignup(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
            <>
              <FormInput
                name="name"
                value={values.displayName}
                onChangeText={handleChange("displayName")}
                placeholder="Enter your full name"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("displayName")}
              />
              <ErrorMessage errorValue={touched.displayName && errors.displayName} />
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur("email")}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Enter password"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("password")}
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons name={passwordIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name="password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                placeholder="Confirm password"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                    <Ionicons
                      name={confirmPasswordIcon}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                }
              />
              <FormInput
                name="age"
                
                value={values.age}
                onChangeText={handleChange("age")}
                placeholder="age"
                onBlur={handleBlur("age")}
                autoCapitalize="none"
              />

              <FormInput
                name="height"
                
                value={values.height}
                onChangeText={handleChange("height")}
                placeholder="height"
                onBlur={handleBlur("height")}
                autoCapitalize="none"
              />

              <FormInput
                name="weight"
                
                value={values.weight}
                onChangeText={handleChange("weight")}
                placeholder="weight"
                onBlur={handleBlur("weight")}
                autoCapitalize="none"
              />
              


              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon="check-box"
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                title="Agree to terms and conditions"
                checkedTitle="You agreed to our terms and conditions"
                checked={values.check}
                onPress={() => setFieldValue("check", !values.check)}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="SIGNUP"
                  buttonColor="#F57C00"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
        </Formik>
        <Button
          title="Have an account? Login"
          onPress={goToLogin}
          titleStyle={{
            color: "#039BE5"
          }}
          type="clear"
        />
       </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  }
});

export default withFirebaseHOC(Signup);
