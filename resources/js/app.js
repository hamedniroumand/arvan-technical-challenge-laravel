require('./bootstrap');

import {breakPoints} from "./home-modules/registration-form";

var expandedIndex = [];
let scrollState = 0;

Array.from(document.querySelectorAll('.expand-description')).forEach((element, index) => {
    element.addEventListener("click", (event) => {
        const parentNode = event.target.closest('.project-item');
        if (!parentNode) return;

        const content = parentNode.querySelector('.project-item__content');
        if (!content) return;

        parentNode.querySelector('span.expand-description').classList.toggle('active');

        if (!parentNode.classList.contains('active')) {
            expandedIndex.push(index)
            content.style.maxHeight = "3000px";
            parentNode.classList.add('active');
        } else {
            expandedIndex = expandedIndex.filter((i) => i != index - 1);
            content.style.maxHeight = "0";
            setTimeout(() => {
                parentNode.classList.remove('active');
            }, 300)
        }
    });
});

Array.from(document.querySelectorAll(".tab")).forEach(element => {
    element.addEventListener("click", (event) => {
        const id = element.getAttribute("data-id");
        const type = element.getAttribute("data-type");
        const target = document.querySelector(`[data-target='#${id}'][data-type='${type}']`);
        const targetFamily = Array.from(document.querySelectorAll(`.tab-target[data-type='${type}']`))

        removeActiveClassFromTabFamily(type)
        event.target.closest('.tab').classList.add("active");

        targetFamily.forEach(family => {
            family.style.display = "none"
        });
        target.classList.add("active")
        target.style.display = "block"
    });
});

document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select").forEach(customSelect => {
        customSelect.classList.remove("active")
    });
})

Array.from(document.querySelectorAll('.custom-select__item input')).forEach(element => {
    element.addEventListener('change', (e) => {
        e.target.closest('.custom-select').querySelector("p").innerHTML = e.target.nextSibling.nextElementSibling.innerHTML;
        e.target.closest('.custom-select').classList.remove('active')
    });
});

document.querySelectorAll(".custom-select").forEach(customSelect => {
    customSelect.addEventListener("click", (event) => {
        event.stopPropagation();
        if(!event.target.classList.contains('custom-select__item')) {
            event.target.closest(".custom-select").classList.toggle("active");
        }
    });
});

Array.from(document.querySelectorAll(".custom-file")).forEach(label => {
    label.nextSibling.nextElementSibling.addEventListener("change", event => {
        label.innerHTML = event.target.files[0].name;
        label.classList.add("selected")
    })
})

const removeActiveClassFromTabFamily = (type) => {
    Array.from(document.querySelectorAll(`.tab[data-type='${type}']`)).forEach(item => {
        item.classList.remove('active')
    });
}


const onDocumentScrolled = () => {
    const header = document.querySelector(".main-header");
    const navbar = document.querySelector(".main-nav");
    const headerHeight = header.clientHeight;
    const navHeight = navbar.clientHeight;
    const topOfWindow = window.scrollY;

    if(window.innerWidth > breakPoints.lg) {
        if (topOfWindow > headerHeight) {
            if(!navbar.classList.contains("fixed")) navbar.classList.add("fixed")
        } else {
            if(topOfWindow === 0) {
                if(navbar.classList.contains("fixed")) navbar.classList.remove("fixed")
            }
        }
    } else {
        if (topOfWindow > headerHeight) {
            if(topOfWindow > scrollState) { // scroll down
                if(navbar.classList.contains("fixed")) navbar.classList.remove("fixed")
            } else {
                if(!navbar.classList.contains("fixed")) navbar.classList.add("fixed")
            }
        } else {
            if(navbar.classList.contains("fixed")) navbar.classList.remove("fixed")
        }
    }
    scrollState = topOfWindow;
}

onDocumentScrolled();

document.addEventListener("scroll", onDocumentScrolled)
