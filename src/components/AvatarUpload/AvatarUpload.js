import React, {Component} from 'react';
import styled from 'styled-components/native';
import { func, object, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity} from 'react-native';

// Local
import {ImagesApp} from '~/config';

var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    cameraRoll: true
  }
};


class Upload extends Component {
  constructor(props){
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }


  handleUpload(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = {uri: response.uri};
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(response.uri)
        this.props.onAvatarChange(source)
      }
    });

  }


  render() {
    return (
        <TouchableOpacity onPress={() => this.handleUpload()} >
            <Wrapper>
                <Image source={require('../../images/pencil.png')}
                style={{ height: 20, width: 20}} />
            </Wrapper>
        </ TouchableOpacity>
    );
    }
  }


  export const AvatarUpload = Upload;

  const Wrapper = styled.View`
  width: 20;
  height: 20;
  margin-left: 8;
  background-color: ${props => props.theme.bg};
  elevation: 1;
`;