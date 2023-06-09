/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Hero } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HeroCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    intelligence: "",
    strength: "",
    speed: "",
    durability: "",
    power: "",
    combat: "",
    image: "",
    isSave: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [intelligence, setIntelligence] = React.useState(
    initialValues.intelligence
  );
  const [strength, setStrength] = React.useState(initialValues.strength);
  const [speed, setSpeed] = React.useState(initialValues.speed);
  const [durability, setDurability] = React.useState(initialValues.durability);
  const [power, setPower] = React.useState(initialValues.power);
  const [combat, setCombat] = React.useState(initialValues.combat);
  const [image, setImage] = React.useState(initialValues.image);
  const [isSave, setIsSave] = React.useState(initialValues.isSave);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setIntelligence(initialValues.intelligence);
    setStrength(initialValues.strength);
    setSpeed(initialValues.speed);
    setDurability(initialValues.durability);
    setPower(initialValues.power);
    setCombat(initialValues.combat);
    setImage(initialValues.image);
    setIsSave(initialValues.isSave);
    setErrors({});
  };
  const validations = {
    name: [],
    intelligence: [],
    strength: [],
    speed: [],
    durability: [],
    power: [],
    combat: [],
    image: [],
    isSave: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          intelligence,
          strength,
          speed,
          durability,
          power,
          combat,
          image,
          isSave,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Hero(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "HeroCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              intelligence,
              strength,
              speed,
              durability,
              power,
              combat,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Intelligence"
        isRequired={false}
        isReadOnly={false}
        value={intelligence}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence: value,
              strength,
              speed,
              durability,
              power,
              combat,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.intelligence ?? value;
          }
          if (errors.intelligence?.hasError) {
            runValidationTasks("intelligence", value);
          }
          setIntelligence(value);
        }}
        onBlur={() => runValidationTasks("intelligence", intelligence)}
        errorMessage={errors.intelligence?.errorMessage}
        hasError={errors.intelligence?.hasError}
        {...getOverrideProps(overrides, "intelligence")}
      ></TextField>
      <TextField
        label="Strength"
        isRequired={false}
        isReadOnly={false}
        value={strength}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength: value,
              speed,
              durability,
              power,
              combat,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.strength ?? value;
          }
          if (errors.strength?.hasError) {
            runValidationTasks("strength", value);
          }
          setStrength(value);
        }}
        onBlur={() => runValidationTasks("strength", strength)}
        errorMessage={errors.strength?.errorMessage}
        hasError={errors.strength?.hasError}
        {...getOverrideProps(overrides, "strength")}
      ></TextField>
      <TextField
        label="Speed"
        isRequired={false}
        isReadOnly={false}
        value={speed}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength,
              speed: value,
              durability,
              power,
              combat,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.speed ?? value;
          }
          if (errors.speed?.hasError) {
            runValidationTasks("speed", value);
          }
          setSpeed(value);
        }}
        onBlur={() => runValidationTasks("speed", speed)}
        errorMessage={errors.speed?.errorMessage}
        hasError={errors.speed?.hasError}
        {...getOverrideProps(overrides, "speed")}
      ></TextField>
      <TextField
        label="Durability"
        isRequired={false}
        isReadOnly={false}
        value={durability}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength,
              speed,
              durability: value,
              power,
              combat,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.durability ?? value;
          }
          if (errors.durability?.hasError) {
            runValidationTasks("durability", value);
          }
          setDurability(value);
        }}
        onBlur={() => runValidationTasks("durability", durability)}
        errorMessage={errors.durability?.errorMessage}
        hasError={errors.durability?.hasError}
        {...getOverrideProps(overrides, "durability")}
      ></TextField>
      <TextField
        label="Power"
        isRequired={false}
        isReadOnly={false}
        value={power}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength,
              speed,
              durability,
              power: value,
              combat,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.power ?? value;
          }
          if (errors.power?.hasError) {
            runValidationTasks("power", value);
          }
          setPower(value);
        }}
        onBlur={() => runValidationTasks("power", power)}
        errorMessage={errors.power?.errorMessage}
        hasError={errors.power?.hasError}
        {...getOverrideProps(overrides, "power")}
      ></TextField>
      <TextField
        label="Combat"
        isRequired={false}
        isReadOnly={false}
        value={combat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength,
              speed,
              durability,
              power,
              combat: value,
              image,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.combat ?? value;
          }
          if (errors.combat?.hasError) {
            runValidationTasks("combat", value);
          }
          setCombat(value);
        }}
        onBlur={() => runValidationTasks("combat", combat)}
        errorMessage={errors.combat?.errorMessage}
        hasError={errors.combat?.hasError}
        {...getOverrideProps(overrides, "combat")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength,
              speed,
              durability,
              power,
              combat,
              image: value,
              isSave,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <SwitchField
        label="Is save"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isSave}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              intelligence,
              strength,
              speed,
              durability,
              power,
              combat,
              image,
              isSave: value,
            };
            const result = onChange(modelFields);
            value = result?.isSave ?? value;
          }
          if (errors.isSave?.hasError) {
            runValidationTasks("isSave", value);
          }
          setIsSave(value);
        }}
        onBlur={() => runValidationTasks("isSave", isSave)}
        errorMessage={errors.isSave?.errorMessage}
        hasError={errors.isSave?.hasError}
        {...getOverrideProps(overrides, "isSave")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
