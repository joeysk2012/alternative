import React, {Component} from 'react';
import styled from 'styled-components/native';
import { func, object, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { processColor, Picker, View} from 'react-native';
import moment from 'moment';

// Local
import {
  Wrapper,
  TopBar,
  Button,
  DrawerButton,
  Icon,
  ScrollWrapper,
  Text,
  LineChart,
  NotificationCard
} from '~/components/shared';
import {ImagesApp} from '~/config';
import {updateNotification, deleteNotification, addNotification} from '~/actions'

const mocks = 
    [{
      "_id": "20180718-0004-4000-a004-000000002222",
      "updatedAt": "2018-07-17T21:06:45.720Z",
      "dummyData": true,
      "code": "sarita",
      "type": "IncomingMessages",
      "title": "Welcome to the Nestlé Leiteria app!",
      "message": "Welcome. This is an alert message to welcome you to the app.",
      "read" : false,
      "confirmed" : false,
      "deleted" : false
      },
      { 
      "_id": "20180718-0004-4000-a004-000000002223",
      "updatedAt": "2018-07-12T21:06:45.720Z",
      "dummyData": true,
      "code": "sarita",
      "type": "QualityIssue",
      "title": "Quality issue",
      "message": "you have quality issue, you have quality issue, you have quality issue, you have quality issue, you have  issueyou have quality issueyou have asdfsdfadfaasdfasdfasdfadfadfadfasquality issue you have 200",
      "read" : false,
      "confirmed" : false,
      "deleted" : false
      },
      { 
      "_id": "20180718-0004-4000-a004-000000002224",
      "updatedAt": "2018-07-20T21:06:45.720Z",
      "dummyData": true,
      "code": "sarita",
      "type": "InactiveIssue",
      "title": "Welcome to the Nestlé Leiteria app!",
      "message": "Welcome. This is an alert message to welcome you to the app.",
      "read" : false,
      "confirmed" : false,
      "deleted" : false
      },{
      "_id": "20180718-0004-4000-a004-000000002225",
      "updatedAt": "2018-07-17T21:06:45.720Z",
      "dummyData": true,
      "code": "sarita",
      "type": "IncomingMessages",
      "title": "Welcome to the Nestlé Leiteria app!",
      "message": "Welcome. This is an alert message to welcome you to the app.",
      "read" : false,
      "confirmed" : false,
      "deleted" : false
      },{
      "_id": "20180718-0004-4000-a004-000000002226",
      "updatedAt": "2018-07-17T21:06:45.720Z",
      "dummyData": true,
      "code": "sarita",
      "type": "IncomingMessages",
      "title": "Welcome to the Nestlé Leiteria app!",
      "message": "Welcome. This is an alert message to welcome you to the app.",
      "read" : false,
      "confirmed" : false,
      "deleted" : false
      },{
      "_id": "20180718-0004-4000-a004-000000002227",
      "updatedAt": "2018-07-17T21:06:45.720Z",
      "dummyData": true,
      "code": "sarita",
      "type": "IncomingMessages",
      "title": "Welcome to the Nestlé Leiteria app!",
      "message": "Welcome. This is an alert message to welcome you to the app.",
      "read" : false,
      "confirmed" : false,
      "deleted" : false
      }];


class Notifications extends Component {
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleConfirmed = this.handleConfirmed.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state={
      'opened' : {}
    };
  }

  handleDelete(id, bool){
    this.props.dispatch(deleteNotification(id, bool));
  }

  handleRead(id, bool){
    this.props.dispatch(updateNotification(id,'read',bool));
  }

  handleConfirmed(id, bool){
    this.props.dispatch(updateNotification(id, 'confirm', bool))
  }

  handleOpen(id){
    let opened = this.state.opened
    if(opened[id] === true){
      opened[id] = false
      this.setState({'opened' : opened})
      return
    }else{
      for(let key in opened){
        opened[key] = false;
      }
      opened[id] = true;
      this.setState({'opened' : opened})
    }
  }

  componentWillMount(){
    let opened = {};
  {/*use this.props.notifications*/}
    mocks.forEach(note => {
      opened[note._id] = false});
    this.setState({'opened' : opened});
  }

  render() {
    
    {/*let sorted_notifications = this.props.notification*/}
    let sorted_notifications = mocks;
    for(let i = 0 ; i < sorted_notifications.length ; i++){
      sorted_notifications[i].updatedAt = new Date(sorted_notifications[i].updatedAt); 
    }
    sorted_notifications.sort(function(a,b){return b.updatedAt - a.updatedAt});
    let notificationItems = sorted_notifications.map((item, index) => 
        <NotificationCard 
            key={index}
            id={item._id} 
            title={item.title} 
            message={item.message} 
            date={item.updatedAt} 
            type={item.type} 
            confirmed={item.confirmed} 
            read={item.read} 
            deleted={item.deleted}
            opened={this.state.opened[item._id]}
            onDelete ={this.handleDelete}
            onConfirmed={this.handleConfirmed}
            onRead={this.handleRead}
            onOpened={this.handleOpen}
        />
      )
    return (
      <Wrapper secondary>
        <TopBar
          title="Notifications"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
            {notificationItems}      
        </ScrollWrapperStyle>
      </Wrapper>
    );
    }
  }

  const ScrollWrapperStyle = ScrollWrapper.extend`
    padding-top: 4;
    padding-bottom : 4;
  `;

export default connect((state) =>({
  notification : state.notification
}))(Notifications)


