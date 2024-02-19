import { createSignal } from "solid-js";
import { AuthType, authenticate } from "../api/auth";
import { AuthForm } from "../types/Form";
import { useUIDispatch } from "../context/ui";
import { FirebaseError } from "firebase/app";

const useAuth = (type: AuthType) => {
  const [loading, setLoading] = createSignal(false);
  const { addSnackbar } = useUIDispatch();

  const authUser = async (form: AuthForm) => {
    setLoading(true);
    try {
      const user = await authenticate(form, type);
      addSnackbar({
        message: "Welcome to Slider!",
        type: "success",
      });
    } catch (error) {
      const message = (error as FirebaseError).message;
      addSnackbar({
        message: message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { authUser, loading };
};

export default useAuth;
