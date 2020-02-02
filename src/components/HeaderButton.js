import React, { Component } from 'react'

import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

export default class HeaderButton extends Component {
    render() {
        return (
            <TouchableOpacity 
                onPress={() => {
                    //this.props.navigation.navigate('VideoPlayer');
                }} 
                style={{paddingLeft: 10}}
            >
                <Icon name="menu" />
            </TouchableOpacity>
        )
    }
}