import { onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { User } from "../types/User";
import { getUsers } from "../api/users";
import { FirebaseError } from "firebase/app";
import { useUIDispatch } from "../context/ui";
import { useAuthState } from "../context/auth";

type State = {
  users: User[];
  loading: boolean;
};

const createInitState = (): State => ({
  users: [],
  loading: false,
});

const useUsers = () => {
  const { user } = useAuthState();
  const [store, setStore] = createStore<State>(createInitState());
  const { addSnackbar } = useUIDispatch();

  onMount(() => {
    loadUsers();
  });

  const loadUsers = async () => {
    setStore("loading", true);

    try {
      const users = await getUsers(user!);
      setStore("users", users);
    } catch (error) {
      const message = (error as FirebaseError).message;
      addSnackbar({ message: message, type: "error" });
    } finally {
      setStore("loading", false);
    }
  };

  return {
    store,
  };
};

export default useUsers;
