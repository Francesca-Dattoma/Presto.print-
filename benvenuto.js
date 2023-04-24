

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

//sezione circle

//cattura opener

let opener = document.querySelector('.opener');

//catturo moved

let movedDivs = document.querySelectorAll('.moved');

//event opener
 opener.addEventListener('click', ()=>{

    movedDivs.forEach((moved, i)=>{


      
        //360° del circle : 4 moved = 90° --> 1° moved è posizionato a 90x0, 2° a 90x1, 3° a 90x2; 4° a 90x3---> bisogna ciclare su i del moved--> ciclo for

        let angle = (360 * i) / movedDivs.length; //diviso .length per autoclacolarsi la posizione, anche per il futuro casomai verranno aggiunte altri moved

          //ogni moved si deve sposatre su un punto diverso del circle-->rotate e translate


        moved.style.transform = `rotate(${angle}deg) translate(200px)`;
    })


 })