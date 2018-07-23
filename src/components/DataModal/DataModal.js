import React, {Component}  from 'react';
import styled from 'styled-components/native';
import {bool, string, func} from 'prop-types';
import {Text, Button, DataPicker, Modal} from '~/components/shared';
import {TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'


export const DataModal = class DataModal extends Component {
  constructor(props){
    super(props);
   this.handlePress = this.handlePress.bind(this); 
   this.handleClose = this.handleClose.bind(this);
  }

  handlePress(val){
    this.props.onSelect(val);
  }

  handleClose(){
    console.log("touch bakground")
    this.props.close();
  }

  render() {
    return (
          <Modal visible={this.props.visible} close={() => {this.handleClose()} }>
            <WrapperModal>
              <Content>
              <DataPicker 
              data={this.props.data}
              onSelect={this.handlePress}
              buttonText = "Select"
              title = {this.props.title}/>
              </Content>
            </WrapperModal>
          </Modal>
      );
  }
}

const WrapperModal = styled.View`
  background-color: ${props => props.theme.bg};
  width: 300;
  border-radius: 2.5;
`;

const Content = styled.View``;

DataModal.propTypes = {
  data : PropTypes.array,
  title : PropTypes.string, 
  buttonText : PropTypes.string,
  visible : PropTypes.bool,
  close : PropTypes.func
}