let Keyboard = window.SimpleKeyboard.default;

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
    "{ent}": "return",
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

function onChange(input) {
  document.querySelector(".input").value = input;
}

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

function getPedidosFromLocalStorage(){
    let pedidos = localStorage.getItem('pedidos');
    let total = localStorage.getItem('total');

    let arrPedidos = pedidos.split(',')
    let listaPedidos = document.querySelector('.pedidosLista');
    
    arrPedidos.forEach((pedido) => {
        let listaItem = document.createElement('li');
        listaItem.textContent = pedido;
        listaPedidos.appendChild(listaItem);
    })

    document.querySelector('.precoTotal').textContent = "Preço Total: "+total;
}


document.querySelector('#nome').addEventListener('click', () => {
    document.querySelector('.simple-keyboard').id = "teclado";
});

document.querySelector('body').addEventListener('click', (e) => {
    let teclado = document.querySelector('.simple-keyboard');
    console.log(e.target.parentElement.parentElement.parentElement);
    if (e.target != teclado &&
         e.target.parentElement != teclado &&
         e.target.parentElement.parentElement != teclado &&
         e.target.parentElement.parentElement.parentElement != teclado){
        teclado.id = "invi";
    }
}, true);

let pagButtons = Array.from(document.querySelectorAll('.pagButton'));

pagButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        pagButtons.forEach(btn => btn.style.backgroundColor = "");
        button.style.backgroundColor = "orange";
        if (document.querySelector('#nome').value != ""){
            document.querySelector("#finalizar").disabled = false;
        }
    })
});

document.querySelector("#nome").addEventListener('change', (e) =>{
  let selecionouAlgum = false;
  pagButtons.forEach(btn => {
    if (btn.style.backgroundColor == "orange"){
      selecionouAlgum = true;
    }
  });
  if(selecionouAlgum){
    document.querySelector("#finalizar").disabled = false;
  }else{
    document.querySelector("#finalizar").disabled = true;
  }
});

getPedidosFromLocalStorage();