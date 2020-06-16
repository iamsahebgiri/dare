import React, { useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Checkbox,
  Link,
  Text,
  useToast
} from "@chakra-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from 'yup';
import { useStoreActions, useStoreState } from 'easy-peasy';



export default function Register() {
  const toast = useToast();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const createUser = useStoreActions(actions => actions.user.createUser);
  const error = useStoreState(state => state.user.error);
  const authData = useStoreState(state => state.user.authData);

  let browserHistory = useHistory();

  useEffect(() => {
    if (Object.keys(error).length !== 0) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (Object.keys(authData).length !== 0) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      browserHistory.push("/onboarding");
    }

  })


  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Email must be valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(6, 'Must be more than 6 charracters'),
    agreeToTerms: yup
      .boolean()
      .test(
        'is-true',
        'Must agree to terms to continue',
        value => value === true
      ),
  });


  return (
    <div className="container">
      <Text fontSize="3xl" fontWeight="bold" mb={2}>Create account</Text>
      <Formik
        validateOnChange={true}
        initialValues={{ email: "", password: "", agreeToTerms: true }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          createUser(data);
          if (Object.keys(authData).length !== 0) {
            setSubmitting(false);
          }
        }}>

        {({ values, errors, isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field, form }) => {
                return (
                  <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
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
                  <FormControl isInvalid={form.errors.password && form.touched.password} isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        focusBorderColor="purple.500"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {/* <Input {...field} type="password" id="password" placeholder="Enter password" /> */}
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>
            <Field>
              {({ field, form }) => {
                return (
                  <FormControl mt={4} isInvalid={form.errors.agreeToTerms && form.touched.agreeToTerms}>
                    <Checkbox name="agreeToTerms" isChecked={field.value.agreeToTerms} onChange={form.handleChange} onBlur={form.handleBlur} defaultIsChecked isFullWidth isInvalid={!field.value.agreeToTerms} variantColor="purple">I agree to the terms and coditions.</Checkbox>
                    <FormErrorMessage>{form.errors.agreeToTerms}</FormErrorMessage>
                  </FormControl>
                )
              }

              }
            </Field>

            <Button
              mt={4}
              variantColor="purple"
              isLoading={isSubmitting}
              type="submit"
            >
              Register
          </Button>
          </Form>


        )}
      </Formik>
      <Text mt={4} textAlign="center">
        Already have an account?{" "}

        <Link as={RouterLink} color="purple.500" to="/login">
          Log in
      </Link>
      </Text>
    </div>
  );
}