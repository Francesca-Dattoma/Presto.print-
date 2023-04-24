console.log('ciao');


/*scroll navbar*/

let mainNavbar = document.querySelector('#mainNavbar');

window.addEventListener('scroll', ()=>{

         
    if(window.scrollY > 0){

        mainNavbar.classList.remove('bg-transparent');
        mainNavbar.classList.add('background-accentC');

        
        // mainNavbar.style.padding = '20px 0px';

    } else {

        mainNavbar.classList.remove('background-accentC');
        mainNavbar.classList.add('bg-transparent');

        
        // mainNavbar.style.padding = '10px 0px';

            

    }


})



//evento brush icona
let brushIcon = document.querySelector('#brushIcon');

let confirm = false;

brushIcon.addEventListener('click', ()=>{

    if(confirm == false){

        brushIcon.classList.remove('fa-rotate-180'); 
        confirm = true;

    } else {

        brushIcon.classList.add('fa-rotate-180');
        confirm = false;
    }
   
})



//sezione ispirazioni

fetch('./annunci.json').then( (response)=> response.json()  ).then((data)=>{

    //catturo il wrapper

    let categoryWrapper = document.querySelector('#categoryWrapper');

    let cardsWrapper = document.querySelector('#cardsWrapper');

    //creo una funzione per creare i radio buttons
    function setCategoryFilters(){       

     //isolo le singole categorie creando un array clone di "data" con map
        let categories = data.map((annuncio)=> annuncio.category);

     //array di categorie senza ripetizione con .includes

         let uniqueCategories = [];

        categories.forEach((category) => {
        
            if ( !uniqueCategories.includes(category)){

            uniqueCategories.push(category)


            
            }
         })

         //creazione del div diviso per sezioni con ciascuna il suo radio button

         uniqueCategories.forEach((category)=>{

            let div = document.createElement('div');

            div.classList.add('form-check');

            div.innerHTML = `

                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                    <label class="form-check-label" for="${category}">
                    ${category}
                    </label>
                          
            `;

            categoryWrapper.appendChild(div);

         } )


    }
//invoco la funzione setCategoryF, FUORI dalla funzione stessa

setCategoryFilters();

// funzione 2: mostra cards 
    function showCards(array){   

        // svuota il wrapper  prima, per poter vedere le cards (showcards) dopo

        cardsWrapper.innerHTML = '';

        //mettoi cards in ordine crescente in base al prezzo selezionato

        array.sort((a, b)=> Number (b.price - a.price));

        //per randomizzare le immagini bisogna andare a ciclare anche su i dell'array
        array.forEach((element, i)=>{


            //crea la card

            let div = document.createElement('div');

        
            //assegnare la classe della card

            div.classList.add('col-12', 'col-md-3', 'my-5');

            //inserire il contenuto con innerhtml
            
            div.innerHTML  = `<div class="announcement-card pattern text-center my-5">
                                <img class="img-card-custom" src="${element.url}" alt="immagine">
                                <p class="h3 fw-bold">${element.name}</p>
                                <h4 class="fst-italic">${element.category}</h4>
                                <h4>${element.price} € </h4>
                                

                            </div>`;


             

            cardsWrapper.appendChild(div);


        })

    }

    showCards(data);


    //funzione mostra cards al click della categoria

    function filterByCategory(array){

        //N.B. qui il papà Array (con la lettera maisucola) trasforma la node list del checkInputs (generata dal query selector All) in un array con .from
       
        

        // let categoria = Array.from(checkInputs).find((button)=> button.checked).id;
        //oppure si scrive anche così:

        let arrayFromNodelList = Array.from(checkInputs);

        //metodo .find per trovare il solo elemento dell'array (e non tutti quanti come faceva .filter) che mi serve, cioè il check button 
            //comune a tutt e 3 i filtri
        let button = arrayFromNodelList.find((bottone)=> bottone.checked);

        //catturo l'id di tutte le categoria
        let categoria = button.id;


        //se la categoria che ricevi è diversa da All allora esegui la singola categoria, altrimenti esegui tutte le categorie
        if (categoria != 'All'){


        //filter fa un ciclo, filtra su ogni annuncio in basse alla categoria che viene cliccata.
        //il filtraggio salva tutto in un array
            let filtered = array.filter((annuncio)=> annuncio.category == categoria );

                    showCards(filtered);
            //return inserito per collegare "l'imbuto filtro" e quindi collegare la funzione che viene dopo
                    return filtered;
 

        } else {



            return(data);
        }

          

    }

 //catturo tutti i radio button per inizializzare la funzione al click. N.B i radio button hanno in comune il check input-> catturo l'input

 let checkInputs = document.querySelectorAll('.form-check-input')
    
    //per ogni checkInput creo l'evento del click con addEventListener
    checkInputs.forEach((checkInput)=>{

        //al click lancia la funzione filteredbycategory

        checkInput.addEventListener('click', ()=>{


            // la categoria la aggancio al click tramite id di ogni categoria
            //  filterByCategory(checkInput.id);

            //la funzione viene lanciata da filterbycategory se questa è staccata dalle altre, siccome è stata collegata tramite "imbuto"
            //sarà global filter a lanciarla

            globalFilter();
            



        })


    })


    //catura input e number

    let inputPrice = document.querySelector('#inputPrice');
    let incrementNumber = document.querySelector('#incrementNumber');

   

    function setInputPrice(){

        //deve ciclare su ogni singolo prezzo
        //e deve restituire la "categoria" prezzi. N.B Number nella funzione serve a convertire l'array prices in numeri e non stringhe

        let prices = data.map((annuncio)=> Number (annuncio.price));
        console.log(prices);
        //funzione per calcolare prezzo max: rompere array con ... (spread operator) e calcore il max con math.max

        let maxPrice = Math.max(...prices);

        //max ceil per arrontondare i prezzi
        inputPrice.max = Math.ceil(maxPrice);

        // console.log(maxPrice);

        //cursoreprezzo è ugulae a maxPrice

        inputPrice.value = Math.ceil(maxPrice);

        incrementNumber.innerHTML = Math.ceil(maxPrice);
         
    }

    setInputPrice();

    //mostrami la card col prezzo che ho scelto quando muovo il cursore prezzo

    //filtra cards per prezzo e salva tutt in un array. N.B. Number per traformare il value di inputPrice da stringa a numero

        function filterbyPrice(array){
            
            let filtered = array.filter((annuncio)=> annuncio.price <= Number (inputPrice.value));

              //return inserito per collegare "l'imbuto filtro" e quindi collegare la funzione che viene dopo 
            
            return(filtered);
   

        }

    //evento mostrami card al cambio prezzo

    inputPrice.addEventListener('input', ()=>{

        //num max deve cambaire al cambio del prezzo e non rimanere fisso

                incrementNumber.innerHTML = inputPrice.value;  

        
        //la funzione viene lanciata da filterbyPrice se questa è staccata dalle altre, 

        // filterbyPrice(inputPrice.value);

        //siccome è stata collegata tramite "imbuto" sarà global filter a lanciarla

        globalFilter();

       
    })


    //cattura filtro per parola 

    let wordInput = document.querySelector('#wordInput');

    //filtra per parola con .filter e salava tutto in un array

    function filterByWord(array){

        let nome = wordInput.value;
        
        //filtra la parola che ti scrivo-->includes
        //toLowercas --> per evitare che la ricerca si interrompa quando l'utente scrive male una parola e filtra anche con una singola lettera

        let filtered = array.filter ((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));
         
          //return inserito per collegare "l'imbuto filtro" e quindi collegare la funzione precedente
        return(filtered);
    }

    //evento  filtro parola
    wordInput.addEventListener('input', ()=>{


        //la funzione viene lanciata da filterbyWord se questa è staccata dalle altre, 

        //  filterByWord(wordInput.value);

        //siccome è stata collegata tramite "imbuto" sarà global filter a lanciarla
       
        globalFilter();

    })



        //creo un "imbuto" per collegare i 3 filtri (prezzo, parola, categoria) --> legare i 3 filtered uno dentro l'altro

    function globalFilter(){

        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterbyPrice(filteredByCategory);
        let filteredByWard = filterByWord(filteredByPrice);

        showCards(filteredByWard);
    }







     
})




    


