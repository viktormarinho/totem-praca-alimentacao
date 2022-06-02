import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let used = []

document.getElementById('iniciar').addEventListener('click', e => {
    applicationLoop(document.getElementById('nomeRes').value)
    e.target.disabled = true;
});


function applicationLoop(restauranteNome){
    onValue(ref(db, restauranteNome), snapshot => {
        const data = snapshot.val();
        for (let key in data){
            if (!used.includes(key)){
                used.push(key);
                atualizarPedidos(data[key], key);
            }
        }
    });
}

function atualizarPedidos(data, id){

    /* 
    <div class="pedido">
    gj
        <div class="pedido-click">
            <span class="nome">Viktor</span>
            <span class="horario">8:54:44 AM</span>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="pedido-content-off pedido-content">
            <ul class="lista-itens">
                <li>Shake Zimbas 18.0</li>
            </ul>
            <div>
                <span>Pagamento: Cartão</span>
                <p>Valor Total: 30.50</p>
            </div>
        </div>
        tfdtf
    </div> 
    */

    let divPedido = document.createElement('div');
    divPedido.classList.add('pedido');

    let divPedidoClick = document.createElement('div');
    divPedidoClick.classList.add('pedido-click');
    divPedidoClick.id = id;

    let divPedidoContent = document.createElement('div');
    divPedidoContent.classList.add('pedido-content-off');
    divPedidoContent.classList.add('pedido-content');

    let spanNome = document.createElement('span');
    spanNome.classList.add('nome');
    spanNome.textContent = data.nome;

    let spanHorario = document.createElement('span');
    spanHorario.classList.add('horario');
    spanHorario.textContent = data.horario;

    divPedidoClick.appendChild(spanNome);
    divPedidoClick.appendChild(spanHorario);
    divPedidoClick.innerHTML += '<i class="fa-solid fa-chevron-down"></i>'

    let ulListaItens = document.createElement('ul');
    ulListaItens.classList.add('lista-itens');

    for (let p of Array.from(data.pedido)){
        let li = document.createElement('li');
        li.textContent = p;
        ulListaItens.appendChild(li);
    }

    let divWrapper = document.createElement('div');
    let pagamentoSpan = document.createElement('span');
    pagamentoSpan.textContent = "Pagamento:" + data.pagamento;

    let valorTotal = document.createElement('p');
    valorTotal.textContent = "Valor Total: " + Number.parseFloat(data.total).toFixed(2);

    divWrapper.appendChild(pagamentoSpan);
    divWrapper.appendChild(valorTotal);

    divPedidoContent.appendChild(ulListaItens);
    divPedidoContent.appendChild(divWrapper);

    divPedido.appendChild(divPedidoClick);
    divPedido.appendChild(divPedidoContent);


    let pedidosNode = document.querySelector('.pedidos');
    pedidosNode.prepend(divPedido);


    funcionalidadePedidos();
}

let functional = [];

function funcionalidadePedidos(){
    let pedidos = Array.from(document.querySelectorAll('.pedido-click'));
    
    pedidos.forEach((pedido) => {
        if(!functional.includes(pedido.id)){
            functional.push(pedido.id);
            pedido.addEventListener('click', (e) => {
                let pedidoInfo = pedido.nextElementSibling;
                
                pedidoInfo.classList.toggle('pedido-content-on');
                pedidoInfo.classList.toggle('pedido-content-off');
            });
        }
    });
}
