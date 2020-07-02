<template>
  <div class="modal flex-center" v-if="showModal">
    <div class="modal-content">
      <!-- <div class="close" @click="showModal = false">&times;</div> -->
      <slot name="modal-content">
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data() {
    return {
      showModal: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  align-items: flex-start;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background: #fefefe;
  margin: 5rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  width: 80vw;
}

.close {
  color: #aaa;
  float: right;
  font-size: 2rem;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-heading {
  font-family: 'NotoSansBold';
  font-size: 2rem;
}
</style>
