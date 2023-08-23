import React from 'react';
import { Center, Input, Button, Text } from 'rn-faiez-components';
import { ActivityIndicator } from 'react-native'
import colors from '../utils/colors';
import mydb from '../utils/tinylib';
import Storage from '../utils/storage'

export default ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onSignInClick = () => {
    if (username.length > 0 && password.length > 0) {
      setLoading(true)
      mydb.login(username , password)
      .then( async (res) =>{
        if(res.status == 200){
             await Storage.save('token' , res.data.token)
             navigation.replace('Splash')
              setLoading(false)
        }else{
          setLoading(false)
          alert('Authentication Failed')
        }
      })
    } else {
      alert('Please Enter All Details');
    }
  };
  return (
    <Center flex bg={colors.dark2} p={5}>
      <Text color={colors.white} fontSize={22} mb={4}>
        Files Login
      </Text>
      <Input
        w={'100%'}
        h={50}
        placeholder={'Enter Username'}
        bg={colors.dark}
        p={8}
        rounded={10}
        color={colors.white}
        mb={5}
        value={username}
        onChangeText={(txt) => setUsername(txt)}
        hintColor={'grey'}
      />
      <Input
        w={'100%'}
        h={50}
        placeholder={'Enter Password'}
        bg={colors.dark}
        p={8}
        rounded={10}
        color={colors.white}
        mb={5}
        value={password}
        onChangeText={(txt) => setPassword(txt)}
        hintColor={'grey'}
      />
      <Button
        color={colors.white}
        style={{
          backgroundColor: colors.green,
          padding: 8,
          borderRadius: 12,
          width: '60%',
          marginTop: 8,
        }}
        txtStyle={{
          textAlign: 'center',
        }}
        fontSize={20}
        onPress={onSignInClick}
        >
        {isLoading ? <ActivityIndicator /> : "Sign-In"}
      </Button>
    </Center>
  );
};
