import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Plus from 'react-native-vector-icons/AntDesign';

import CustomButton from '../custom-button/custom-button';
import CardPreview from '../card-preview/card-preview';

import styles from './prayers-list.styles';

const PrayersList: React.FC = () => {
  const [isShowAnswered, setIsShowAnswered] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Plus name="plus" size={28} color="#72A8BC" style={styles.inputIcon} />
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Add a prayer..."
          style={[styles.input]}
        />
      </View>
      <CardPreview />
      <CardPreview />
      <CardPreview />
      <CustomButton
        text={
          isShowAnswered ? 'hide Answered Prayers' : 'Show Answered Prayers'
        }
        action={() => setIsShowAnswered(!isShowAnswered)}
      />
      {isShowAnswered ? (
        <>
          <CardPreview />
          <CardPreview />
        </>
      ) : null}
    </View>
  );
};

export default PrayersList;