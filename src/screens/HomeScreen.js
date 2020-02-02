import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet, 
  Text, 
  Image,
  View,
} from 'react-native';
import { 
  Container, 
  Content, 
  Form,
  Item,
  Label,
  Input,
  Card,
  CardItem,
  Footer,
  Button, 
  Icon, 
  Fab 
} from 'native-base';
//import { SafeAreaView } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

import HeaderHome from '../components/HeaderHome';

import bg from '../assets/bg2.jpg'
import placeholder from '../assets/cameraplaceholder.jpg'

const cameraOptions = {
  title: 'Selecciona una imagen',
  
};

export default class HomeScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Solicitud',
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      curp: '',
      nombre: '',
      edad: '',
      profesion: '',
      tipo: '',
      imagen: '',
      tel: '',
      direccion: '',
      municipio: '',
      estado: '',
      canSend: false,
    };
  }

  onSelectPicture = () => {
    console.log('Hola');
    ImagePicker.showImagePicker(cameraOptions, response => {
      console.log(response);
      
      if ( response.didCancel ) {
        console.log('User cancelled');
      } else if ( response.error ) {
        console.log('Error selecting image');
      } else {
        
      }
    });
  };

  render() {
    console.log( this.state );
    return (
      <Container>
        <HeaderHome 
          {...this.props} 
          title="Solicitud" 
          showRight={ true } 
          canSend={ this.state.canSend }
        />

        <ImageBackground 
          style={styles.bg} 
          source={ bg } imageStyle={styles.bgStyle}>
        
        <Content>
        
          <Form style={{
            marginTop: 50,
            
          }}>

          <Card style={styles.card}>
            <CardItem header>
              <Text style={styles.title}>
              LabMake México desea ayudar a las personas que necesitan una 
              prótesis a través de un censo; si tú necesitas una, rellena 
              los siguientes datos:
              </Text>
            </CardItem>

            <Item floatingLabel style={styles.item}>
              <Label>Nombre y Apellidos</Label>
              <Input autoCapitalize="words" 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  nombre: data,
                })
              }} />
            </Item>

            <Item floatingLabel>
              <Label>CURP</Label>
              <Input autoCapitalize="characters" maxLength={ 18 } 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  curp: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Edad</Label>
              <Input keyboardType="number-pad" maxLength={ 3 } 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  edad: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Ocupación</Label>
              <Input onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  profesion: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Tipo de prótesis</Label>
              <Input onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  tipo: data,
                })
              }} />
            </Item>
          </Card>

          <Card style={styles.card}>
            <CardItem header>
              <Text style={styles.title}>
              Información para poder ponernos en contacto contigo.
              </Text>
            </CardItem>

            <Item floatingLabel>
              <Label>Teléfono</Label>
              <Input keyboardType="phone-pad" 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  tel: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Dirección</Label>
              <Input onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  direccion: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Ciudad</Label>
              <Input onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  municipio: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Estado</Label>
              <Input onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  estado: data,
                })
              }} />
            </Item>

            </Card>

            <Card style={{
              borderColor: '#891822',
            }}>
              <CardItem header>
                <Text style={styles.title}>
                Agrega una foto del área que necesita una prótesis
                </Text>
              </CardItem>

              <TouchableWithoutFeedback onPress={this.onSelectPicture}>
                <ImageBackground defaultSource={ placeholder } 
                  style={{
                    height: 200, 
                    flex: 1,
                  }} imageStyle={{
                    resizeMode: 'contain',
                    backgroundColor: 'rgba(247, 247, 247, 1)',
                  }} />
              </TouchableWithoutFeedback>
            </Card>

          </Form>
          
        </Content>

        </ImageBackground>

        
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 2,
    backgroundColor: '#fff',
  },
  bg: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
  },
  bgStyle: {
    resizeMode: 'stretch',
  },
  card: {
    padding: 8,
    paddingBottom: 15,
    borderRadius: 10,
    borderColor: '#891822',
  },
  item: {
    marginTop: 8,
  }
});