import EPButton from './components/EPButton.js'
export default {
  components: {
    EPButton
  },
  template: `
   <div id="app">
        <div>{{count}}</div>
        <h1>{{title}}</h1>
        <!-- <button-counter /> -->
        <my-comp></my-comp>
        <my-button cname="cname"></my-button>
        <MyButton abc="abc123"></MyButton><!-- -- <mybutton></mybutton>  -->
        <EPButton name="EPBUtton">
         Hello BUtton
        </EPButton>
    </div>
  `,
  data() {
    return {
      count: 12,
      title: 'Hello Vue2'
    }
  }
}
