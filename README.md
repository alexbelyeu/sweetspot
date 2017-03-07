# Sweetspot #

Front-end repository for Sweetspot app.

This is a React Native project.

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
* `git clone git@bitbucket.org:sweetspotappio/sweetspot.git`
* `cd sweetspot/`
* (If this is your first time developing with `npm` and/or React Native, following the instructions [here](https://facebook.github.io/react-native/docs/getting-started.html) to get started, then come back)
* `npm install`
* Assuming you already installed XCode: `react-native run-ios`
* Assuming you already installed Android Studio and the required SDKs: `react-native run-android`


## API ##
Currently using the https://bitbucket.org/sweetspotappio/back API deployed in `sweetspotapp.pythonanywhere.com`

Endpoints available:
* Register
* Login
* Get Spots

## Tests ##
None, TODO

## Deployment ##
Once you've downloaded the project, **create a branch before you start making changes**. Then, you can commit and push changes to this branch.

### Style pattern for branch naming ###
* Feature: feature/SHORT_DESCRIPTION
* Bug: bug/SHORT_DESCRIPTION
* etc.

### Committing and pushing ###
Either create a branch from BitBucket and clone it to your local repo

-- or --

Locally:

* `git checkout -b NAME_OF_BRANCH`
* --- CHANGES TO FILES ---
* `git add .`
* `git commit -a`
* In message, longer description of the branch purpose.
* `git push origin NAME_OF_BRANCH`

### Merging branches (via Pull Request) ###

Once a bug fix or a new feature are ready to be merged, a new Pull Request should be created, shared with the team, and wait for at least 66% of the developers to approve the PR in order to merge it.

## Exporting an Android APK ##
First of all, generate a signing key and then set up the gradle variables (following the instructions):
https://facebook.github.io/react-native/docs/signed-apk-android.html
The third point (Adding signing config to your app's gradle config) is already configured in the project

Once all the settings have been done, simply run (from the root of the project):
~~~
cd android && ./gradlew assembleRelease
~~~

And you will find the generated apk in `android/app/build/outputs/apk/app-release.apk`

## Versioning ##

Every stable build will be tagged:

`git tag "X.Y.Z"`

Then pushed to the repo:

`git push origin master --tags`