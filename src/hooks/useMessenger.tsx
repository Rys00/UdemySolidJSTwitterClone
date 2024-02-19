import { createStore } from "solid-js/store";
import { MessengerForm, SliderInputEvent } from "../types/Form";
import { useAuthState } from "../context/auth";
import { useUIDispatch } from "../context/ui";
import { createSignal } from "solid-js";
import { createSlide } from "../api/slide";
import { FirebaseError } from "firebase/app";
import { Slide } from "../types/Slide";

const useMessenger = () => {
  const { isAuthenticated, user } = useAuthState();
  const [loading, setLoading] = createSignal(false);
  const [form, setForm] = createStore<MessengerForm>({
    content: "",
  });
  const { addSnackbar } = useUIDispatch();

  const handleInput = (event: SliderInputEvent) => {
    const { name, value } = event.currentTarget;
    setForm(name, value);
  };

  const handleSubmit = async (): Promise<Slide | undefined> => {
    if (!isAuthenticated) {
      addSnackbar({
        message: "You are not authenticated",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const slide = {
      ...form,
      uid: user!.uid,
    };

    try {
      const newSlide = await createSlide(slide);
      addSnackbar({ message: "Slide added", type: "success" });
      setForm({ content: "" });
      return {
        ...newSlide,
        user: { ...user! },
      };
    } catch (error) {
      const message = (error as FirebaseError).message;
      addSnackbar({ message: message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleInput,
    handleSubmit,
    form,
    loading,
  };
};

export default useMessenger;
