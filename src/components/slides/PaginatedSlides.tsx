import { Accessor, Component, For, Show, onCleanup, onMount } from "solid-js";
import SlidePost from "./SlidePost";
import { Slide } from "../../types/Slide";
import { CenteredDataLoader } from "../utils/DataLoader";

type Props = {
  page: Accessor<number>;
  pages: {
    [key: string]: { slides: Slide[] };
  };
  loading: boolean;
  loadMoreSlides: () => any;
};

const PaginatedSlides: Component<Props> = (props) => {
  let lastItemRef: HTMLDivElement;

  onMount(() => {
    window.addEventListener("scroll", loadNewItems);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", loadNewItems);
  });

  const loadNewItems = () => {
    if (lastItemRef.getBoundingClientRect().top <= window.innerHeight - 200) {
      if (!props.loading) {
        props.loadMoreSlides();
        console.log(1);
      }
    }
  };

  return (
    <>
      <For each={Array.from({ length: props.page() })}>
        {(_, i) => (
          <For each={props.pages[`${i() + 1}`]?.slides}>
            {(slide) => <SlidePost slide={slide} />}
          </For>
        )}
      </For>
      <Show when={props.loading}>
        <CenteredDataLoader />
      </Show>
      <div ref={lastItemRef!}></div>
      <div class="h-96"></div>
    </>
  );
};

export default PaginatedSlides;
