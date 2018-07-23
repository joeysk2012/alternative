import React, {Component} from 'react';
import styled from 'styled-components/native';
import {string} from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {map} from 'lodash';
import {FlatList, ScrollView, View, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types'
// Local
import {Text, Button, PickerCustom} from '~/components/shared';
import {padZero} from '~/utils';
// import Picker from 'react-native-wheel-picker';
moment().locale('pt-br');

export const DataPicker = class DataPicker extends Component {
  constructor(props){
    super(props);
   this.handlePress = this.handlePress.bind(this); 
  }

  handlePress(val){
    this.props.onSelect(val);
  }

  render() {
    let listItems;
    const comp = this;
    if(this.props.title ===  "Checklists"){
      let sorted_data = comp.props.data.map(item => item.name).sort()
      listItems = 
        sorted_data.map((item, index) => (
          <TouchableHighlight key={index}>
            <View>
              <Item onPress={() => this.handlePress(item)}>{item}</Item>
            </View>
          </TouchableHighlight>
        ))
    }

    if(this.props.title === "Properties"){
      let sorted_data = comp.props.data.map(item => item.farm).sort()
      listItems = 
        sorted_data.map((item, index) => (
            <TouchableHighlight key={index}>
              <View>
                <Item onPress={() => this.handlePress(item)}>{item}</Item>
              </View>
            </TouchableHighlight>
          ))
    }
        

    return (
        <Wrapper secondary>
          <WrapperHeader>
              <Text align="center" inverted>
                {this.props.title}
              </Text>
            </WrapperHeader>
          <WrapperBody>
        <ScrollView>
          {listItems}
        </ScrollView>
        </WrapperBody>
      </Wrapper>
    );
  }
}

const Item = styled.Text`
  text-align: center;
  font-size: 18;
`;
     
const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  height: 280;
  width: 100%;
`;

const WrapperBody = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 250;
  width: 100%;
  padding-bottom: 40;
`;

const WrapperFooter = styled.View`
  border-top-width: 0.5;
  border-top-color: ${props => props.theme.border};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const WrapperHeader = styled.View`
  background-color: ${props => props.theme.successMenu};
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
  border-top-left-radius: 2.5;
  border-top-right-radius: 2.5;
  justify-content: center;
  align-items: center;
`;

DataPicker.propTypes = {
  data : PropTypes.array,
  title : PropTypes.string, 
  buttonText : PropTypes.string,
}

