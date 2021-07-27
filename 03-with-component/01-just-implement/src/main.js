import { observable, observe } from "./core/observer.js";

const state = observable({
  a: 10,
  b: 20,
});

const $app = document.querySelector('#app');

const render = () => {
  $app.innerHTML = `
        <p>a + b = ${state.a + state.b}</p>
        <input id="stateA" value="${state.a}" />
        <input id="stateB" value="${state.b}" />
      `;

  $app.querySelector('#stateA').addEventListener('change', ({ target }) => {
    state.a = Number(target.value);
  })

  $app.querySelector('#stateB').addEventListener('change', ({ target }) => {
    state.b = Number(target.value);
  })
}

observe(render);