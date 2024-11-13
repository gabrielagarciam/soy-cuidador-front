<template>
  <div class="post-content relative">
    <div class="bg-white py-16 rounded max-w-[45rem] m-auto shadow z-50 mt-12">
      <div class="flex flex-col gap-8">
        <div class="w-full flex flex-col gap-2">
          <h1 class="w-full text-center text-3xl font-bold text-black px-8">
            {{ source.title }}
          </h1>
          <h3
            class="w-full text-center text-sm text-black/85 leading-none px-8"
          >
            {{ source.description }}
          </h3>
          <div
            class="flex flex-row items-center justify-between border-t border-b py-2 px-8 mt-4"
          >
            <div class="flex flex-row items-center gap-1 text-xs text-black">
              <font-awesome-icon :icon="`fa-regular fa-clock`" />
              <p>
                {{ calculateReadTime(source.body) }} min read ·
                {{ source.date }}
              </p>
            </div>
            <div class="flex flex-row items-center gap-1 text-sm w-fit">
              <SharePost />
            </div>
          </div>
        </div>
        <p
          class="text-black text-sm leading-6 text-justify px-8"
          v-html="source.body"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SharePost from "../components/SharePost.vue";
import calculateReadTime from "../utils/calculateReadTime";

const source = computed(() => {
  return {
    date: "Mar 11, 2024",
    title: "Post Title",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio tempora voluptas magnam perspiciatis omnis ipsa aut cupiditate",
    body: ` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio tempora
          voluptas magnam perspiciatis omnis ipsa aut cupiditate, ea fugiat quod
          ab quidem sunt maiores ratione repellendus praesentium laboriosam a
          voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus optio perspiciatis dolorem neque. Alias mollitia temporibus
          praesentium ullam iste quae ipsum, aperiam explicabo debitis porro
          ducimus maiores delectus corporis minima? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Odio tempora voluptas magnam
          perspiciatis omnis ipsa aut cupiditate, ea fugiat quod ab quidem sunt
          maiores ratione repellendus praesentium laboriosam a voluptates. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Ducimus optio
          perspiciatis dolorem neque. Alias mollitia temporibus praesentium
          ullam iste quae ipsum, aperiam explicabo debitis porro ducimus maiores
          delectus corporis minima?<br /><br />

          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio tempora
          voluptas magnam perspiciatis omnis ipsa aut cupiditate, ea fugiat quod
          ab quidem sunt maiores ratione repellendus praesentium laboriosam a
          voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus optio perspiciatis dolorem neque. Alias mollitia temporibus
          praesentium ullam iste quae ipsum, aperiam explicabo debitis porro
          ducimus maiores delectus corporis minima? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Odio tempora voluptas magnam
          perspiciatis omnis ipsa aut cupiditate, ea fugiat quod ab quidem sunt
          maiores ratione repellendus praesentium laboriosam a voluptates. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Ducimus optio
          perspiciatis dolorem neque. Alias mollitia temporibus praesentium
          ullam iste quae ipsum, aperiam explicabo debitis porro ducimus maiores
          delectus corporis minima?<br /><br /><br />

          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio tempora
          voluptas magnam perspiciatis omnis ipsa aut cupiditate, ea fugiat quod
          ab quidem sunt maiores ratione repellendus praesentium laboriosam a
          voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus optio perspiciatis dolorem neque. Alias mollitia temporibus
          praesentium ullam iste quae ipsum, aperiam explicabo debitis porro
          ducimus maiores delectus corporis minima? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Odio tempora voluptas magnam
          perspiciatis omnis ipsa aut cupiditate, ea fugiat quod ab quidem sunt
          maiores ratione repellendus praesentium laboriosam a voluptates. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Ducimus optio
          perspiciatis dolorem neque. Alias mollitia temporibus praesentium
          ullam iste quae ipsum, aperiam explicabo debitis porro ducimus maiores
          delectus corporis minima?
          <br /><br /><br />

          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio tempora
          voluptas magnam perspiciatis omnis ipsa aut cupiditate, ea fugiat quod
          ab quidem sunt maiores ratione repellendus praesentium laboriosam a
          voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus optio perspiciatis dolorem neque. Alias mollitia temporibus
          praesentium ullam iste quae ipsum, aperiam explicabo debitis porro
          ducimus maiores delectus corporis minima? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Odio tempora voluptas magnam
          perspiciatis omnis ipsa aut cupiditate, ea fugiat quod ab quidem sunt
          maiores ratione repellendus praesentium laboriosam a voluptates. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Ducimus optio
          perspiciatis dolorem neque. Alias mollitia temporibus praesentium
          ullam iste quae ipsum, aperiam explicabo debitis porro ducimus maiores
          delectus corporis minima?`,
  };
});
</script>

<style lang="postcss" scoped>
.post-content {
  &::after {
    @apply bg-purple-500/25 right-0 left-0 flex h-80 top-14 fixed w-screen -z-10;
    content: " ";
    background-image: url("@/assets/postHeader.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .post-content__header {
  }
}
</style>
