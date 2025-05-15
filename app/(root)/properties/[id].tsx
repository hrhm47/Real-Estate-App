import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Property = () => {
    // to extract the id from the local router 
    const {id} = useLocalSearchParams();
    console.log('\n local search parameter id --> ',id,'\n');

  return (
    <View>
      <Text>Property</Text>
    </View>
  )
}

export default Property