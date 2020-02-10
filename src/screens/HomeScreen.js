import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet, 
  Text,
  Alert,
  ActivityIndicator,
  View,
  Platform,
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
  Picker,
  Icon,
} from 'native-base';
//import { SafeAreaView } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

import HeaderHome from '../components/HeaderHome';

import bg from '../assets/bg2.jpg'
import placeholder from '../assets/cameraplaceholder.jpg'
import { getStringifyDate } from '../utils';

export default class HomeScreen extends Component {

  state = {
    curp: '',
    nombre: '',
    edad: '',
    ocupacion: '',
    tipo: '',
    telefono: '',
    direccion: '',
    municipio: '',
    estado: '',
    imagen: '',
    imagen_uri: '',
    imagen_type: '',
    requesting: false,
  };

  static navigationOptions = {
    drawerLabel: 'Solicitud',
  };

  onSelectPicture = (has_image) => {
    var customButtons = [];

    if ( has_image ) {
      customButtons = [{
        name: 'Eliminar',
        title: 'Eliminar',
      }]
    }

    const cameraOptions = {
      title: 'Selecciona una imagen',
      customButtons: customButtons,
      quality: 0.7,
      mediaType: 'photo',
      allowsEditing: true,
      maxWidth: 1024,
    };

    setTimeout( () => {
      this.setState({
        ...this.state,
        requesting: true,
      });
    }, 1500);

    ImagePicker.showImagePicker(cameraOptions, response => {
      console.log('showImagePicker', response);
      
      if ( response.didCancel ) {
        console.log('User cancelled');
        this.setState({
          ...this.state,
          requesting: false,
        });
      } else if ( response.error ) {
        console.log('Error selecting image');
        this.setState({
          ...this.state,
          requesting: false,
        });
      } else if ( response.customButton ) {
        console.log('Deleting image');
        this.setState({
          ...this.state,
          imagen: '',
          imagen_uri: '',
          imagen_type: '',
          requesting: false,
        });
      } else {
        console.log(response.uri);

        this.setState({
          ...this.state,
          imagen: response.data,
          imagen_uri: response.uri,
          imagen_type: response.type,
          requesting: false,
        });
      }
    });
  };

