import React, {Component} from 'react';
import styled from 'styled-components/native';
import { func, object, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler, BackAndroid, processColor, Picker, View} from 'react-native';
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
import {updateNotification, deleteNotification, addNotification} from '~/actions';
import {navigatorStyle} from '~/config';
import {getNavigatorContext} from '~/enhancers';

class Notifications extends Component {
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleConfirmed = this.handleConfirmed.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.hasProperties = this.hasProperties.bind(this);
    this.state={
      'opened' : {}
    };
  }

  handleDelete(id, datetime){
    this.props.dispatch(deleteNotification(id, datetime));
  }

  handleRead(id, datetime){
    this.props.dispatch(updateNotification(id,'read', datetime));
  }

  handleConfirmed(id, obj){
    this.props.dispatch(updateNotification(id, 'confirm', obj));
  }

  handleOpen(id){
    let opened = this.state.opened;
    if(opened[id] === true){
      opened[id] = false;
      this.setState({'opened' : opened});
      return;
    }else{
      for(let key in opened){
        opened[key] = false;
      }
      opened[id] = true;
      this.setState({'opened' : opened});
    }
  }

  hasProperties(obj){
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return true;
      }
      return false;
  }


  componentWillMount(){
    let opened = {};
    this.props.notification.forEach(note => {
      opened[note._id] = false});
    this.setState({'opened' : opened});
  }

  render() {
    
    let sorted_notifications = this.props.notification;
    for(let i = 0 ; i < sorted_notifications.length ; i++){
      if(sorted_notifications[i].insertedAt){
        sorted_notifications[i].insertedAt = new Date(sorted_notifications[i].insertedAt);
      }else{
        sorted_notifications[i].insertedAt = new Date();
      }
    }
    sorted_notifications.sort(function(a,b){return b.insertedAt - a.insertedAt});
    console.log(sorted_notifications);
    let notificationItems = sorted_notifications.map((item, index) => 
        <NotificationCard 
            key={index}
            id={item._id} 
            title={item.title} 
            message={item.message} 
            date={item.insertedAt} 
            type={item.type} 
            confirmed={this.hasProperties(item.confirmation)} 
            read={item.readAt} 
            deleted={item.deletedAt}
            opened={this.state.opened[item._id]}
            onDelete ={this.handleDelete}
            onConfirmed={this.handleConfirmed}
            onRead={this.handleRead}
            onOpened={this.handleOpen}
        />
      );
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


