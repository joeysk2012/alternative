import React, {Component}  from 'react';
import styled from 'styled-components/native';
import {func, object, bool, string} from 'prop-types';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';

// local
import {Text, IconUri, DatePicker, Icon, ScrollWrapper, Image, Button} from '~/components/shared';
import {getNavigatorContext} from '~/enhancers';
import moment from 'moment';

export const NotificationCard = class NotificationItem extends Component {
  constructor(props){
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  formatDate(day){
    let str = "";
    let yyyy = day.getFullYear();
    let mm = day.getMonth() + 1;
    let dd = day.getDate();
    let hour = day.getHours();
    let min = day.getMinutes();
    str = yyyy + "-" + mm + "-" + dd + " - " + hour + ":" + min;   
    return str;
  }

  handleExpand(id, expanded){
    let datetime = new Date().toISOString()
    this.props.onRead(id, datetime);
    this.props.onOpened(id);
  }

  handleDelete(id){
    let datetime = new Date().toISOString()
    this.props.onDelete(id, datetime);
  }

  handleConfirm(id){
    let datetime = new Date().toISOString()
    let obj = {'ip' : '', 'confirmedAt' : datetime, position : {'Longitude' : '', 'Latitute' : ''}}
    this.props.onConfirmed(id, obj);
  }

  render() {
    let NotificationIcon;
    let NotificationType;
    let Expanded;
    const CurrentComp = this;

    if(this.props.type === 'Alert' && this.props.read){
      NotificationIcon = <Image source={require('../../images/ic_warning_yellow_24px.png')} 
        style={{ height: 18, width: 18}} />  
      NotificationType = <TextAlert>Importante</TextAlert>

    }else if(this.props.type === 'Alert' && !this.props.read){
      NotificationIcon = <Image source={require('../../images/warning_new.png')} 
        style={{ height: 18, width: 18}} />  
      NotificationType = <TextAlert>Importante</TextAlert>

    }else if(this.props.type === 'IncomingMessages' && this.props.read){
      NotificationIcon = <Image source={require('../../images/baseline-insert_comment-24px.png')} 
        style={{ height: 18, width: 18}} />
      NotificationType = <TextRegular>Aviso Nestlé</TextRegular>

    }else if(this.props.type === 'IncomingMessages' && !this.props.read){
      NotificationIcon = <Image source={require('../../images/message_new.png')} 
        style={{ height: 18, width: 18}} />  
      NotificationType = <TextRegular>Aviso Nestlé</TextRegular>

    }else if(this.props.type === 'QualityIssue' && this.props.read){
      NotificationIcon = <Image source={require('../../images/baseline-format_list_numbered-24px.png')} 
        style={{ height: 18, width: 18}} />
      NotificationType = <TextQuality>Checklist</TextQuality>

    }else if(this.props.type === 'QualityIssue' && !this.props.read){
      NotificationIcon = <Image source={require('../../images/checklist_new.png')} 
        style={{ height: 18, width: 18}} />
      NotificationType = <TextQuality>Checklist</TextQuality>

    }else if(this.props.type === 'InactiveIssue' && this.props.read){
      NotificationIcon = <Image source={require('../../images/ic_warning_yellow_24px.png')} 
        style={{ height: 18, width: 18}} />
      NotificationType = <TextAlert>Importante</TextAlert>

    }else if(this.props.type === 'InactiveIssue' && !this.props.read){
      NotificationIcon = <Image source={require('../../images/warning_new.png')} 
        style={{ height: 18, width: 18}} />
      NotificationType = <TextAlert>Importante</TextAlert>

    }else{
      NotificationIcon = <Image source={require('../../images/baseline-insert_comment-24px.png')} 
        style={{ height: 18, width: 18}} />
      NotificationType = <TextInactive>Importante</TextInactive>
    }

    Expanded = 
    this.props.opened ? 
      <MessageBody>
        <MessageBodyText>
          {this.props.message}
        </MessageBodyText>
        {!this.props.confirmed && this.props.type !== 'IncomingMessages' ?  
          <Button info onPress={() => {this.handleConfirm(this.props.id)}} style={{ borderRadius: 1, marginTop: 10, height: 32 }}>
              <Text inverted>
                Toque auqi para ver
              </Text>
          </Button> : null}
      </MessageBody> : null;

    let swipeBtns = [{
      backgroundColor: '#FF677F',
      underlayColor: '#FF677F',
      component: <DeleteWrapper><Image 
                    source={require('../../images/ic_close_white.png')} 
                    style={{height: 36, width: 36, position: 'absolute', left: 14}} />
                  </DeleteWrapper>,
      onPress: () => { this.handleDelete(this.props.id) } 
    }];

    return (
      this.props.deleted? null : 
        <Overall style={{marginRight: 8, marginLeft: 8, marginTop: 4, marginBottom: 4}}>
          <Swipeout right={swipeBtns}
          autoClose={true}
          backgroundColor= 'transparent'
          disabled = {this.props.opened}>
            <WrapperCard opened={this.props.opened} type={this.props.type} confirmed={this.props.confirmed} len={this.props.message.length}>
              <TouchableOpacity onPress={() => {this.handleExpand(this.props.id, !this.props.opened)}}>
              <WrapperContent>
                <MessageHeader>
                  {NotificationIcon} 
                  <Icon style={{ height: 18, width: 18}} />
                    {NotificationType}
                  <Text style ={{color : '#707070'}}>
                    {' \u2022 '  + this.formatDate(this.props.date)}
                  </Text>
                </MessageHeader>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View>
                    <MessageSender read={this.props.read}>
                        {"Nestlé"}
                    </MessageSender>
                    <MessageTitle>
                        {this.props.title}
                    </MessageTitle>
                  </View>
                </View>
                {Expanded}
              </WrapperContent>
            </TouchableOpacity>
          </WrapperCard>
        </Swipeout>
      </Overall>
               
      );
    }
  }

const Overall = styled.View`
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 3;
`

const WrapperCard = styled.View`
  background-color: ${props => props.theme.bg};
  height: ${props => ((props.opened && props.confirmed) || (props.opened && props.type==='IncomingMessages')) ? 
  (props.len * 0.33 + 150 - 32) : (props.opened ? (props.len * 0.33 + 150 + 32) : 94) };
`;

const WrapperContent= styled.View`
  padding-bottom: 12;
  padding-top: 12;
  padding-left: 12;
  padding-right: 12;
`;

const MessageHeader = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const TextAlert = styled.Text`
  color: ${props => props.theme.warning};
`
const TextRegular = styled.Text`
  color: #0096ff; 
`;

const TextQuality = styled.Text`
  color: #00cdff;
`;

const TextInactive = styled.Text`
  color: ${props => props.theme.warning};
`;

const MessageBody = styled.View`
  padding-top : 20;
`;

const DeleteWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items : flex-end; 
  justify-content : center;
`;

const MessageBodyText = styled.Text`
  color: ${props => props.theme.textSecondary};
  `;

const MessageSender = styled.Text`
  font-weight: ${props => props.read ? 'normal' : 900};
  font-size: ${props => props.read ? 15 : 17};
`;

const MessageTitle = styled.Text`
  color: ${props => props.theme.textSecondary};
`;

const ButtonSelect = Button.extend`
  height: 48;
  padding-top: 0;
  padding-bottom:0;
  margin-bottom: 16;
`;

NotificationCard.propTypes = {
    data : PropTypes.array,
    title : PropTypes.string,
    ButtonText : PropTypes.string,
    firstOption : PropTypes.string,
};

    