import React, {useState, useEffect} from 'react';
import Voice from '@react-native-voice/voice';
import {StyleSheet, View, Text, Button} from 'react-native';

const App = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState('');
  const buttonLabel = isRecord ? 'Stop' : 'Start';
  const voiceLabel = text
    ? text
    : isRecord
    ? 'Say something!'
    : 'Press Start Button';

  const onSpeechStart = () => {
    console.log('onSpeechStart');
    setText('');
  };

  const onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults');
    setText(e.value[0]);
  };

  const onSpeechError = e => {
    console.log('_onSpeechError');
    console.log(e.error);
  };

  const onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }
    setIsRecord(!isRecord);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{voiceLabel}</Text>
      <Button onPress={onRecordVoice} title={buttonLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  voiceText: {
    margin: '32px',
  },
});

export default App;
