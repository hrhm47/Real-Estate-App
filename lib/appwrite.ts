import { avatar } from '@/assets/images/avatar.png';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';

export const config = {
    platform: 'com.haseeb.RealEstate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client();

client.setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

// it will allow us to upload and manage avatars
export const avatar = new Avatars(client);

// it will allow us to create new user account 
export const account = new Account(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        if (!response) throw new Error("Login failed");
        const browser = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if (browser.type !== 'success') throw new Error("Login cancelled or failed");
        const url = new URL(browser.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();
        if (!secret || !userId) throw new Error("Failed to login");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Session creation failed");

        return true; // Login successful

    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true; // Logout successful        
    } catch (error) {
        console.error("Logout failed:", error);
        return false; // Logout failed
    }
}

export async function getUser() {
    try {
        const response = await account.get();

        if (response.$id === undefined) {
            const userAvatar = await avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString()
            }     // User data retrieved successfully
        }
    } catch (error) {
        console.error(error);
        return null; // Error retrieving user data

    }
}

