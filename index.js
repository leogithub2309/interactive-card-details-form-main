const d = document;

const $form = d.querySelector(".cards-form form"),
    $inputs = d.querySelectorAll(".cards-form form input");


$form.addEventListener("submit", (e) => {

    e.preventDefault();

    const $card = d.querySelector(".cards-form"),
     $nroCard = d.querySelector(".nro-card-front"),
     $user = d.querySelector(".user-info .user"),
     $date = d.querySelector(".date-exp"),
     $lastDigit = d.querySelector(".last-digit"),
     $btn = d.querySelector(".btn-submit");

     let arrDig = e.target.card.value.match(/[0-9]{4}/g);

     $nroCard.innerHTML = `
        <span class="firts-digit">${arrDig[0]}</span>
        <span class="second-digit">${arrDig[1]}</span>
        <span class="third-digit">${arrDig[2]}</span>
        <span class="four-digit">${arrDig[arrDig.length-1]}</span>
     `;

     $user.textContent = `${e.target.name.value}`;
     $date.innerHTML = `
        ${e.target.mm.value}/${e.target.yy.value}
     `;

     $lastDigit.textContent = `${e.target.cvg.value}`;

     $card.innerHTML = `
        <div class="container-flex">
            <img src="./images/icon-complete.svg" class="image">
            <h3 class="title">Thank you!</h3>
            <p class="message"> We've added your card details</p>
            <button class="btn-submit" onclick="reload()">Continue</button>
        </div>
     `;


     return;

});

function reload(){
    location.reload();
}

$inputs.forEach(input => {

    const $span = d.createElement("span");
    $span.classList.add("input-error");
    $span.textContent = `Can't be blank`;
    input.insertAdjacentElement("afterend", $span);

    input.addEventListener("keyup", (e) => {

        let value = e.target.value,
            pattern = e.target.pattern;

        if(value === ""){
            e.target.classList.add("error");
            e.target.nextElementSibling.classList.add("active");
            e.target.nextElementSibling.textContent = "Can't be blank";
            return;
        }else{
            e.target.classList.remove("error");
            e.target.nextElementSibling.classList.remove("active");
        }

        if(e.target.name === "card"){
            if(e.target.value.length > 16){
                e.target.classList.add("error");
                e.target.nextElementSibling.classList.add("active");
                e.target.nextElementSibling.textContent = "Card only accept 16 digit or number";
                return;
            }else{
                e.target.classList.remove("error");
                e.target.nextElementSibling.classList.remove("active");
            }       
        }

        if(e.target.name === "mm"){
            if(Number(e.target.value) > 12){
                e.target.classList.add("error");
                e.target.nextElementSibling.classList.add("active");
                e.target.nextElementSibling.textContent = "Month invalid";
                return;
            }else{
                e.target.classList.remove("error");
                e.target.nextElementSibling.classList.remove("active");
            }    
        }

        if(e.target.name === "cvg"){
            if(e.target.value.length > 3){
                e.target.classList.add("error");
                e.target.nextElementSibling.classList.add("active");
                e.target.nextElementSibling.textContent = "Only 3 number";
                return;
            }else{
                e.target.classList.remove("error");
                e.target.nextElementSibling.classList.remove("active");
            }
        }

        let reg = new RegExp(pattern);

        if(!reg.test(value) && value !== ""){
            e.target.classList.add("error");
            e.target.nextElementSibling.classList.add("active");

            if(e.target.name === "name"){
                 e.target.nextElementSibling.textContent = "Name is not valid";
            }

            if(e.target.name === "card"){
                e.target.nextElementSibling.textContent = "Card only accept 16 digit or number";
            }

            if(e.target.name === "mm" || e.target.name === "yy" || e.target.name === "cvg"){
                e.target.nextElementSibling.textContent = "Only accept number";
            }
            
        }else{
            e.target.classList.remove("error");
            e.target.nextElementSibling.classList.remove("active");
        }
    });

});

