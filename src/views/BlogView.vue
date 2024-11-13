<template>
  <div>
    <div class="flex-1 flex">
      <div class="flex-1 py-4 px-2">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PostPreviewCard
            v-bind="item"
            v-for="item in content"
            :key="item.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostPreviewCard from "@/components/PostPreviewCard.vue";
const content = [
  {
    id: 1,
    title: "INTRODUCING: Virtual Color consultations",
    image: "https://via.placeholder.com/300x200",
    description: "Virtual color consultations with Anuschka Rees",
    link: "#",
  },
  {
    id: 2,
    title: 'OUT NOW: My new book "Beyond Beautiful"',
    image: "https://via.placeholder.com/300x200",
    description: 'My new book "Beyond Beautiful" is now available!',
    link: "#",
  },
  {
    id: 3,
    title: "Beyond Beautiful: How to pre-order + Instagram",
    image: "https://via.placeholder.com/300x200",
    description:
      'Pre-order your copy of "Beyond Beautiful" and connect with me on Instagram',
    link: "#",
  },
  {
    id: 4,
    title: "The 10x10 Challenge: How to create a capsule wardrobe",
    image: "https://via.placeholder.com/300x200",
    description:
      "Learn how to create a capsule wardrobe with the 10x10 challenge",
    link: "#",
  },
];
</script>

<style lang="scss" scoped></style>
