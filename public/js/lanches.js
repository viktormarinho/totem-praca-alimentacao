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

        h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${lanche.valor}`

        footerzin.appendChild(h4preco);
        footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

        divInterior.appendChild(nomeLanche);
        divInterior.appendChild(footerzin);

        divLanche.appendChild(imagemLanche);
        divLanche.appendChild(divInterior);

        divLanches.appendChild(divLanche);
    }
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

        h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${bebida.valor}`

        footerzin.appendChild(h4preco);
        footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

        divInterior.appendChild(nomeBebida);
        divInterior.appendChild(footerzin);

        divBebida.appendChild(imagemBebida);
        divBebida.appendChild(divInterior);

        divLanches.appendChild(divBebida);
    }
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

        h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${sobremesa.valor}`

        footerzin.appendChild(h4preco);
        footerzin.innerHTML = footerzin.innerHTML + '<i class="fa-solid fa-square-plus"></i>'

        divInterior.appendChild(nomeSobremesa);
        divInterior.appendChild(footerzin);

        divSobremesa.appendChild(imagemSobremesa);
        divSobremesa.appendChild(divInterior);

        divLanches.appendChild(divSobremesa);
    }
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

                h4preco.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${item.valor}`

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
}

function limpar(){
    divLanches.innerHTML = "";
}

gerarPromos();