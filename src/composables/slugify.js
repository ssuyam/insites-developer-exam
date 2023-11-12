import { ref } from 'vue';
import _ from 'lodash';

export default function slugify(data) {
  const slug = _.kebabCase(data);
  return slug;
}