import React from 'react';
import { Center, Text } from 'rn-faiez-components';
import { Image, ActivityIndicator } from 'react-native';
import colors from '../utils/colors';
import mydb from '../utils/tinylib';
import Storage from '../utils/storage';
const logo = require('../../assets/folder-1484.png');
export default ({ navigation }) => {
  React.useEffect(() => {
    mydb.isAuthRequired().then(async (res) => {
      console.log(res)
      Storage.save('isAuthRequired', res.data.toString());
      if (res.data) {
        const token = (await Storage.get('token')) || null;
        if (token) {
          navigation.replace('Home');
        } else {
          navigation.replace('Auth');
        }
      }else{
          navigation.replace('Home');
      }
    })
    .catch(err => {
      console.warn(err)
      // alert(err)
    })
  }, []);
  return (
    <Center flex bg={colors.dark2}>
      <Image
        source={logo}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text color={colors.white} fontSize={22} fontWeight={'bold'}>
        Files
      </Text>
      <ActivityIndicator color={colors.white} />
    </Center>
  );
};
