import { Component } from "solid-js";

import MainLayout from "../components/layouts/Main";
import Messenger from "../components/utils/Messenger";
import useSlides from "../hooks/useSlides";
import PaginatedSlides from "../components/slides/PaginatedSlides";

const HomeScreen: Component = () => {
  const { store, addSlide, loadSlides, page } = useSlides();

  return (
    <MainLayout pageTitle="Home">
      <Messenger onSlideAdded={addSlide} />
      <div class="h-px bg-gray-700 my-1" />
      <PaginatedSlides
        page={page}
        pages={store.pages}
        loading={store.loading}
        loadMoreSlides={loadSlides}
      />
    </MainLayout>
  );
};

export default HomeScreen;
