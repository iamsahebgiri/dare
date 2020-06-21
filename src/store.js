import { action, thunk } from "easy-peasy";
import { auth, db } from "./config/firebaseConfig";

const quizModel = {
  quizName: '',
  data: [],
  setQuizName: action((state, payload) => {
    state.quizName = payload;
  }),
  setQuizData: action((state, payload) => {
    state.quizName.push(payload);
  }),
}

const userModel = {
  updateData: {},
  user: {},
  authData: {},
  error: {},
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
  updateProfile: thunk((actions, payload) => {
    const user = auth.currentUser;

    user.updateProfile(payload).then(function () {
      console.log("Profile updated successfully");
      // actions.setSuccess({ message: "Profile updated successfully" });
    }).catch(function (error) {
      actions.setError(error);
    });
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setUpdateData: action((state, payload) => {
    state.updateData = payload;
  }),
}
const storeModel = {
  quiz: quizModel,
  user: userModel,
}
export default storeModel;