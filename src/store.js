import { action, thunk } from "easy-peasy";
import { auth, db } from "./config/firebaseConfig";
import shortid from "shortid";

const quizModel = {
  quizName: '',
  quizId: '',
  noOfQuestions: 5,
  data: [],
  quizSubmittedSuccessfully: false,
  setQuizName: action((state, payload) => {
    state.quizName = payload;
    state.quizId = shortid.generate();
  }),
  setNoOfQuestions: action((state, payload) => {
    state.noOfQuestions = payload;
  }),
  setQuizSubmittedSuccessfully: action((state, payload) => {
    state.quizSubmittedSuccessfully = payload;
  }),
  setQuizData: action((state, payload) => {
    state.data.push(payload);
  }),
  sendQuestionsToFirestore: thunk((actions, { quizName, data, noOfQuestions, quizId }) => {
    db.ref(`users/${auth.currentUser.uid}/${quizId}`).set({
      quizId,
      quizName,
      data,
      noOfQuestions,
    }, (err) => {
      if (err) {
        console.log(err);
        actions.setQuizSubmittedSuccessfully(false);
      }
      else {
        actions.setQuizSubmittedSuccessfully(true);
        console.log("Saved Successfully");
       
      }
    })
  })
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
        db.ref('users_data/' + res.user.uid).set({
          email: email,
          password: password
        });
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
  setAuthData: action((state, payload) => {
    state.authData = payload;
  }),
}
const storeModel = {
  quiz: quizModel,
  user: userModel,
}
export default storeModel;