import { action, thunk } from "easy-peasy";
import { auth, db } from "./config/firebaseConfig";

const quizModel = {
}

const userModel = {
  updateData: {},
  userData: {},
  authData: {},
  error: {},
  success: {},
  createUser: thunk((actions, { fullName, email, password }) => {
    // authentication
    auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        actions.setAuthData(res);

        db.collection("userCred").add({
          email: email,
          pass: password,
          created_at: new Date()
        })
          .then((docRef) => {
            console.log(docRef);
          })
          .catch((err) => {
            console.log(err);
          })

      })
      .catch((error) => {
        actions.setError(error);
      });

  }),
  signInUser: thunk((actions, payload) => {
    auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        actions.setError(error);
      });
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setSuccess: action((state, payload) => {
    state.success = payload;
  }),
  setAuthData: action((state, payload) => {
    state.authData = payload;
  }),
  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
  setUpdateData: action((state, payload) => {
    state.updateData = payload;
  }),
  updateProfile: thunk((actions, payload) => {
    const user = auth.currentUser;

    user.updateProfile(payload).then(function () {
      console.log("Profile updated successfully");
      // actions.setSuccess({ message: "Profile updated successfully" });
    }).catch(function (error) {
      actions.setError(error);
    });
  }),



}
const storeModel = {
  quiz: quizModel,
  user: userModel,
}
export default storeModel;