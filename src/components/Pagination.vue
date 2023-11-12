<template>
  <div>
    <nav class="flex flex-col items-center" aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <button @click="prev" href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight border border-gray-300 rounded-l-lg">Previous</button>
        </li>
        <li v-for="pNum in range" :key="pNum">
          <button @click="goto(pNum)" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300" :class="pNum===page ? 'bg-indigo-600 text-white' : ''">{{pNum}}</button>
        </li>
        <li>
          <button @click="next" class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-r-lg">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import usePostsStore from '@/stores/posts';

const range = ref(['...']);
const props = defineProps(['totalPage', 'page', 'perPage', 'maxButtons']);
const emit = defineEmits(['next', 'prev', 'goto']);
const postsStore = usePostsStore();

watch(props, () => {
  organizeLinks();
})
onMounted(() => {
  organizeLinks();
  console.log('xss', props.page)
})

const organizeLinks = () => {
  range.value = [];
  for (let x = 1; x <= props.totalPage; x++) {
    
    if (
        x == 1 ||
        x == props.totalPage ||
        x == props.page ||
        x == props.page - 1 ||
        x == props.page + 1 ||
        (x<=4 && props.page < 4) ||
        (x>=props.totalPage-3 && props.page > props.totalPage - 3)
      ) {
      let index = range.value.length;
      if (index > 0 && range.value[index-1] < x-1) {
        range.value.push('...');
      }
      range.value.push(x);
    }
  }
  
}

const next = () => {
  if (props.page === props.totalPage) return;
    emit('next');
}
const prev = () => {
  if (props.page === 1) return;
    emit('prev');
}
const goto = (id) => {
  if (id === '...') return;
  emit('goto', id);
}


</script>

<style lang="scss" scoped>

</style>