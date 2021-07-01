const breakPoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}

const toggleDisplay = (elements, display, isSingle = false) => {
    if(isSingle) {
        if(elements.style.display === display) return;
        elements.style.display = display;
    } else {
        if(Array.from(elements)[0].style.display === display) return;
        Array.from(elements).forEach(el => {
            el.style.display = display;
        })
    }
}

const setSelectValue = () => {
   const checkedType = document.querySelector("input[name='type']:checked");
   const checkedLevel = document.querySelector("input[name='level']:checked");

   if(checkedType) {
        checkedType.closest('.custom-select').querySelector('p').innerHTML = checkedType.nextSibling.nextSibling.innerHTML
   }
   if(checkedLevel) {
       checkedLevel.closest('.custom-select').querySelector('p').innerHTML = checkedLevel.nextSibling.nextSibling.innerHTML
   }
}

document.addEventListener("DOMContentLoaded", () => {
    setSelectValue()
})


const changeRegisterFormToResponsiveMode = (currentWindowWidth) => {

    const labels = document.querySelectorAll(".select-group > .label");
    const fileLabels = document.querySelectorAll(".file-group .label");

    if(currentWindowWidth <= breakPoints.sm) {
        toggleDisplay(labels, "none");
        toggleDisplay(fileLabels, "none");

        Array.from(labels).forEach(label => {
            const selectGroup = label.closest(".select-group")
            if(selectGroup.querySelector(".custom-select p").innerHTML === label.innerHTML) return;
            selectGroup.querySelector(".custom-select p").innerHTML = label.innerHTML
        })

        Array.from(fileLabels).forEach(label => {
            label.parentNode.querySelector(".custom-file").innerHTML = label.innerHTML
        })

    } else {
        toggleDisplay(labels, "block");
        toggleDisplay(fileLabels, "block");

        Array.from(labels).forEach(label => {
            const selectGroup = label.closest(".select-group")
            if(selectGroup.querySelector(".custom-select p").innerHTML === "") return;
            selectGroup.querySelector(".custom-select p").innerHTML = ""
        })

        Array.from(fileLabels).forEach(label => { //optional
            const customFile = label.parentNode.querySelector(".custom-file")
            if(customFile.classList.contains("optional")) {
                customFile.innerHTML = "اختیاری"
            } else {
                customFile.innerHTML = ""
            }

        })
    }
}

export {
    changeRegisterFormToResponsiveMode,
    breakPoints
}
