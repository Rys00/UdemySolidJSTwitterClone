import {
  ParentComponent,
  Show,
  createContext,
  onMount,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import Loader from "../components/utils/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../db";
import { User } from "../types/User";
import { useLocation, useNavigate } from "@solidjs/router";
import { getUser } from "../api/auth";

type AuthStateContextValues = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
};

const initialState = () => ({
  isAuthenticated: false,
  loading: true,
  user: null,
});

const AuthStateContext = createContext<AuthStateContextValues>();

const AuthProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<AuthStateContextValues>(initialState());
  const location = useLocation();
  const navigate = useNavigate();

  onMount(() => {
    setStore("loading", true);
    listenToAuthChanges();
  });

  const listenToAuthChanges = async () => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!!user) {
        const sliderUser = await getUser(user.uid);
        setStore("isAuthenticated", true);
        setStore("user", sliderUser);
        if (location.pathname.includes("/auth")) {
          navigate("/", { replace: true });
        }
      } else {
        setStore("isAuthenticated", false);
        setStore("user", null);
      }

      setStore("loading", false);
    });
  };

  return (
    <AuthStateContext.Provider value={store}>
      <Show when={store.loading} fallback={props.children}>
        <Loader size={200} />
      </Show>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext)!;

export default AuthProvider;
