// @flow

export type ImageUploadExpoState = {|
  loading: boolean,
  image: null | Object,
  error: boolean,
|}

export type ImageUploadExpoProps = {|
  endpoint: string,
  method: 'PUT' | 'PATCH' | 'POST',
  payloadKey: string,
  children: Function,
  headers?: Object,
  onSuccess?: Function,
  onFailure?: Function,
  onStartUpload?: Function,
  alertMessage?: string,
  alertTitle?: string,
  alertYes?: string,
  alertNo?: string,
|}

export type ImagePickerType = {|
  cancelled: boolean,
  uri: string,
|}
