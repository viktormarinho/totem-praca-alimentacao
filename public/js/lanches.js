import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const restauranteId = document.querySelector('title').textContent;
const restauranteRef = doc(collection(db, 'restaurantes'), restauranteId);

const res = await getDoc(restauranteRef);

const imagemRestaurante = res.data().imagem;

document.getElementById('logo').setAttribute('src', imagemRestaurante);


// Seleciona todos os elementos com a classe "liMenu" e gera um Array a partir deles.
// Geramos um array pois o padrão retornado dessa função é uma NodeList que não nos permite fazer um loop forEach
const menuItems = Array.from(document.querySelectorAll('.liMenu'));

const functions = [gerarPromos, gerarLanches, gerarBebidas, gerarSobremesas];

// Dentro do loop for each, adicionamos a cada elemento do Array menuItems um Event Listener de click
menuItems.forEach((item) => {
    // esse event listener de click executa uma função que faz outro loop em todos os itens do menu apenas para remover a classe selected
    // e em seguida adiciona a classe selected apenas ao item clicado
    item.addEventListener('click', () => {
        menuItems.forEach(itemzin => itemzin.classList.remove('selected'));
        item.classList.add('selected');
        limpar();
        functions[item.id]();
    });
});

const divLanches = document.getElementById('lanches');
const divCarrinho = document.querySelector('.carrinhoLanches');
const cardapio = res.data().cardapio;

function gerarLanches(){
    let lanches = cardapio['lanches']
    for (let lancheKey in lanches){
        let lanche = lanches[lancheKey];
        
        let divLanche = document.createElement('div');
        divLanche.classList.add('lanche');

        let imagemLanche = document.createElement('img');
        imagemLanche.src = lanche.imagem;

        let divInterior = document.createElement('div');
        let nomeLanche = document.createElement('h4');
        nomeLanche.textContent = lanche.nome;

        let footerzin = document.createElement('footer');
        let h4preco = document.createElement('h4');

        h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${lanche.valor.toFixed(2)}`

        footerzin.appendChild(h4preco);
        footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

        divInterior.appendChild(nomeLanche);
        divInterior.appendChild(footerzin);

        divLanche.appendChild(imagemLanche);
        divLanche.appendChild(divInterior);

        divLanches.appendChild(divLanche);
    }
    gerarBotoes();
}

function gerarBebidas(){
    let bebidas = cardapio['bebidas'];
    for (let bebidasKey in bebidas){
        let bebida = bebidas[bebidasKey];
        
        let divBebida = document.createElement('div');
        divBebida.classList.add('lanche');

        let imagemBebida = document.createElement('img');
        imagemBebida.src = bebida.imagem;

        let divInterior = document.createElement('div');
        let nomeBebida = document.createElement('h4');
        nomeBebida.textContent = bebida.nome;

        let footerzin = document.createElement('footer');
        let h4preco = document.createElement('h4');

        h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${bebida.valor.toFixed(2)}`

        footerzin.appendChild(h4preco);
        footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

        divInterior.appendChild(nomeBebida);
        divInterior.appendChild(footerzin);

        divBebida.appendChild(imagemBebida);
        divBebida.appendChild(divInterior);

        divLanches.appendChild(divBebida);
    }
    gerarBotoes();
}

