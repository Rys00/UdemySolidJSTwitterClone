import { createStore, produce } from "solid-js/store";
import { Slide } from "../types/Slide";
import { createSignal, onMount } from "solid-js";
import { getGlides } from "../api/slide";
import { useUIDispatch } from "../context/ui";
import { FirebaseError } from "firebase/app";
import { QueryDocumentSnapshot } from "firebase/firestore";

type State = {
  pages: {
    [key: string]: { slides: Slide[] };
  };
  loading: boolean;
  lastSlideRef: QueryDocumentSnapshot | null;
};

const createInitState = (): State => ({
  pages: {},
  loading: false,
  lastSlideRef: null,
});

const useSlides = () => {
  const [page, setPage] = createSignal(1);
  const [store, setStore] = createStore<State>(createInitState());
  const { addSnackbar } = useUIDispatch();

  onMount(() => {
    loadSlides();
  });

  const loadSlides = async () => {
    const _page = page();

    if (_page > 1 && !store.lastSlideRef) {
      return;
    }

    setStore("loading", true);

    try {
      const { slides, lastSlideRef } = await getGlides(store.lastSlideRef);

      if (slides.length > 0) {
        setStore(
          produce((store) => {
            store.pages[_page] = { slides };
            store.lastSlideRef = lastSlideRef;
          })
        );

        setPage(page() + 1);
      }
    } catch (error) {
      const message = (error as FirebaseError).message;
      addSnackbar({ message: message, type: "error" });
    } finally {
      setStore("loading", false);
    }
  };

  const addSlide = (slide: Slide) => {
    const page = 1;

    setStore(
      produce((store: State) => {
        if (!store.pages[page]) {
          store.pages[page] = { slides: [] };
        }

        store.pages[page].slides.unshift(slide);
      })
    );
  };

  return {
    loadSlides,
    store,
    page,
    addSlide,
  };
};

export default useSlides;
