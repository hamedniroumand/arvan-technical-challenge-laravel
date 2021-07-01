import Splide from "@splidejs/splide";
import {breakPoints} from "./registration-form";

const mountSliders = (width, sliderSelector, breakPoint, elementToHidden, elementToShow, sliderOption) => {
    if (width < breakPoint) {
        if(document.querySelector(elementToHidden).style.display === "none" && document.querySelector(elementToShow).style.display === "block") return;
        document.querySelector(elementToHidden).style.display = "none";
        document.querySelector(elementToShow).style.display = "block";
        new Splide(sliderSelector, sliderOption).mount();
    } else {
        if(document.querySelector(elementToHidden).style.display === "block" && document.querySelector(elementToShow).style.display === "none") return;
        document.querySelector(elementToHidden).style.display = "block";
        document.querySelector(elementToShow).style.display = "none";
    }
}

const mountProjectsResponsiveSlider = (currentWindowWidth) => {
    (() => {
        const projectsResponsiveSliderOption = {
            direction: "rtl",
            perPage: 2,
            arrows: false,
            autoWidth: true,
            pagination: false
        }
        mountSliders(currentWindowWidth, "#project-tab-mobile", breakPoints.sm, ".projects .tabs", ".project-tabs-mobile", projectsResponsiveSliderOption);
    })()
}

const mountMeetingResponsiveSlider = (currentWindowWidth) => {
    (() => {
        const meetingResponsiveSliderOption = {
            direction: "rtl",
            perPage: 1,
            arrows: false,
            autoWidth: true,
            pagination: false,
        }
        mountSliders(currentWindowWidth, "#meeting-tab-mobile", breakPoints.sm, ".meeting-structure .tabs", "#meeting-tab-mobile", meetingResponsiveSliderOption);
    })()
}

var successProjectSlider = null;
const mountSuccessProjectsSlider = (currentWindowWidth) => {
    const successProjectsSliderEl = document.querySelector(".success-projects-slider")
    if(currentWindowWidth < breakPoints.sm) {
       if(successProjectSlider) {
           successProjectSlider = successProjectSlider.destroy();
       }

        successProjectsSliderEl.classList.remove("splide")
    }
    else {
        successProjectsSliderEl.classList.add("splide")
        successProjectSlider = new Splide('#success-projects-slider', {
            direction: "rtl",
            perPage: 7,
            pagination: false,
            breakpoints: {
                576: {
                    arrows: false
                }
            }
        }).mount();
        document.querySelector(".success-projects-slider").classList.add("splide")
    }
}


export {
    mountProjectsResponsiveSlider,
    mountMeetingResponsiveSlider,
    mountSuccessProjectsSlider,
}
