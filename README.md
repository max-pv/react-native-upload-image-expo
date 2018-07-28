[![Codeship Status for br4in3x/react-native-upload-image-expo](https://app.codeship.com/projects/dc531a00-7138-0136-89ed-66ecdb7845e3/status?branch=master)](https://app.codeship.com/projects/299161)

### About

This component is a convenient wrapper around [example of image handling](https://github.com/expo/image-upload-example) from Expo team.

### Installation

```
npm i react-native-upload-image-expo
```

### Usage

See [example](https://github.com/br4in3x/react-native-upload-image-expo/blob/master/example/App.js):

```javascript
<ImageUploadExpo
  method="POST"
  endpoint="https://file-upload-example-backend-dkhqoilqqn.now.sh/upload"
  payloadKey="photo"
  onFailure={(error) => console.warn(error)}
  onSuccess={(image, rawResponse) => {
    console.log(`Image URL: ${image.location}`);
    console.log('headers: ', rawResponse.headers);
  }}
  onStartUpload={() => console.log('Upload has begun!')}
  headers={{
    'uid': '...',
    'client': '...',
    'access-token': '...',
  }}
>
  {props => (
    <TouchableOpacity
      onPress={props.askPermission}
    >
      <ImageUI
        loading={props.loading}
        error={props.error}
        image={props.image}
      />
    </TouchableOpacity>
  )}
</ImageUploadExpo>
```

### Options

| Property      | Type                         | Description                                                          | Required |
|---------------|------------------------------|----------------------------------------------------------------------|----------|
| endoint       | string                       | Your server's endpoint                                               | Yes      |
| method        | enum: 'POST', 'PUT', 'PATCH' | Query method                                                         | Yes      |
| payloadKey    | string                       | The key in the payload object to server ``` {   "photo": {...} } ``` | Yes      |
| children      | React.Node                   | React Element where props are passed                                 | Yes      |
| headers       | Object                       | Array of headers for the server request.  Useful for authorization.  | No       |
| onSuccess     | Function(image, rawResponse) | A function called after upload succeeds                              | No       |
| onFailure     | Function(error)              | A function called if upload fails                                    | No       |
| onStartUpload | Function                     | A function called before upload begins                               | No       |

### iOS specific options

| Property      | Type                         | Description                                                              | Required | Default                                                                                                                                    |
|---------------|------------------------------|--------------------------------------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| alertMessage  | string                       | A message shown to the user in case if he denies access to photo library | No       | This applicaton needs access to your photo library to upload images. Please go to Settings of your device and grant permissions to Photos. |
| alertTitle    | string                       | Title for that message                                                   | No       | Please Allow Access                                                                                                                        |
| alertNo       | string                       | Cancel button text for alert                                             | No       | Not Now                                                                                                                                    |
| alertYes      | string                       | Text for button which forwards user to the settings page                 | No       | Settings                                                                                                                                   |