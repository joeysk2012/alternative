import React, {Component} from 'react';
import { View, Image, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {login} from '~/actions';
import {Text} from '~/components/shared';


class ModalModule extends Component {
    state = {
      modalVisible: false,
    };
  
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  
    render() {
      return (
        <View>
        <Modal
          style={styles.modal__background}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modal__background}>
            <View style={styles.popup}>
                <View style={styles.warning}><Image source={require('../../images/ic_warning_white.png')} style={{width: 50, height: 50, alignSelf: 'center', marginVertical: 20,}}/></View>
                  <View style={styles.popup__padding}>
                    <Text size={20} weight={700} style={styles.popup__title}>Ainda fornece leite para a Nestlé?</Text>
                    <Text size={16} weight={700} color={'#aaa'}>Dr. Antonio Carlos,</Text>
                    <Text color={'#aaa'}>Faz mais de 15 dias que você não entrega leite, Você ainda fornece leite para a Nestlé?</Text>
                  </View>                  
                <View style={styles.buttons}>
                <TouchableHighlight style={styles.popup__btn} style={{borderRightWidth: 1, borderColor: '#ccc', flex: 1,}}>
                    <Text style={{textAlign: 'center', paddingTop: 20, paddingBottom: 20}}>Sim</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.popup__btn} style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>Não</Text>
                </TouchableHighlight>
                </View>
              <TouchableHighlight
                onPress={() => { 
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
      );
    }
  }

  export const ModalExample = ModalModule;

  const styles = StyleSheet.create({
    modal__background: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 350,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    popup__padding: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    popup__title: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    popup__btn: {
      paddingTop: 20,
      paddingBottom: 20,
    },    
    warning: {      
        backgroundColor: '#FFBD00',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'center',
    },
    buttons: {
      borderTopWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });