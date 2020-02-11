import React, {Component} from 'react';

import {
    Text,
} from 'react-native';

import { 
    Header,
    Left,
    Body,
    Right,
    Icon,
    Button,
} from 'native-base';

import PropTypes from 'prop-types'

const HeaderHome = (props) => (
    <Header transparent noShadow>
        <Left>
            <Icon name="menu" style={{
                color: '#bf0310',
                paddingLeft: 15,
                paddingRight: 10,
            }} onPress={ () => {
               props.navigation.toggleDrawer(); 
            }}></Icon>
        </Left>
        <Body>
            <Text style={{
                color: '#BF0310',
                fontWeight: '700',
            }}>{ props.title }</Text>
        </Body>
        <Right>
        {
            props.showRight ? 
            <Button success small bordered={ !props.canSend } disabled={ !props.canSend } onPress={() => {
                props.onSubmit();
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: props.canSend ? 'white' : 'gray',
                }}>{ props.canSend ? '    Enviar    ' : 'Enviar' }</Text>
            </Button>
        : null
         }
         </Right>
    </Header>
)

HeaderHome.defaultProps = {
    showRight: false,
    canSend: false,
}

export default HeaderHome;