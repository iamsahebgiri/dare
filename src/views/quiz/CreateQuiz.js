import React, { useState } from 'react';
import DarkMode from '../../components/DarkMode';
import { IconButton, Link, useColorMode, Textarea, Stack, Input, Select, Divider, Flex, FormControl, FormErrorMessage, useToast } from "@chakra-ui/core";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import "./CreateQuiz.css";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { auth } from '../../config/firebaseConfig';
import Progress from './../../components/Progress'

function FuncCreateQuiz() {
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const color = { light: "gray.800", dark: "white" };
  const optionColor = { light: { background: "white" }, dark: { background: "rgba(255,255,255,0.08" } };
  const { data, quizName, noOfQuestions, quizId } = useStoreState(state => state.quiz);
  const setQuizData = useStoreActions(actions => actions.quiz.setQuizData);
  const sendQuestionsToFirestore = useStoreActions(actions => actions.quiz.sendQuestionsToFirestore);
  const toast = useToast();

  let browserHistory = useHistory();
  const validationSchema = yup.object({
    question: yup
      .string()
      .required("Question is required"),
    optionA: yup
      .string()
      .required("Option A is required"),
    optionB: yup
      .string()
      .required("Option B is required"),
    optionC: yup
      .string()
      .required("Option C is required"),
    optionD: yup
      .string()
      .required("Option D is required"),
    answer: yup
      .string()
      .required("Answer is required"),
  });


  function handleFirestoreSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (quizName !== '' || auth.currentUser.uid !== null) {
      sendQuestionsToFirestore({ data, quizName, noOfQuestions, quizId });
      toast({
        title: "Dare created.",
        description: "Check your Profile for quiz.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      browserHistory.push("/");
      setIsLoading(false);
    }
  }
  if (quizName === '') {
    browserHistory.push("/");
  }

  return (
    <>
      <Progress isAnimating={isLoading} />
      <Formik
        validateOnChange={true}
        initialValues={{ question: "", optionA: "", optionB: "", optionC: "", optionD: "", answer: "" }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setQuizData(data);
          resetForm({});
          setSubmitting(false);
        }}>
        {({ values, errors, isSubmitting, handleBlur, handleChange }) => (
          <Form>
            <div className="quiz-container">
              <div className="quiz-top">
                <div className="quiz-header">
                  <div className="back">
                    <Link as={RouterLink} to="/">
                      <IconButton isRound="true" size="sm" icon={FiChevronLeft} color={color[colorMode]} />
                    </Link>
                  </div>
                  <div className="quiz-title">{(data.length === noOfQuestions) ? "Submit your quiz now" : ` ${data.length + 1}/${noOfQuestions}`}</div>
                  <div>
                    <DarkMode />
                  </div>
                </div>
                {(data.length === noOfQuestions) ? null :
                  <div className="quiz-question-wrapper">
                    <div className="quiz-questions-container" style={optionColor[colorMode]}>
                      <Field name="question">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.question && form.touched.question} isRequired>
                            <Textarea
                              {...field}
                              id="question"
                              placeholder="Eg. Shakt launda of our class?"
                              focusBorderColor="purple.500"
                              width="80vw"
                            />
                            <FormErrorMessage>{form.errors.question}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    <div className="fake-quiz-container" style={optionColor[colorMode]}></div>
                  </div>}
              </div>
              {(data.length === noOfQuestions) ? null :
                <div className="quiz-options">
                  <p>Fill out all options below</p>
                  <Stack spacing={3} width="90%" mt={4}>
                    <Field name="optionA">
                      {({ field, form }) => {
                        return (
                          <FormControl isInvalid={form.errors.optionA && form.touched.optionA} isRequired mb={3}>
                            <Input {...field} id="optionA" placeholder="Eg. Prakash" focusBorderColor="purple.500" />
                            <FormErrorMessage>{form.errors.optionA}</FormErrorMessage>
                          </FormControl>
                        )
                      }}
                    </Field>
                    <Field name="optionB">
                      {({ field, form }) => {
                        return (
                          <FormControl isInvalid={form.errors.optionB && form.touched.optionB} isRequired mb={3}>
                            <Input {...field} id="optionB" placeholder="Eg. Rahul" focusBorderColor="purple.500" />
                            <FormErrorMessage>{form.errors.optionB}</FormErrorMessage>
                          </FormControl>
                        )
                      }}
                    </Field>
                    <Field name="optionC">
                      {({ field, form }) => {
                        return (
                          <FormControl isInvalid={form.errors.optionC && form.touched.optionC} isRequired mb={3}>
                            <Input {...field} id="optionC" placeholder="Eg. Prakash" focusBorderColor="purple.500" />
                            <FormErrorMessage>{form.errors.optionC}</FormErrorMessage>
                          </FormControl>
                        )
                      }}
                    </Field>
                    <Field name="optionD">
                      {({ field, form }) => {
                        return (
                          <FormControl isInvalid={form.errors.optionD && form.touched.optionD} isRequired mb={3}>
                            <Input {...field} id="optionD" placeholder="Eg. Prakash" focusBorderColor="purple.500" />
                            <FormErrorMessage>{form.errors.optionD}</FormErrorMessage>
                          </FormControl>
                        )
                      }}
                    </Field>

                    <Divider />
                    <Select name="answer" placeholder="Select answer" focusBorderColor="purple.500" value={values.answer}
                      onChange={handleChange}
                      onBlur={handleBlur}>
                      <option value="1">Option A</option>
                      <option value="2">Option B</option>
                      <option value="3">Option C</option>
                      <option value="4">Option D</option>
                    </Select>
                  </Stack>
                </div>}
              <Flex alignItems="center" justifyContent="center" mt={4} mb={4} flexDirection="column">
                {(data.length === noOfQuestions) ? <button className="btn-primary btn" onClick={(e) => handleFirestoreSubmit(e)}>Submit</button> : <button className="btn-secondary btn" type="submit">Add</button>}
              </Flex>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default class CreateQuiz extends React.Component {
  render() {
    if (auth.currentUser == null) return <Redirect to="/login" />
    return (
      <FuncCreateQuiz />
    )
  }
}

