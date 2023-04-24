

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



/*counter*/

let firstSpan = document.querySelector('#first-span');
let secondSpan = document.querySelector('#second-span');
let thirdSpan = document.querySelector('#third-span');

function createInterval(finalNumber, element){

    //intervallo inizia a contare da zero
    let counter = 0;

    // per avviare il contatore: setInterval

    let interval = setInterval( ()=>{

        //finisci di contare fino al finalNumber

        if(counter < finalNumber){

            //incremento del contatore
            counter++
            element.innerHTML = counter;
            

        } else {

            //per stoppare il loop del counter

            clearInterval(interval);

        }
            // tempo del contatore: 1 millisecondo
    }, 1)

}

createInterval();


createInterval(800, firstSpan);
createInterval(1000, secondSpan);
createInterval(1200, thirdSpan);


//evento mousenter su icone delle cards
//SelectorAll genera una nodelist con array-like

let icone = document.querySelectorAll('#icone');

let cards =  document.querySelectorAll('.card-custom');

let cardsConfirm = false;

console.log (cards);

cards.forEach((carta, i)=>{

        carta.addEventListener('mouseenter', ()=>{

            if(cardsConfirm == false){

            icone[i].classList.remove('text-primaryC');
            icone[i].classList.add('text-secondaryC');
        }else{

            icone[i].classList.remove('text-lastC');

        }

     })

        carta.addEventListener('mouseleave', ()=>{

            if(cardsConfirm == false){

                icone[i].classList.remove('text-secondaryC');
                icone[i].classList.add('text-lastC');

                cardsConfirm = true;


            } else {

                icone[i].classList.add('text-primaryC');
                
                cardsConfirm = true;

            }

         
        })


})
