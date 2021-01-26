import { helper } from '@ember/component/helper';

function objectHelper(positional, named) {
  return {...named};
}

export default helper(objectHelper);
