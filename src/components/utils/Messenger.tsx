import { FaRegularImage } from "solid-icons/fa";
import { Component } from "solid-js";
import useMessenger from "../../hooks/useMessenger";
import { useAuthState } from "../../context/auth";
import { SliderInputEvent } from "../../types/Form";
import { Slide } from "../../types/Slide";

type Props = {
  onSlideAdded: (s: Slide) => void;
};

const Messenger: Component<Props> = (props) => {
  const { user } = useAuthState();
  const { handleInput, handleSubmit, form, loading } = useMessenger();

  const autoSize = (event: SliderInputEvent) => {
    const el = event.currentTarget;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <div class="flex-it py-1 px-4 flex-row">
      <div class="flex-it mr-4">
        <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
          <img class="rounded-full" src={user?.avatar}></img>
        </div>
      </div>
      <div class="flex-it flex-grow">
        <div class="flex-it">
          <textarea
            value={form.content}
            onInput={(e) => {
              handleInput(e);
              autoSize(e);
            }}
            name="content"
            rows="1"
            id="glide"
            class="bg-transparent resize-none overflow-hidden block !outline-none !border-none border-transparent focus:border-transparent focus:ring-0 text-gray-100 text-xl w-full p-0"
            placeholder={"What's new?"}
          />
        </div>
        <div class="flex-it mb-1 flex-row xs:justify-between items-center">
          <div class="flex-it mt-3 mr-3 cursor-pointer text-white hover:text-blue-400 transition">
            <div class="upload-btn-wrapper">
              <FaRegularImage class="cursor-pointer" size={18} />
              <input type="file" name="myfile" />
            </div>
          </div>
          <div class="flex-it w-32 mt-3 cursor-pointer">
            <button
              onClick={async () => {
                const slide = await handleSubmit();
                if (slide) {
                  props.onSlideAdded(slide);
                }
              }}
              disabled={loading()}
              type="button"
              class="
                            disabled:cursor-not-allowed disabled:bg-gray-400
                            bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200"
            >
              <div class="flex-it flex-row text-sm font-bold text-white items-start justify-center">
                <span>Slide It</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
