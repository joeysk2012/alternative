import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle,
  defaultProps,
  pure
} from 'recompose';
import {func, object, bool, string} from 'prop-types';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native';

// local
import {Text, IconUri, DatePicker, Icon} from '~/components/shared';
import {getNavigatorContext} from '~/enhancers';
import {DatePickerModal} from '~/components/DatePickerModal';

const enhance = compose(
  getNavigatorContext,
  setPropTypes({
    onChange: func,
    title: string,
    date: string,
    buttonText: string
  }),
  withState('isVisible', 'setVisible', false),
  withState('date', 'setDate', ''),
  withProps(({onPress, setDate, setVisible}) => ({
    onPress: e => {
      setDate(e.label);
      setVisible(false);
      if (typeof onPress === 'function') {
        onPress(e);
      }
    }
  })),
  withHandlers({
    handlerOpen: ({setVisible}) => () => {
      setVisible(true);
    }
  }),
  pure
);

export const Select = enhance(
  ({disabled, handlerOpen, onPress, date, title, buttonText, isVisible}) => {
    return (
      <Wrapper>
        <WrapperSelect onPress={handlerOpen} disabled={disabled}>
          {!disabled && (
            <TextView>
              {!date ? (
                <Text size={14}>Selecionar</Text>
              ) : (
                <Text size={14}>{date}</Text>
              )}
            </TextView>
          )}
          {disabled && (
            <Text secondary size={14}>
              Selecionar
            </Text>
          )}
          <Icon size={25} name="chevron-down" />
        </WrapperSelect>
        <DatePickerModal
          close={onPress}
          title={title}
          buttonText={buttonText}
          visible={isVisible}
        />
      </Wrapper>
    );
  }
);

const WrapperSelect = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  border-radius: 2.5;
  padding-left: 15;
  padding-right: 15;
  padding-top: 10;
  padding-bottom: 10;
`;

const Wrapper = styled.View`
  width: 49%;
`;

const TextView = styled.View``;
