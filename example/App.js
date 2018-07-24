// @flow

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ActivityIndicator, Text } from 'react-native';
import ImageUploadExpo from 'react-native-upload-image-expo';

export default () => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>

    <ImageUploadExpo
      method="POST"
      endpoint="https://file-upload-example-backend-dkhqoilqqn.now.sh/upload"
      payloadKey="photo"
    >
      {props => (
        <TouchableOpacity
          onPress={props.askPermission}
          style={styles.touchable}
        >
          <ImageUI
            loading={props.loading}
            error={props.error}
            image={props.image}
          />
        </TouchableOpacity>
      )}
    </ImageUploadExpo>

  </View>
);

const ImageUI = ({ image, loading, error }) => {
  if (image) {
    return (
      <Image
        source={{ uri: image.location }}
        style={styles.images}
        resizeMode="cover"
      />
    );
  }
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error :(</Text>;

  return <Text>Select an image</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: { height: 300, width: '100%', alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 300 },
});
