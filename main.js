const icon = document.querySelectorAll(".list__item");
const lotus = document.querySelector(".wrapper__btn");


    lotus.addEventListener("click",e=>{
        icon.forEach(item=>{
            const dataClass = item.dataset.sound;
            item.classList.toggle(dataClass)
        })
    })
