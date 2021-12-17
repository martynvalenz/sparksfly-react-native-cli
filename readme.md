## Install expo-cli
```
yarn global add expo-cli
```

### Create firebase config file
```
cp firebase-example.js firebase.js
```
Copy the firebase config to firebase.js file inside firebaseConfig object

## Development and Build
1. Expo dev
```
expo start
```
2. Create account or login to Expo
3. Publish project after expo start
### Build Android APK
```
expo build:android -t apk
```
1. Select apk only.
2. Choose keystore generator

### Build IOS tar.gz
```
expo build:ios -t simulator
```