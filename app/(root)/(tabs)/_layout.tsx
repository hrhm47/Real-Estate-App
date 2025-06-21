import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: { boolean; any; string }) => (
    <View className="flex-1 mt-3 flex-col items-center">
        <Image
            source={icon}
            tintColor={focused ? "#0061FF" : "#666876"}
            resizeMode="contain"
            className="size-6"
        />
        <Text
            className={`${focused
                    ? "text-primary-300 font-rubik-medium"
                    : "text-black-200 font-rubik-mediu"
                } text-xs w-full text-center mt-1 `}
        >
            {title}
        </Text>
    </View>
);

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "abosolute",
                    borderTopColor: "#0061FF1A",
                    borderTopWidth: 2,
                    minHeight: 70,
                },
            }}
        >
            {/*home tab*/}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.home} focused={focused} title="Home" />
                    ),
                }}
            />

            {/*Explore tab*/}
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.search} focused={focused} title="Explore" />
                    ),
                }}
            />

            {/*Profile tab*/}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.person} focused={focused} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
