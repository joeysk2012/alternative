import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { FilterCore } from '~/components/FilterCore';
import { size, isEmpty } from 'lodash';
// import {LineChart} from 'react-native-charts-wrapper';
import { processColor, Picker, View, Image, Text,  } from 'react-native';
// Local
import {
  Wrapper,
  TopBar,
  DrawerButton,
  Icon,
  ScrollWrapper,
  LineChart
} from '~/components/shared';
import { FilterPrice } from '~/components/FilterPrice';
import { PriceDetails } from '~/components/Price';
import { getPrices } from '~/actions';
import {ImagesApp} from '~/config';
import {SelectData} from '~/components/shared/SelectData';
import {Button} from '~/components/shared/Button';
import IconBadge from 'react-native-icon-badge';
import {ModalExample} from '~/components/Modal'
import {IconCount} from '~/components/shared';
import {login} from '~/actions';

const enhance = compose(
  withState('details', 'setDetails', {}),
  withState('isFilter', 'setFilter', true),
  withState('isClose', 'setClose', false),
  withState('collected', 'setCollected', 0),
  withState('isCollected', 'setIsCollected', false),
  withState('checklist', 'setChecklist', ''),
  withState('property', 'setProperty'),
  lifecycle({
    async componentWillMount() {
      const { startDate, endDate } = this.props.range;
      
      //this.props.getSearchVolume(this.props.range, this.props.volume.all);
      await this.props.getPrices(this.props.price.byYear, this.props.year);
    }
  }),

  withHandlers({

    onChangeChecklist: ({setChecklist}) => e => {
      setChecklist({checklist})
    },

    onChangeProperty: ({setProperty}) => e => {
      setProperty({property})
    }

  })
)

export const Sent = enhance(
  ({
    checklist,
    setChecklist,
    data,
    xAxis,
    researched,
    onChangeProperty,
    onChangeChecklist,
    navigator

  }) => {
    const user = {'notifications' : [{'title' : 'hello', 'message' : 'this is the milk-app'}] }
    return (
      <Wrapper secondary>
        <TopBar
          title="Testpage"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <Image source={require('../../images/avatar_blue.png')} style={{width : 100, height : 100}} />

        <View style={{width : 100, height : 100, backgroundColor :'red', elevation : 25}} />
          <View style={{flexDirection: 'row', height: 100, backgroundColor :'red',alignItems: 'center',justifyContent: 'center',}}>
            <IconBadge
              MainElement={
                <Icon inverted name="bell" size={35} />
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>5</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                backgroundColor: '#FF00EE'}
              }
              />
              <ModalExample />
              <IconCount count={user.notifications.length} 
                notifications={user.notifications} 
                navigator={navigator} 
              />
          </View>
        </ScrollWrapperStyle>
        <Button />
      </Wrapper>
    );
  }
);

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const SelectWrapper = styled.View`
  
`;

const WrapperPriceDetails = styled.View`
  height: 90;
  margin-bottom: 2;
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

