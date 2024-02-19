import { Component, For } from "solid-js";

const trends = [
  {
    category: "equal",
    content:
      "bound throat join blue coach rest dollar sign west copy replied snake sent electric writing western establish die younger beside twenty on stems pen",
    slideCount: 8052,
  },
  {
    category: "particularly",
    content:
      "dog hole dirty hardly saddle mistake experience wheel colony copy ear lose globe swim let society dug usually sister moon whale slowly track shade",
    slideCount: 9573,
  },
  {
    category: "mail",
    content:
      "mood teeth face sell none cattle energy meant construction fix increase sign recent teacher huge setting but began never laugh sang average is sugar",
    slideCount: 9364,
  },
  {
    category: "brick",
    content:
      "grabbed official pale replace back block green rose magnet clean mighty lot lie whether across tropical mysterious consist put bill specific fruit interest outside",
    slideCount: 236,
  },
  {
    category: "sense",
    content:
      "widely begun coat purpose being swim river refer sick shorter silent clearly lion funny hung wife friend remember case force sides earth science clothing",
    slideCount: 6215,
  },
];

const TrendsSidebar: Component = () => {
  return (
    <div class="bg-gray-800 overflow-hidden flex-it rounded-2xl">
      <div class="flex-it p-4">
        <span class="text-xl font-bold">Trends</span>
      </div>

      <For each={trends}>
        {(trend) => (
          <div class="flex-it p-4 cursor-pointer transition duration-200 hover:bg-gray-700">
            <div class="flex-it">
              <span class="text-gray-400 text-sm">{trend.content}</span>
              <span class="text-lg font-bold">{trend.category}</span>
              <span class="text-gray-400 text-sm">
                {trend.slideCount} slides
              </span>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default TrendsSidebar;
