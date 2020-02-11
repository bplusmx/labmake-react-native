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
  Button,
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
    estado: 'Guerrero',
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
      takePhotoButtonTitle: 'Tomar foto...',
      chooseFromLibraryButtonTitle: 'Seleccionar foto existente...',
      chooseWhichLibraryTitle: 'Selecionar librería de fotos',
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
          const response_upload = await this.uploadPicture(post_id);
          const data = await response_upload.json();
    
          console.log('Trying to upload image.', response_upload, response_upload.status, data);

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
            "Ocurrió un error al tratar de cargar tu imagen, por favor vuelva a intentarlo. \n" + error
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
        "Ocurrió un error al tratar de enviar tus datos, por favor vuelva a intentarlo.\n " + response.text
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
              maxLength={ 2 } 
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
                color: '#555',
              }}>Tipo de prótesis</Label>

            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Seleccione el tipo de prótesis"
              placeholderStyle={{ color: "#888" }}
              placeholderIconColor="#007aff" 
              headerBackButtonText="Regresar" 
              iosHeader="Seleccione"
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
              Información de contacto
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

            {/* <Item floatingLabel style={styles.item}> */}
              <Label style={{
                paddingTop: 15,
                paddingLeft: 5,
                color: '#555',
              }}>Estado</Label>

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Seleccione su estado de residencia"
                placeholderStyle={{ color: "#888" }} 
                placeholderIconColor="#007aff" 
                headerBackButtonText="Regresar" 
                iosHeader="Seleccione" 
                style={{ width: undefined }}
                selectedValue={estado}
                onValueChange={(data) => {
                  this.setState({
                    ...this.state,
                    estado: data,
                  })
                }}
              >
                <Picker.Item label="Aguascalientes" value="Aguascalientes" />
                <Picker.Item label="Baja California" value="Baja California" />
                <Picker.Item label="Baja California Sur" value="Baja California Sur" />
                <Picker.Item label="Campeche" value="Campeche" />
                <Picker.Item label="Chiapas" value="Chiapas" />
                <Picker.Item label="Chihuahua" value="Chihuahua" />
                <Picker.Item label="Ciudad de México (CDMX)" value="Ciudad de México (CDMX)" />
                <Picker.Item label="Coahuila" value="Coahuila" />
                <Picker.Item label="Colima" value="Colima" />
                <Picker.Item label="Durango" value="Durango" />
                <Picker.Item label="Guanajuato" value="Guanajuato" />
                <Picker.Item label="Guerrero" value="Guerrero" />
                <Picker.Item label="Hidalgo" value="Hidalgo" />
                <Picker.Item label="Jalisco" value="Jalisco" />
                <Picker.Item label="México" value="México" />
                <Picker.Item label="Michoacán" value="Michoacán" />
                <Picker.Item label="Morelos" value="Morelos" />
                <Picker.Item label="Nayarit" value="Nayarit" />
                <Picker.Item label="Nuevo León" value="Nuevo León" />
                <Picker.Item label="Oaxaca" value="Oaxaca" />
                <Picker.Item label="Puebla" value="Puebla" />
                <Picker.Item label="Querétaro" value="Querétaro" />
                <Picker.Item label="Quintana Roo" value="Quintana Roo" />
                <Picker.Item label="San Luis Potosí" value="San Luis Potosí" />
                <Picker.Item label="Sinaloa" value="Sinaloa" />
                <Picker.Item label="Sonora" value="Sonora" />
                <Picker.Item label="Tabasco" value="Tabasco" />
                <Picker.Item label="Tamaulipas" value="Tamaulipas" />
                <Picker.Item label="Tlaxcala" value="Tlaxcala" />
                <Picker.Item label="Veracruz" value="Veracruz" />
                <Picker.Item label="Yucatán" value="Yucatán" />
                <Picker.Item label="Zacatecas" value="Zacatecas" />
              </Picker>
            {/* </Item> */}

            </Card>

            <Card style={{
              borderColor: '#891822',
              marginBottom: 20,
            }}>
              <CardItem header>
                <Text style={styles.title}>
                Agrega foto del área que necesita prótesis
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

            <Button full success rounded bordered={ !formValid } disabled={ !formValid } style={{
              marginBottom: 20,
            }} onPress={() => {
              this.onSubmit();
            }}>
              <Text style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
                color: formValid ? 'white' : 'gray',
              }}>Enviar solicitud</Text>
            </Button>

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
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 2,
    backgroundColor: '#fff',
    fontWeight: '500',
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