function gerarSobremesas(){
    let sobremesas = cardapio['sobremesas'];
    for (let sobremesaKey in sobremesas){
        let sobremesa = sobremesas[sobremesaKey];
        
        let divSobremesa = document.createElement('div');
        divSobremesa.classList.add('lanche');

        let imagemSobremesa = document.createElement('img');
        imagemSobremesa.src = sobremesa.imagem;

        let divInterior = document.createElement('div');
        let nomeSobremesa = document.createElement('h4');
        nomeSobremesa.textContent = sobremesa.nome;

        let footerzin = document.createElement('footer');
        let h4preco = document.createElement('h4');

        h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${sobremesa.valor.toFixed(2)}`

        footerzin.appendChild(h4preco);
        footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

        divInterior.appendChild(nomeSobremesa);
        divInterior.appendChild(footerzin);

        divSobremesa.appendChild(imagemSobremesa);
        divSobremesa.appendChild(divInterior);

        divLanches.appendChild(divSobremesa);
    }
    gerarBotoes();
}

function gerarPromos(){
    for (let categoriaKey in cardapio){
        let categoria = cardapio[categoriaKey];
        for (let itemKey in categoria){
            let item = categoria[itemKey];
            if (item.promo){
                let divLanche = document.createElement('div');
                divLanche.classList.add('lanche');

                let imagemLanche = document.createElement('img');
                imagemLanche.src = item.imagem;

                let divInterior = document.createElement('div');
                let nomeLanche = document.createElement('h4');
                nomeLanche.textContent = item.nome;

                let footerzin = document.createElement('footer');
                let h4preco = document.createElement('h4');

                h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${item.valor.toFixed(2)}`

                footerzin.appendChild(h4preco);
                footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

                divInterior.appendChild(nomeLanche);
                divInterior.appendChild(footerzin);

                divLanche.appendChild(imagemLanche);
                divLanche.appendChild(divInterior);

                divLanches.appendChild(divLanche);
            }
        }
    }
    gerarBotoes();
}

function limpar(){
    divLanches.innerHTML = "";
}

const totalDoCarrinho = document.querySelector('.totalDoCarrinho');

let TOTAL = 0;

let arrPedidos = [];
let arrBotoesRemover = [];

function gerarBotoes(){
    let botoes = Array.from(document.querySelectorAll('.fa-square-plus'));

    botoes.forEach(botao => {
        botao.addEventListener('click', (evt) => {
            // Pega a imagem do lanche que foi clicado 
            let imagemLancheClicado = botao.parentElement.parentElement.parentElement.firstChild.src;
            let precoLancheClicado = Number.parseFloat(botao.parentElement.textContent);
            let nomeLancheClicado = botao.parentElement.parentElement.textContent;
            arrPedidos.push(nomeLancheClicado);
            
            let divItemCarrinho = document.createElement('div');
            divItemCarrinho.classList.add('carrinhoItem');

            let imagemItemCarrinho = document.createElement('img');
            imagemItemCarrinho.src = imagemLancheClicado;
            imagemItemCarrinho.alt = nomeLancheClicado;

            let precoItemCarrinho = document.createElement('h4');
            precoItemCarrinho.textContent =`$ ${precoLancheClicado.toFixed(2)}`;
            TOTAL += precoLancheClicado;
            totalDoCarrinho.textContent = `Total do carrinho: $ ${TOTAL.toFixed(2)}`

            let footerItemCarrinho = document.createElement('footer');
            footerItemCarrinho.classList.add('footerItemCarrinho');

            footerItemCarrinho.appendChild(precoItemCarrinho);
            footerItemCarrinho.innerHTML += ' <i class="fa-solid fa-circle-minus"></i>'
            arrBotoesRemover.push(footerItemCarrinho.lastChild);

            divItemCarrinho.appendChild(imagemItemCarrinho);
            divItemCarrinho.appendChild(footerItemCarrinho);

            divCarrinho.appendChild(divItemCarrinho);
            ativarRemoverLanches();
        });
    });

    
}

function handleDelete(evt){
    let botao = arrBotoesRemover[evt.target.id];
    let nomeLanche = botao.parentElement.parentElement.firstChild.alt;
    let preco = Number.parseFloat(nomeLanche.slice(-5));
    TOTAL -= preco;
    totalDoCarrinho.textContent = `Total do carrinho: $ ${TOTAL.toFixed(2)}`
    let index = arrPedidos.indexOf(nomeLanche);
    console.log(index);
    if (index > -1){
        arrPedidos.splice(index, 1);
    }
    botao.parentElement.parentElement.remove();
}

function ativarRemoverLanches(){
    
    let idx = 0;
    arrBotoesRemover.forEach(botao => {
        botao.id = idx;
        idx++;
        botao.addEventListener('click', handleDelete);
    });
}

function concluirPedido(){
    if (arrPedidos.length > 0){
        localStorage.setItem('pedidos', arrPedidos);
        localStorage.setItem('total', TOTAL);
        localStorage.setItem('restaurante', restauranteId);
        location.href = 'concluirPedido.html';
    }
}

gerarPromos();


document.querySelector('#concluirPedido').addEventListener('click', concluirPedido)