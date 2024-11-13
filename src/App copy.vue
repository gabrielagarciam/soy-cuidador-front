<template>
  <div class="flex flex-col h-screen">

   

    <div class="flex-1 flex">
      <!-- Main Content -->
      <div class="flex-1 px-8 py-8 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="item in content"
            :key="item.id"
            class="bg-white shadow-md rounded-md p-4"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-cover mb-4 rounded-t-md"
            />
            <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600 mb-4">{{ item.description }}</p>
            <a :href="item.link" class=" text-purple-500 hover:text-blue-700"
              >Read more</a
            >
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      content: [
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
          title: "Help me write my next book",
          image: "https://via.placeholder.com/300x200",
          description: "The BEYOND BEAUTY body confidence survey",
          link: "#",
        },
        {
          id: 5,
          title:
            'Our this week: "Das Kleiderdenk Prinzip" and "The Curated Closet" UK edition',
          image: "https://via.placeholder.com/300x200",
          description: "New book releases from Anuschka Rees",
          link: "#",
        },
        {
          id: 6,
          title:
            "9 Ways to boost your style confidence and have more fun with fashion this year",
          image: "https://via.placeholder.com/300x200",
          description: "Tips to help you feel more confident with your style",
          link: "#",
        },
      ],
    };
  },
};
</script>
