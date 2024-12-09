export default {
  name: 'EPButton',
  props: ['name'],
  template: `<button type="button" :data-name="name">
       <slot></slot>
  </button>`
}
