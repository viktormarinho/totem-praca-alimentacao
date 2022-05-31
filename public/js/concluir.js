import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let Keyboard = window.SimpleKeyboard.default;

const restauranteNome = localStorage.getItem('restaurante');
const dbRef = ref(db, `${restauranteNome}`);

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  mergeDisplay: true,
  layoutName: "default",
  layout: {
    default: [
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "{shift} z x c v b n m {backspace}",
      "{numbers} {space} {ent}"
    ],
    shift: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{shift} Z X C V B N M {backspace}",
      "{numbers} {space} {ent}"
    ],
    numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
  },
  display: {
    "{numbers}": "123",
    "{ent}": "concluir",
    "{escape}": "esc ⎋",
    "{tab}": "tab ⇥",
    "{backspace}": "⌫",
    "{capslock}": "caps lock ⇪",
    "{shift}": "⇧",
    "{controlleft}": "ctrl ⌃",
    "{controlright}": "ctrl ⌃",
    "{altleft}": "alt ⌥",
    "{altright}": "alt ⌥",
    "{metaleft}": "cmd ⌘",
    "{metaright}": "cmd ⌘",
    "{abc}": "ABC"
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});


function onKeyPress(button) {

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
  if (button === "{numbers}" || button === "{abc}") handleNumbers();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}

function handleNumbers() {
  let currentLayout = keyboard.options.layoutName;
  let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

  keyboard.setOptions({
    layoutName: numbersToggle
  });
}

function getPedidosFromLocalStorage() {
  let pedidos = localStorage.getItem('pedidos');
  let total = Number.parseFloat(localStorage.getItem('total'));

  let arrPedidos = pedidos.split(',')
  let listaPedidos = document.querySelector('.pedidosLista');

  arrPedidos.forEach((pedido) => {
    let listaItem = document.createElement('li');
    listaItem.textContent = pedido;
    listaPedidos.appendChild(listaItem);
  })

  document.querySelector('.precoTotal').textContent = "Preço Total: " + total.toFixed(2);
}


document.querySelector('#nome').addEventListener('click', () => {
  document.querySelector('.simple-keyboard').id = "teclado";
});

document.querySelector('body').addEventListener('click', (e) => {
  let teclado = document.querySelector('.simple-keyboard');
  if (e.target != teclado &&
    e.target.parentElement != teclado &&
    e.target.parentElement.parentElement != teclado &&
    e.target.parentElement.parentElement.parentElement != teclado) {
    teclado.id = "invi";
  }
}, true);

let pagButtons = Array.from(document.querySelectorAll('.pagButton'));
let selecionouAlgum = false;
let botaoFinalizar = document.querySelector("#finalizar");

pagButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    pagButtons.forEach(btn => btn.style.backgroundColor = "");
    button.style.backgroundColor = "orange";
    selecionouAlgum = true;
    if (document.querySelector('#nome').value != "") {
      botaoFinalizar.disabled = false;
    }
  })
});

let inputField = document.querySelector('#nome');

function onChange(input) {
  document.querySelector(".input").value = input;
  if (selecionouAlgum && inputField.value !== "") {
    botaoFinalizar.disabled = false;
  } else {
    botaoFinalizar.disabled = true;
  }
}

botaoFinalizar.addEventListener('click', () => {
  let nomeUsuario = inputField.value;
  let tipoPagamento = "";
  let pedidos = localStorage.getItem('pedidos').split(',');
  let total = localStorage.getItem('total');
  pagButtons.forEach(btn => {
    if (btn.style.backgroundColor == "orange"){
      tipoPagamento = btn.textContent;
    }
  });

  const pedido = {
    nome: nomeUsuario,
    pagamento: tipoPagamento,
    pedido: pedidos,
    total: total
  }

  push(dbRef, pedido);
});


getPedidosFromLocalStorage();