export type SliderInputEvent = InputEvent & {
  currentTarget: HTMLInputElement | HTMLTextAreaElement;
  target: HTMLInputElement | HTMLTextAreaElement;
};

export type Form = { [key: string]: string };

export type FormErrors = { [key: string]: string[] };

export type MessengerForm = Form & {
  content: string;
};

export type AuthForm = Form & {
  email: string;
  password: string;
};

export type RegisterForm = AuthForm & {
  fullName: string;
  nickname: string;
  avatar: string;
  passwordConfirmation: string;
};

export type SubmitCallback<T extends Form> = (f: T) => void;
