import { AsyncStorage } from "react-native";

export const user = "user-exist";

export const userSignup = "user-signup";

export const onSignIn = () => AsyncStorage.setItem(user, "true");

export const onSignOut = () => AsyncStorage.removeItem(user);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(user)
      .then(res => {
        if (res !== null) {
          resolve(true)

        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const isSignedUp = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(userSignup)
      .then(res => {
        if (res !== null) {
          resolve(true)

        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const isSignedInFirstTime = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(novice)
      .then(res => {
        if (res !== null && res === "true") {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};