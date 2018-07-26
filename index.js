// @flow

import { PureComponent } from 'react';
import { ImagePicker, Permissions } from 'expo';
import propTypes from 'prop-types';
import uid from 'uuid/v4';

import type { ImagePicker as ImagePickerType } from 'expo';
import type { ImageUploadExpoState, ImageUploadExpoProps } from './types';

class ImageUploadExpo extends PureComponent<ImageUploadExpoProps, ImageUploadExpoState> {
  static propTypes = {
    endpoint: propTypes.string.isRequired,
    method: propTypes.oneOf(['PUT', 'PATCH', 'POST']).isRequired,
    payloadKey: propTypes.string.isRequired,
    children: propTypes.func.isRequired,
    onSuccess: propTypes.func,
    onFailure: propTypes.func,
    onStartUpload: propTypes.func,
  }

  static defaultProps = {
    onSuccess: undefined,
    onFailure: undefined,
    onStartUpload: undefined,
  }

  constructor() {
    super();
    (this: any).askPermission = this.askPermission.bind(this);
  }

  state = {
    loading: false,
    error: false,
    image: null,
  }

  async askPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { onStartUpload } = this.props;

    // only if user allows permission to camera roll
    if (status !== 'granted') return;

    if (onStartUpload) {
      onStartUpload();
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    this.handleImagePicked(pickerResult);
  }

  async handleImagePicked(pickerResult: ImagePickerType.ImageInfo) {
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

  render() {
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
