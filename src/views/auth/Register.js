import React from "react";
import { Formik, Field, Form } from 'formik';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Link,
  Text
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import * as yup from 'yup';

export default function Register() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required()
      .min(3, 'Seems a bit short...')
    // .matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$","Minimum eight characters, at least one letter and one number"),
    ,
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
          // make async call
          setTimeout(() => {
            console.log("submit: ", data);
            setSubmitting(false);

          }, 1000);
        }}>

        {({ values, errors, isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field, form }) => {
                return (
                  <FormControl isInvalid={form.errors.email && form.touched.email} isRequired variantColor="purple">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="Email address" />
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
                    <Input {...field} type="password" id="password" placeholder="Enter password" />
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
              {/* <p>By signing up I agree to the terms and condtions. </p> */}

            <Button
              mt={4}
              variantColor="purple"
              isLoading={isSubmitting}
              type="submit"
            >
              Register
          </Button>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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