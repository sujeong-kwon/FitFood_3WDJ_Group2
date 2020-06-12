import React from "react";
import { Image } from "react-native-elements";

const AppLogo = () => (
  <Image
    source={require("../assets/fitfoodlogo.png")}
    style={{ width: 600, height: 200 }}
  />
);

export default AppLogo;
