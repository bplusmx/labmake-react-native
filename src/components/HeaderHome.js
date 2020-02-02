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
            <Icon name="menu" style={{color: '#bf0310'}} onPress={ () => {
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
            <Button bordered success small disabled={!props.canSend}>
                <Text style={{
                    fontWeight: '700',
                    color: 'green',
                }}>Enviar</Text>
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