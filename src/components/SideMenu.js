import React, {Component} from 'react';
import { 
    View, 
    Image,
    ImageBackground,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { ScrollView } from 'react-native-gesture-handler';

import logo from '../assets/logo.png'
import bg from '../assets/bg3.jpg'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {
    paddingLeft: 8,
    paddingRight: 8,
    height: height,
  },
  bgStyle: {
    resizeMode: 'cover',
  },
});

const SideMenu = (props) => (
    <ImageBackground 
          style={styles.bg} 
          source={ bg } 
          imageStyle={styles.bgStyle}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        
        <View style={{
            alignItems: 'center',
            marginTop: 50,
            backgroundColor: '#fff',
            borderRadius: 90,
        }}>
            <Image source={ logo } style={{
                width: 150,
                height: 150,
                paddingTop: 10,
            }} />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
    </ImageBackground>
)

export default SideMenu;