  uploadPicture = async (post_id) => {
    const { imagen, imagen_uri, imagen_type } = this.state;

    // jpg, gif, png, etc.
    const type = imagen_type.split('/');

    // Build formData object.
    let formData = new FormData();
    formData.append('post', post_id);
    formData.append('fileKey', {
      uri: 'android' == Platform.OS ? imagen_uri : imagen_uri.replace('file://', ''),
      type: imagen_type,
      name: `solicitud-${post_id}_` + getStringifyDate() + `.${type[1]}`,
    });

    console.log('Upload data', Platform.OS, formData);

    return await fetch('http://app.labmake.mx/wp-json/bplus/api/solicitud/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  onSubmit = async () => {
    console.log('Submit pressed');

    this.setState({
      ...this.state,
      requesting: true,
    });

    fetch('http://app.labmake.mx/wp-json/bplus/api/solicitud', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then( async (response) => {
      const post_id = await response.json();

      console.log('Server response', post_id, response.text);

      if ( post_id > 0 ) {
        try {
          const response = await this.uploadPicture(post_id);
          const data = await response.json();
    
          console.log('Trying to upload image.', response, response.status, data);

          this.setState({
            curp: '',
            nombre: '',
            edad: '',
            ocupacion: '',
            tipo: '',
            telefono: '',
            direccion: '',
            municipio: '',
            estado: '',
            imagen: '',
            imagen_uri: '',
            imagen_type: '',
            requesting: false,
          });

          Alert.alert(
            'Solicitud enviada',
            'Gracias por enviar tu solicitud, en breve nos pondremos en contacto contigo'
          );
    
        } catch (error) {
          console.log('Error uploading image.', error);

          this.setState({
            ...this.state,
            requesting: false,
          });

          Alert.alert(
            'Error inesperado',
            'Ocurrió un error al tratar de cargar tu imagen, por favor vuelva a intentarlo'
          );
        }
      } else {
        Alert.alert(
          'Error inesperado',
          'Ocurrió un error al tratar de enviar tus datos, por favor vuelva a intentarlo'
        );

        this.setState({
          ...this.state,
          requesting: false,
        });
      }
    }).catch((error) => {
      console.log('ERROR', error);

      Alert.alert(
        'Error inesperado',
        'Ocurrió un error al tratar de enviar tus datos, por favor vuelva a intentarlo'
      );

      this.setState({
        ...this.state,
        requesting: false,
      });
    })
  };

  render() {
    const {
      nombre,
      curp,
      edad,
      ocupacion,
      tipo,
      telefono,
      direccion,
      municipio,
      estado,
      imagen,
      imagen_uri,
      imagen_type,
      requesting,
    } = this.state;

    var has_image = false;

    const base64_image = {
      uri: "data:" + imagen_type + ";base64," + imagen,
    };

    if ( imagen.length > 0 ) {
      has_image = true;
    }

    const formValid = nombre.length > 0 && 
      curp.length > 0 && 
      edad.length > 0 && 
      ocupacion.length > 0 && 
      tipo.length > 0 && 
      telefono.length > 0 && 
      direccion.length > 0 &&
      municipio.length > 0 &&
      estado.length > 0 && 
      imagen.length > 0;

    return (
      <>
      { requesting && 
        <View style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000000,
        }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      }
      <Container>
        <HeaderHome 
          {...this.props} 
          title="Solicitud" 
          showRight={ true } 
          canSend={ formValid } 
          onSubmit={() => {
            this.onSubmit();
          }}
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
              <Input 
              value={nombre} 
              returnKeyType="next" 
              autoCapitalize="words" 
              autoCompleteType="name" 
              textContentType="name"
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  nombre: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={{marginTop: 10}}>
              <Label>CURP</Label>
              <Input 
              value={curp} 
              returnKeyType="next" 
              autoCapitalize="characters" 
              maxLength={ 18 } 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  curp: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Edad</Label>
              <Input 
              value={edad} 
              returnKeyType="next" 
              keyboardType="number-pad" 
              autoCompleteType="off"
              maxLength={ 3 } 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  edad: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Ocupación</Label>
              <Input 
              value={ocupacion} 
              returnKeyType="next" 
              textContentType="jobTitle"
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  ocupacion: data,
                })
              }} />
            </Item>

            {/* <Item floatingLabel style={styles.item}> */}
              <Label style={{
                paddingTop: 15,
                paddingLeft: 5,
              }}>Tipo de prótesis</Label>
              {/* <Input 
              value={tipo} 
              returnKeyType="next" 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  tipo: data,
                })
              }} /> */}

            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Seleccione el tipo de prótesis"
              placeholderStyle={{ color: "#888" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={tipo}
              onValueChange={(data) => {
                this.setState({
                  ...this.state,
                  tipo: data,
                })
              }}
            >
              <Picker.Item label="Antebrazo" value="Antebrazo" />
              <Picker.Item label="Brazo" value="Brazo" />
              <Picker.Item label="Dedo" value="Dedo" />
              <Picker.Item label="Mano" value="Mano" />
            </Picker>

            {/* </Item> */}
          </Card>

          <Card style={styles.card}>
            <CardItem header>
              <Text style={styles.title}>
              Información para poder ponernos en contacto contigo.
              </Text>
            </CardItem>

            <Item floatingLabel>
              <Label>Teléfono</Label>
              <Input 
              value={telefono} 
              returnKeyType="next" 
              autoCompleteType="tel" 
              textContentType="telephoneNumber"
              keyboardType="phone-pad" 
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  telefono: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Dirección</Label>
              <Input 
              value={direccion} 
              returnKeyType="next" 
              autoCompleteType="street-address" 
              textContentType="streetAddressLine1"
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  direccion: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Ciudad / Municipio</Label>
              <Input 
              value={municipio} 
              returnKeyType="next" 
              textContentType="addressCity"
              onChangeText={(data) => {
                this.setState({
                  ...this.state,
                  municipio: data,
                })
              }} />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label>Estado</Label>
              <Input 
              value={estado} 
              returnKeyType="next" 
              textContentType="addressState"
              onChangeText={(data) => {
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

              <TouchableWithoutFeedback onPress={() => {
                this.onSelectPicture(has_image);
              }}>
                <ImageBackground 
                  source={ has_image ? base64_image : placeholder }
                  resizeMethod="scale" 
                  resizeMode="cover"
                  style={{
                    height: 200,
                    width: "100%",
                    flex: 1,
                  }} 
                  imageStyle={{
                    resizeMode: has_image ? 'cover' : 'contain',
                    backgroundColor: has_image ? 'transparent' : 'rgba(247, 247, 247, 1)',
                    width: "100%",
                    height: "100%",
                  }} />
              </TouchableWithoutFeedback>
            </Card>

          </Form>
          
        </Content>

        </ImageBackground>
        
      </Container>
      </>
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