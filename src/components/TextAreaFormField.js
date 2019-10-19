import React from "react";
import { getIn } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea
} from "@chakra-ui/core";

function TextAreaFormField({ field, form, label, isRequired, ...props }) {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl isrequired={isRequired} isInvalid={!!errorText} my={4}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea id={field.name} {...field} {...props} />
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </FormControl>
  );
}

export default TextAreaFormField;
