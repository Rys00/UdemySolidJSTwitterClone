import { Component, ParentProps } from "solid-js";
import AuthProvider, { useAuthState } from "./context/auth";
import SnackbarContainer from "./components/snackbar/Conteiner";
import UIProvider from "./context/ui";

const App: Component<ParentProps> = (props) => {
  const authState = useAuthState()!;
  return (
    <UIProvider>
      <AuthProvider>
        <div id="popups" />
        <SnackbarContainer />
        {props.children}
      </AuthProvider>
    </UIProvider>
  );
};

export default App;
