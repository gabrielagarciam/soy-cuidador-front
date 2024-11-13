<template>
  <DropdownBase>
    <div class="flex flex-row items-center gap-1 text-xs text-black">
      <font-awesome-icon :icon="`fa-regular fa-share-from-square`" />
      <p>Compartir</p>
    </div>

    <template #overlay>
      <ul class="w-full">
        <li
          v-for="link in shareLinks"
          :key="link.name"
          :class="[
            {
              'w-full h-px bg-black/10 my-1': link.divider,
            },
          ]"
        >
          <div
            class="w-full flex items-center px-2 rounded-md text-black mb-1"
            v-if="!link.divider"
          >
            <ButtonBase
              @click="link.onClick"
              class="w-full h-7 hover:!bg-primary/10 hover:text-primary"
              variant="link"
            >
              <div
                class="w-full text-left text-xs flex flex-row items-center gap-2"
              >
                <font-awesome-icon :icon="`${link.icon}`" />
                <span>{{ link.name }}</span>
              </div>
            </ButtonBase>
          </div>
        </li>
      </ul>
    </template>
  </DropdownBase>
</template>

<script setup>
import DropdownBase from "./Base/DropdownBase.vue";
import ButtonBase from "../components/Base/ButtonBase.vue";

function shareOnInstagram(url) {
  alert(
    "Instagram doesn't support direct link sharing. You can copy this link and paste it in your bio or stories."
  );
  // Optional: Open Instagram in a new tab as a fallback.
  window.open("https://www.instagram.com", "_blank");
}

function shareOnWhatsApp(url) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
  window.open(whatsappUrl, "_blank");
}

function shareOnFacebook(url) {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(facebookUrl, "_blank");
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

const shareLinks = [
  {
    name: "Copy Link",
    icon: "fa-regular fa-copy",
    onClick: copyToClipboard,
  },
  {
    divider: true,
  },
  {
    name: "WhatsApp",
    icon: "fa-brands fa-whatsapp",
    onClick: shareOnWhatsApp,
  },
  {
    name: "Instagram",
    icon: "fa-brands fa-instagram",
    onClick: shareOnInstagram,
  },
  {
    name: "Facebook",
    icon: "fa-brands fa-facebook",
    onclick: shareOnFacebook,
  },
];
</script>

<style lang="scss" scoped>
/* Add styling for icons if needed */
</style>
