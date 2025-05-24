import { Link } from "expo-router";
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
      <Text className="font-bold my-10 font-rubkik text-3xl">Welcome to Real Estate App</Text>
      <Link href={'/sign-in'}>Sign In</Link>
      <Link href={'/explore'}>Explore</Link>
      <Link href={'/profile'}>Profile</Link> 
      <Link href={'/properties/1'}>Default Property</Link>
    </View>
  );
}
