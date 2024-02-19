import { ParentComponent, onMount } from "solid-js";
import { useAuthState } from "../../context/auth";
import { useNavigate } from "@solidjs/router";

const AuthLayout: ParentComponent = (props) => {
  const authState = useAuthState()!;
  const navigate = useNavigate();

  onMount(() => {
    if (authState.isAuthenticated) {
      // replace: true to kinda remove current url from history / remove option to go back here
      navigate("/", { replace: true });
    }
  });

  if (authState.isAuthenticated) return null;

  return (
    <>
      <div></div>
      {props.children}
    </>
  );
};

export default AuthLayout;
