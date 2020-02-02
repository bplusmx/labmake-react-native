import React, {Component} from 'react';
import {
  StyleSheet, 
  Image, 
  ImageBackground, 
  Text, 
  View,
  Linking,
} from 'react-native';

import { 
  Container, 
  Content,
  Icon 
} from 'native-base';

import HeaderHome from '../components/HeaderHome';

import { 
  FlatList, 
  TouchableWithoutFeedback 
} from 'react-native-gesture-handler';

import mainImage from '../assets/about.jpg'
import logo_citig from '../assets/logo-citig.png'
import logo_bplus from '../assets/Logo-bplus.png'

export default class InfoScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Acerca de...',
  };

  render() {
    return (
      <Container>
        <HeaderHome {...this.props} title="Información" />

        <Content>
        
        <ImageBackground 
          style={{
            height: 250,
            backgroundColor: 'rgba(165, 165, 165, 1)',
          }} resizeMode="cover"
          source={mainImage} />

          <View style={{ padding: 15 }}>

          <Text style={{
              fontSize: 18,
              marginTop: 6,
              marginBottom: 12,
              fontWeight: '700',
              textAlign: 'center',
            }}>LabMake México</Text>

            <Text style={{
              fontSize: 15,
              lineHeight: 18,
              textAlign: 'center',
              marginLeft: 15,
              marginRight: 15,
            }}>
              LabMake México es una empresa social, que busca desarrollar
              tecnología para mejorar un pleno desarrollo de calidad de vida
              mediante impresión 3D con prótesis y proyectos que
              coadyuven a la educación y a la salud brindando herramientas
              funcionales para la sociedad.
            </Text>

            <Text style={{
              fontSize: 15,
              marginTop: 15,
              marginBottom: 15,
              fontWeight: '700',
              textAlign: 'center',
            }}>Con el apoyo de:</Text>

            <ImageBackground 
              style={{
                height: 150,
              }} resizeMode="contain"
              source={ logo_citig } />

            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              marginTop: 8,
              marginLeft: 15,
              marginRight: 15,
            }}>
              Colegio de Ingenieros en TIC del Estado de Guerrero, A.C.
            </Text>

            <ImageBackground 
              style={{
                marginTop: 30,
                height: 120,
              }} resizeMode="contain"
              source={ logo_bplus } />

            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              marginTop: 8,
              marginLeft: 15,
              marginRight: 15,
            }}>
              bPlus TI
            </Text>

            <Text style={{
              fontSize: 15,
              marginTop: 15,
              marginBottom: 15,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Hecho en Guerrero <Icon name="heart" fontSize={10} style={{
              color: 'red',
              fontSize: 12,
              marginLeft: 15,
            }} />
            </Text>
            
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});