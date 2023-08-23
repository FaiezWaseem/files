import React from 'react';
import {
  Input,
  Text,
  width,
  Center,
  Button,
} from 'rn-faiez-components';
import colors from '../utils/colors'
import { BottomSheet } from 'react-native-btr';
const Dialog = ({
  visible,
  toggleDialog,
  title,
  placeholder,
  onChangeText,
  value,
  onPress,
}) => {
  return (
    <BottomSheet
      visible={visible}
      //setting the visibility state of the bottom shee
      onBackButtonPress={toggleDialog}
      //Toggling the visibility state on the click of the back botton
      onBackdropPress={toggleDialog}
      //Toggling the visibility state on the clicking out side of the sheet
    >
      <Center flex>
        <Center w={width(80)} bg={colors.darkModal} rounded={8} p={8}>
          <Text color={colors.white} m={8} fontSize={24}>
            {title}
          </Text>
          <Input
            w={'90%'}
            placeholder={placeholder}
            p={8}
            color={colors.white}
            hintColor={'grey'}
            bg={colors.dark}
            rounded={8}
            mb={8}
            value={value}
            onChangeText={onChangeText}
          />
          <Button
            onPress={onPress}
            style={{
              backgroundColor: colors.green,
              borderRadius: 8,
              width: 50,
              height: 50,
              padding: 8,
              justifyContent: 'center',
            }}
            txtStyle={{
              color: colors.white,
              textAlign: 'center',
            }}>
            OK
          </Button>
        </Center>
      </Center>
    </BottomSheet>
  );
};

export default Dialog;