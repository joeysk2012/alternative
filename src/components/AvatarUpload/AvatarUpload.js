import React, {Component} from 'react';
import styled from 'styled-components/native';
import { func, object, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity} from 'react-native';

// Local
import {ImagesApp} from '~/config';

class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: ''
    };
    this.handleUpload = this.handleUpload.bind(this);
  }


  handleUpload(){

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