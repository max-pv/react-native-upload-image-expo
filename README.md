### About

This repository is a convenient wrapper around perfect example of image handling from Expo team.

### Installation

```
npm i br4in3x/react-native-upload-image-expo
```

### Usage

```javascript
<ImageUploadExpo
  method="POST"
  endpoint="https://file-upload-example-backend-dkhqoilqqn.now.sh/upload"
  payloadKey="photo"
  onFailure={(error) => console.warn(error)}
  onSuccess={(image) => console.log(image)}
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