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
  fileName?: string,
  onSuccess?: Function,
  onFailure?: Function,
  onStartUpload?: Function,
  headers?: Object,
|}
