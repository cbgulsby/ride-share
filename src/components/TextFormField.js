import React from "react";
import { getIn } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from "@chakra-ui/core";

function TextFormField({ field, form, label, isRequired, ...props }) {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl isrequired={isRequired} isInvalid={!!errorText} my={4}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input id={field.name} {...field} {...props} />
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </FormControl>
  );
}

export default TextFormField;
