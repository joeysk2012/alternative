import React, {Component}  from 'react';
import styled from 'styled-components/native';
import {func, object, bool, string} from 'prop-types';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

// local
import {Text, IconUri, DatePicker, Icon} from '~/components/shared';
import {getNavigatorContext} from '~/enhancers';
import {DataModal} from '~/components/DataModal';

export const SelectData = class SelectData extends Component {
  constructor(props){
    super(props);
    this.state = {
      isVisible: false, 
      selection: '',

    };
    this.handlePress = this.handlePress.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({isVisible : true})
  }
  handleClose(){
    this.setState({isVisible: false})
  }

  handlePress(val){
    this.setState({isVisible : false})
    this.setState({selection : val})
    this.props.onPress(val)
  }


  render() {
    return (
      <Wrapper>
        <WrapperSelect onPress={this.handleOpen} disabled={this.props.disabled}>
            {!this.props.disabled && (
              <TextView>
                {!this.state.selection ? (
                  <Text size={14}>{this.props.firstOption}</Text>
                ) : (
                  <Text size={14}>{this.state.selection}</Text>
                )}
              </TextView>
            )}
            <Icon size={25} name="chevron-down" />
          </WrapperSelect>
          <DataModal
            data={this.props.data}
            onSelect={this.handlePress}
            title={this.props.title}
            buttonText={this.props.buttonText}
            visible={this.state.isVisible}
            close={this.handleClose}
          />
        </Wrapper>
      );
    }
  }

const WrapperSelect = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8;
  background-color: #fafafa;
  border-radius: 2.5;
  height: 48;
`;

const Wrapper = styled.View`
  width: 98%;
`;

const TextView = styled.View``;

SelectData.propTypes = {
    data : PropTypes.array,
    title : PropTypes.string,
    ButtonText : PropTypes.string,
    firstOption : PropTypes.string,
};

    