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

const companyContactMethods = [
  {
    key: '1',
    type: 'envelope-square',
    text: 'labmakemexico@gmail.com',
    url: 'mailto:labmakemexico@gmail.com',
  },
  {
    key: '2',
    type: 'globe',
    text: 'LabMake.mx',
    url: 'https://labmake.mx',
  },
  {
    key: '3',
    type: 'facebook-official',
    text: 'LabMake México',
    url: 'https://facebook.com/LabMakeMexico',
  },
  {
    key: '4',
    type: 'instagram',
    text: '@Labmake_mexico',
    url: 'https://instagram.com/Labmake_mexico',
  },
  {
    key: '5',
    type: 'whatsapp',
    text: '(747) 499 8586',
    url: 'whatsapp://527474998586',
  },
];

const orgContactMethods = [
  {
    key: 'org1',
    type: 'envelope-square',
    text: 'fundacionlabmakemexico@gmail.com',
    url: 'mailto:fundacionlabmakemexico@gmail.com',
  },
  {
    key: 'org2',
    type: 'globe',
    text: 'fundacionlabmake.org',
    url: 'https://www.fundacionlabmake.org/',
  },
];

export default class ContactScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Contacto',
  };

  buildContactItem = ({item}) => {
    console.log(item);

    return (
      <TouchableWithoutFeedback onPress={() => {
        Linking.openURL(item.url);
      }}>
        <View key={item.key} style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 8,
          marginBottom: 8,
        }}>
          <Icon name={item.type} type="FontAwesome" />
          <Text style={{
            paddingTop: 4,
            paddingLeft: 10,
          }}>{item.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    
    return (
      <Container>
        <HeaderHome {...this.props} title="Contacto" />

        <Content>
        
        <ImageBackground 
          style={{
            height: 250,
            backgroundColor: 'rgba(165, 165, 165, 1)',
          }} resizeMode="cover"
          source={mainImage} />

          <View style={{ padding: 15 }}>

            <Text style={{
              fontSize: 14,
              lineHeight: 16,
            }}>
              Hola, somos LabMake México una iniciativa que busca desarrollar 
              prótesis con tecnología en impresión 3D para mejorar un pleno 
              desarrollo de calidad de vida de las personas que la necesitan, 
              nos gustaría ayudarte.
            </Text>

            <Text style={{
              fontSize: 13,
              marginTop: 15,
              marginBottom: 15,
              fontWeight: '700',
            }}>Encuentranos en:</Text>

            <Text style={{
              fontSize: 16,
              marginTop: 15,
              marginBottom: 15,
              fontWeight: '700',
            }}>LabMake México</Text>

            <FlatList 
            data={companyContactMethods} 
            renderItem={ this.buildContactItem }>
            </FlatList>

            <Text style={{
              fontSize: 16,
              marginTop: 15,
              marginBottom: 15,
              fontWeight: '700',
            }}>Fundación LabMake México</Text>

            <FlatList 
            data={orgContactMethods} 
            renderItem={ this.buildContactItem }>
            </FlatList>
            
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