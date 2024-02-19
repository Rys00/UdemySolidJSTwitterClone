import { createStore } from "solid-js/store";
import {
  Form,
  FormErrors,
  SliderInputEvent,
  SubmitCallback,
} from "../types/Form";
import { Accessor, For, ParentComponent, Show } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      validate: Validator[];
    }
  }
}

type Validator = (ref: HTMLInputElement, form: Form) => string;
type ValidatorConfig = { ref: HTMLInputElement; validators: Validator[] };

const niceName = (text: string) => {
  return text
    .split(/(?=[A-Z])/)
    .map((word, i) => {
      if (i == 0) {
        return word[0].toUpperCase() + word.substring(1);
      }
      return word.toLowerCase();
    })
    .join(" ");
};

export const FormError: ParentComponent = (props) => {
  const errors = () => (props.children as string[]) || [];
  return (
    <Show when={errors().length > 0}>
      <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
        <For each={errors()}>{(error) => <div>{error}</div>}</For>
      </div>
    </Show>
  );
};

export const requiredValidator: Validator = (
  ref: HTMLInputElement,
  _form: Form
) => {
  return ref.value.length === 0 ? `${niceName(ref.name)} is required` : "";
};

export const createCompareWithValidator =
  (fieldName: string): Validator =>
  (ref: HTMLInputElement, form: Form) => {
    if (ref.value.length === 0 || ref.value === form[fieldName]) return "";
    return `${niceName(ref.name)} needs to be the same as ${niceName(
      fieldName
    )}`;
  };

export const createMaxLengthValidator =
  (maxLength = 7): Validator =>
  (ref: HTMLInputElement, _form: Form) => {
    if (ref.value.length === 0 || ref.value.length < maxLength) return "";
    return `${niceName(ref.name)} should be less than ${maxLength} characters`;
  };

export const createMinLengthValidator =
  (minLength = 7): Validator =>
  (ref: HTMLInputElement, _form: Form) => {
    if (ref.value.length === 0 || ref.value.length > minLength) return "";
    return `${niceName(
      ref.name
    )} should be greater than ${minLength} characters`;
  };

export const firstUppercaseLetterValidator: Validator = (
  ref: HTMLInputElement,
  _form: Form
) => {
  if (ref.value.length === 0 || ref.value[0] == ref.value[0].toUpperCase())
    return "";
  return `First letter of ${niceName(ref.name)} should be uppercase`;
};

const useForm = <T extends Form>(initialForm: T) => {
  const [form, setForm] = createStore<T>(initialForm);
  const [errors, setErrors] = createStore<FormErrors>();

  const validatorFields: { [key: string]: ValidatorConfig } = {};

  const isValid = () => {
    const keys = Object.keys(errors);
    if (keys.length === 0) {
      return false;
    }

    return !keys.some((errorKey) => {
      return errors[errorKey].length > 0;
    });
  };

  const handleInput = (e: SliderInputEvent) => {
    const { name, value } = e.currentTarget;
    setForm(name as any, value as any);
  };

  const submitForm = (submitCallback: SubmitCallback<T>) => () => {
    for (const field in validatorFields) {
      checkValidity(validatorFields[field])();
    }
    if (isValid()) {
      submitCallback(form);
    }
  };

  const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
    const validators = accessor() || [];
    let config: ValidatorConfig;
    validatorFields[ref.name] = config = { ref, validators };

    ref.onblur = checkValidity(config);
    ref.oninput = () => {
      if (!errors[ref.name]) return;
      checkValidity(config)();
    };
  };

  const checkValidity =
    ({ ref, validators }: ValidatorConfig) =>
    () => {
      const message = [];
      for (const validator of validators) {
        const error = validator(ref, form);
        if (!!error) {
          message.push(error);
        }
      }
      setErrors(ref.name, message);
    };

  return {
    handleInput,
    submitForm,
    validate,
    errors,
  };
};

export default useForm;
