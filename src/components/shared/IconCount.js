import React, {Component} from 'react';
import styled, {css} from 'styled-components/native';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import IconBadge from 'react-native-icon-badge';

// local
import {Text, Icon} from '~/components/shared';
import {navigatorStyle} from '~/config';
import {getNavigatorContext} from '~/enhancers';


export const IconCount = class IconCount extends Component {
  constructor(props){
    super(props);
    this.openMessages = this.openMessages.bind(this);
  }

  openMessages(){   
        this.props.navigator.push({
        screen: 'Notifications',
        navigatorStyle
      });
  }

  render() {
    return (
      <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
            <IconBadge
              MainElement={
                <Icon inverted name="bell" onPress={this.openMessages} />
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>{this.props.count}</Text>
              }
              IconBadgeStyle={
                {
                width: this.props.count === 0 ? 0 : 18,
                height: this.props.count === 0 ? 0 : 18,
                backgroundColor: '#ee4035',
                left: 17,
                }
              }
              />
      </View>
      );
    }
  }

IconCount.propTypes = {
    count : PropTypes.number,
};