import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../../../consts/colors'
const Header = () => {
  return (
    <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              Dumbledore
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
            Where do you want to fly to !!! 
          </Text>
        </View>
       
      </View>
  )
}
const style = StyleSheet.create({
    header: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },})
export default Header