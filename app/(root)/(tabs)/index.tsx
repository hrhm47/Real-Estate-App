import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar translucent={true} style="dark" />
      <Text className="font-bold my-10 font-rubkik text-3xl">Welcome to Real Estate App</Text>
    </View>
  );
}
