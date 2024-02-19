import { createRoot, createSignal, onMount } from "solid-js";

const getClientSize = () => ({
  height: document.body.clientHeight,
  width: document.body.clientWidth,
});

const pageSize = () => {
  const [value, setValue] = createSignal(getClientSize());

  const handleResize = () => {
    setValue(getClientSize());
  };

  onMount(() => {
    window.addEventListener("resize", handleResize);
  });

  const isXl = () => value().width > 1280;
  const isLg = () => value().width > 1024;

  return { isXl, isLg, value };
};

// createRoot() for making this function run by its own in the background onCleanup isn't gonna be called
// kinda like singleton it needs to be executed somewhere but second execution will just point to previous instance
export default createRoot(pageSize);
