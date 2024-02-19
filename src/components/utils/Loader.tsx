import { Component } from "solid-js";
import { FaBrandsSitrox } from "solid-icons/fa";

type Props = {
  size: number;
};

const Loader: Component<Props> = (props) => {
  return (
    <div class="flex-it text-white justify-center items-center h-full">
      <div class="rotating">
        <FaBrandsSitrox size={props.size} />
      </div>
    </div>
  );
};

export default Loader;
