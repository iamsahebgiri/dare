import React, { useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  Text,
  useToast,
} from "@chakra-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from 'yup';
import { auth } from "./../../config/firebaseConfig";
import { useStoreActions } from "easy-peasy";
export default function Login() {
  const toast = useToast();
  let browserHistory = useHistory();
  const setUser = useStoreActions(actions => actions.user.setUser);

  useEffect(() => {
    console.log('Login.js fired...')
    const authListener = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      }
    });
    return () => authListener();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required()
      .min(3, 'Seems a bit short...'),
  });
  return (
    <div className="container">
      <Text fontSize="3xl" fontWeight="bold" mb={2}>Log in</Text>
      <Formik
        validateOnChange={true}
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={({ email, password }, { setSubmitting }) => {
          setSubmitting(true);
          auth.signInWithEmailAndPassword(email, password)
            .then(() => {
              toast({
                title: "Logged in",
                description: "You are successfully logged in",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setSubmitting(false);
              browserHistory.push("/");
            })
            .catch(function (error) {
              setSubmitting(false);
              toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            });
        }}>

        {({ values, errors, isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field, form }) => {
                return (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="Email address" focusBorderColor="purple.500" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>
            <Field name="password">
              {({ field, form }) => {
                return (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} type="password" id="password" placeholder="Enter password" focusBorderColor="purple.500" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>

            <Button
              mt={4}
              variantColor="purple"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
          </Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>


        )}
      </Formik>
      <Text mt={4} textAlign="center">
        Don't have an account?{" "}

        <Link as={RouterLink} color="purple.500" to="/register">
          Create account
      </Link>
      </Text>
    </div>
  );
}