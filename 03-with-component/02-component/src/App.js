import {Component} from "./core/Component.js";

export class App extends Component {
  initState () {
    return {
      a: 10,
      b: 20,
    }
  }

  template () {
    const { a, b } = this.state;
    return `
      <input id="stateA" value="${a}" size="5" />
      <input id="stateB" value="${b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
  }

  setEvent () {
    const { $el, state } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      state.a = Number(target.value);
    })

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      state.b = Number(target.value);
    })
  }
}
