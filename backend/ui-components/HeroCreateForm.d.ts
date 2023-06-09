/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HeroCreateFormInputValues = {
    name?: string;
    intelligence?: string;
    strength?: string;
    speed?: string;
    durability?: string;
    power?: string;
    combat?: string;
    image?: string;
    isSave?: boolean;
};
export declare type HeroCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    intelligence?: ValidationFunction<string>;
    strength?: ValidationFunction<string>;
    speed?: ValidationFunction<string>;
    durability?: ValidationFunction<string>;
    power?: ValidationFunction<string>;
    combat?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    isSave?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HeroCreateFormOverridesProps = {
    HeroCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    intelligence?: PrimitiveOverrideProps<TextFieldProps>;
    strength?: PrimitiveOverrideProps<TextFieldProps>;
    speed?: PrimitiveOverrideProps<TextFieldProps>;
    durability?: PrimitiveOverrideProps<TextFieldProps>;
    power?: PrimitiveOverrideProps<TextFieldProps>;
    combat?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    isSave?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type HeroCreateFormProps = React.PropsWithChildren<{
    overrides?: HeroCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HeroCreateFormInputValues) => HeroCreateFormInputValues;
    onSuccess?: (fields: HeroCreateFormInputValues) => void;
    onError?: (fields: HeroCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HeroCreateFormInputValues) => HeroCreateFormInputValues;
    onValidate?: HeroCreateFormValidationValues;
} & React.CSSProperties>;
export default function HeroCreateForm(props: HeroCreateFormProps): React.ReactElement;
