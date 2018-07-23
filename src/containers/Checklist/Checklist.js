import React, {Component} from 'react';
import styled from 'styled-components/native';
import { func, object, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { processColor, Picker, View, Image } from 'react-native';

// Local
import {
  Wrapper,
  TopBar,
  DrawerButton,
  Icon,
  ScrollWrapper,
  Text,
  LineChart
} from '~/components/shared';
import {ImagesApp} from '~/config';
import {SelectData} from '~/components/shared/SelectData';
import {Button} from '~/components/shared/Button';
import {login} from '~/actions';


class Checklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      properties: [],
      property: '',
      checklist: ''
    };

    this.handleProperty = this.handleProperty.bind(this);
    this.handleChecklist = this.handleChecklist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChecklist(val){
    this.setState({checklist : val});
  }

  handleProperty(val){
    this.setState({property : val});
  }

  handleSubmit(){
      //TODO: Grab the checklist
  }
  componentDidMount(){
    
  }


  render() {
    return (
      <Wrapper secondary>
        <TopBar
          title="Checklist"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <WrapperFilter>
              <SelectData 
                data={this.props.user.properties}
                onPress={this.handleProperty} 
                title="Properties" 
                ButtonText="Selecionar" 
                firstOption="Select Farm" />
              <SelectData 
                data={this.props.user.checklist}
                onPress={this.handleChecklist} 
                title="Checklists" 
                ButtonText="Selecionar" 
                firstOption="Select Checklist" />
              <ButtonSelect 
                info onPress={this.handleSubmit} 
                style={{ borderRadius: 5 }}>
                <Text weight="800" inverted>
                  Start Checklist
                </Text>
              </ButtonSelect>
              </WrapperFilter>
          </ScrollWrapperStyle>
      </Wrapper>
    );
    }
  }

export default connect(
    ({user}) => ({user}),
    {login}
  )(Checklist)


const WrapperFilter = styled.View`
  margin-top: 8;
  padding-right: 8;
  padding-left: 8;
  background-color: ${props => props.theme.bg};
  elevation: 1;
  height: 180;
`;

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-top: 8;
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const WrapperHeader = styled.View`
  padding-bottom: 2;
`;
const WrapperBar = styled.View`
  height: 350;
  background-color: ${props => props.theme.bg};
  padding-top: 1;
  border-radius: ${props => props.theme.borderRadius};
`;

const IconClose = Icon.extend`
  padding-right: 5;
`;

const ButtonSelect = Button.extend`
  height: 48;
  padding-top: 0;
  padding-bottom:0;
  margin-bottom: 16;
`;
