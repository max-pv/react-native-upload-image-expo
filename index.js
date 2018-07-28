// @flow

import { PureComponent } from 'react';
import { Linking, Alert, Platform } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import propTypes from 'prop-types';
import uid from 'uuid/v4';

import type { Node } from 'react';
import type { ImageUploadExpoState, ImageUploadExpoProps, ImagePickerType } from './types';

class ImageUploadExpo extends PureComponent<ImageUploadExpoProps, ImageUploadExpoState> {
  askPermission: Function;
  showAlert: Function;

  static propTypes = {
    endpoint: propTypes.string.isRequired,
    method: propTypes.oneOf(['PUT', 'PATCH', 'POST']).isRequired,
    payloadKey: propTypes.string.isRequired,
    children: propTypes.func.isRequired,
    onSuccess: propTypes.func,
    onFailure: propTypes.func,
    onStartUpload: propTypes.func,
    alertMessage: propTypes.string,
    alertTitle: propTypes.string,
    alertNo: propTypes.string,
    alertYes: propTypes.string,
  }

  static defaultProps = {
    onSuccess: undefined,
    onFailure: undefined,
    onStartUpload: undefined,
    alertTitle: 'Please Allow Access',
    alertMessage: [
      'This applicaton needs access to your photo library to upload images.',
      '\n\n',
      'Please go to Settings of your device and grant permissions to Photos.',
    ].join(''),
    alertNo: 'Not Now',
    alertYes: 'Settings',
  }

  constructor() {
    super();
    this.askPermission = this.askPermission.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  state = {
    loading: false,
    error: false,
    image: null,
  }

  async askPermission() {
    // only if user allows permission to camera roll
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { onStartUpload } = this.props;

    // On Android users are prompted every time,
    // so no need to show additional Alert
    if (status !== 'granted') {
      if (Platform.OS === 'ios') this.showAlert();
      return;
    }

    if (onStartUpload) onStartUpload();

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    this.handleImagePicked(pickerResult);
  }

  showAlert() {
    const { alertMessage, alertTitle, alertYes, alertNo } = this.props;
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        { text: alertNo, style: 'cancel' },
        { text: alertYes, onPress: () => Linking.openURL('app-settings:') },
      ],
    );
  }

  async handleImagePicked(pickerResult: ImagePickerType) {
    let rawResponse;
    let uploadResult;
    const { onFailure, onSuccess } = this.props;

    try {
      this.setState({ loading: true });

      if (!pickerResult.cancelled) {
        rawResponse = await this.uploadImageAsync(pickerResult.uri);
        uploadResult = await rawResponse.json();
        this.setState({ image: uploadResult });
        if (onSuccess) onSuccess(uploadResult, rawResponse);
      }
    } catch (error) {
      if (onFailure) onFailure(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async uploadImageAsync(uri: string) {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const { method, payloadKey, endpoint, headers } = this.props;

    const formData = new FormData();

    // $FlowFixMe
    formData.append(payloadKey, {
      uri,
      name: uid(),
      type: `image/${fileType}`,
    });

    const options = {
      method,
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    };

    return fetch(endpoint, options);
  }

  render(): Node {
    const { loading, error, image } = this.state;
    const { children } = this.props;

    return children({
      loading,
      error,
      image,
      askPermission: this.askPermission,
    });
  }
}

export default ImageUploadExpo;
