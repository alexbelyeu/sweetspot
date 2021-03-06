# Sweetspot #

Front-end repository for Sweetspot app.

This is a React Native project.

Click below to see the demo!

[<img src="https://preview.ibb.co/hnLnzS/Screen_Shot_2018_05_06_at_12_14_45.jpg" alt="Sweetspot App" width="300" height="600">](https://www.youtube.com/watch?v=vsWjMGmsr8E)

## What is this repository for? ##
### Description ###
Sweetspot is an app that aims to provide the best way to find the best deals that a city's bars, restaurants and pubs have to offer in real time. Sweetspot does this by:

* Map with the best deals around one's location. When the user taps on a location, a pop-up gives useful information about it, including: name, picture, rating and main deal.
* List of locations near the user, ordered by distance. Each card contains the same useful information as the map, and a bit more: more pictures, description of the place, distance to the user, etc.


### Important dependecies ###

~~~
"dependencies": {
  "react": "~15.4.0",
  "react-native": "0.41.2",
  "react-native-maps": "^0.13.0",
  "react-native-router-flux": "^3.37.0",
  "react-redux": "^5.0.3",
  "redux": "^3.6.0",
  "redux-persist": "^4.4.2",
  "redux-thunk": "^2.2.0"
}
~~~

## Setup ##
* `git clone` this repo
* `cd sweetspot/`
* (If this is your first time developing with `npm` and/or React Native, following the instructions [here](https://facebook.github.io/react-native/docs/getting-started.html) to get started, then come back)
* If you want to see it running with mock offers/restaurants, checkout the `test` branch with: `git checkout test`.
* `npm install`
* Assuming you already installed XCode: `react-native run-ios`
* Assuming you already installed Android Studio and the required SDKs: `react-native run-android`

## Exporting an Android APK ##
First of all, generate a signing key and then set up the gradle variables (following the instructions):
https://facebook.github.io/react-native/docs/signed-apk-android.html
The third point (Adding signing config to your app's gradle config) is already configured in the project

Once all the settings have been done, simply run (from the root of the project):
~~~
cd android && ./gradlew assembleRelease
~~~

And you will find the generated apk in `android/app/build/outputs/apk/app-release.apk`

`git push origin master --tags`
