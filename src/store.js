import { action, thunk } from "easy-peasy";
import { auth } from "./config/firebaseConfig";


const quizModel = {
  questions: [
    {
      id: "randomId01",
      question: "Best couple?",
      options: [
        "opt 1",
        "opt 2",
        "opt 3",
        "opt 4"
      ],
      answer: 1
    }
  ],
  createQuiz: action((state, payload) => {

  }),
  createOption: action((state, payload) => {

  }),
  createAnswer: action((state, payload) => {

  }),
}

const userModel = {
  userData: {},
  authData: {},
  error: {},
  createUser: thunk((actions, payload) => {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        console.log(res);
        actions.setAuthData(res);
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
  setAuthData: action((state, payload) => {
    state.authData = payload;
  }),

}
const storeModel = {
  quiz: quizModel,
  user: userModel,
}
export default storeModel;