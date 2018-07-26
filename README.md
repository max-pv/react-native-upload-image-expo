[![Codeship Status for br4in3x/react-native-upload-image-expo](https://app.codeship.com/projects/dc531a00-7138-0136-89ed-66ecdb7845e3/status?branch=master)](https://app.codeship.com/projects/299161)

### About

This component is a convenient wrapper around [example of image handling](https://github.com/expo/image-upload-example) from Expo team.

### Installation

```
npm i br4in3x/react-native-upload-image-expo
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