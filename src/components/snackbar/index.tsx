import { IoCloseCircle } from "solid-icons/io";
import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  onMount,
} from "solid-js";
import { SnackbarMessage } from "../../context/ui";

type Props = {
  onClose: () => void;
  authHideDuration?: number;
} & SnackbarMessage;

export const Snackbar: Component<Props> = (initialProps) => {
  let props = mergeProps({ authHideDuration: 4000 }, initialProps);
  const type = props.type;
  const [duration, setDuration] = createSignal(props.authHideDuration);

  const completed = () =>
    Math.floor((duration() / props.authHideDuration) * 100);

  let timerId: number;

  onMount(() => {
    timerId = window.setInterval(() => {
      setDuration(duration() - 100);
    }, 100);
  });

  createEffect(() => {
    if (duration() <= 0) {
      window.clearInterval(timerId);
      props.onClose();
    }
  });

  return (
    <div
      class="min-w-68 text-white flex-it font-bold rounded-md md:max-w-xs w-full text-sm shadow-md"
      classList={{
        "bg-blue-400": type === "success",
        "bg-red-700": type === "error",
        "bg-yellow-500": type === "warning",
      }}
    >
      <div class="flex-it flex-row-reverse p-1">
        <button onClick={props.onClose} class="text-xl rounded-full">
          <IoCloseCircle />
        </button>
      </div>
      <div class="flex-it px-2 pb-3">{props.message}</div>
      <div
        style={{ width: `${completed()}%` }}
        class="bg-black opacity-40 text-right h-2 duration-100"
      ></div>
    </div>
  );
};
