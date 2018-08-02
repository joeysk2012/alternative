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
import { processColor, Picker, View, Image } from 'react-native';
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

const enhance = compose(
  connect(
    ({ price, researched }) => ({ price, researched }),
    { getPrices }
  ),
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

  }) => {
    return (
      <Wrapper secondary>
        <TopBar
          title="Checklist"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <Image source={require('../../images/avatar_blue.png')} style={{width : 100, height : 100}} />
        <View style={{width : 100, height : 100, backgroundColor :'red', elevation : 25}} />
        <SelectWrapper> 
          <SelectData onPress={onChangeProperty} title="Properties" ButtonText="Selecionar" firstOption="Select Farm" />
          <SelectData onPress={onChangeChecklist} title="Checklists" ButtonText="Selecionar" firstOption="Select Checklist" />
        </ SelectWrapper>
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

