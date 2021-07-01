import {changeRegisterFormToResponsiveMode} from "./home-modules/registration-form";
import {
    mountProjectsResponsiveSlider,
    mountMeetingResponsiveSlider,
    mountSuccessProjectsSlider
} from "./home-modules/responsive-sliders"
import {onMouseHover} from "./home-modules/header";
import Validation from "./services/validation";

require("svg-url-loader!../../public/images/city.svg");
require("svg-url-loader!../../public/images/city-back.svg");

const currentWindowWidth = window.innerWidth;

changeRegisterFormToResponsiveMode(currentWindowWidth);


const onPageLoaded = () => {
    mountProjectsResponsiveSlider(currentWindowWidth);
    mountMeetingResponsiveSlider(currentWindowWidth)
    mountSuccessProjectsSlider(currentWindowWidth)
}

document.addEventListener('DOMContentLoaded', onPageLoaded);

window.addEventListener("resize", (e) => {
    const windowWidth = window.innerWidth;

    changeRegisterFormToResponsiveMode(windowWidth);
    mountProjectsResponsiveSlider(windowWidth);
    mountMeetingResponsiveSlider(windowWidth);
    mountSuccessProjectsSlider(windowWidth);
})

const header = document.querySelector('header');
const front = document.querySelector('.header__footer--front');
const back = document.querySelector('.header__footer--back');

header.addEventListener("mousemove", (event) => {
    onMouseHover(event, front, back)
});

const form = document.querySelector("form");
const nameInput = form.querySelector("input[id='name']");
const phoneInput = form.querySelector("input[id='phone']");
const emailInput = form.querySelector("input[id='email']");
const resumeInput = form.querySelector("input[id='resume']");
const portfolioInput = form.querySelector("input[id='portfolio']");
const companyInput = form.querySelector("input[id='company']");
const descriptionInput = form.querySelector("textarea[id='description']");
const typeInput = form.querySelector("input[name='type']:checked");
const levelInput = form.querySelector("input[name='level']:checked");
const submitBtn = form.querySelector("button[type='submit']");

const requiredValidation = new Validation({
    required: [{input: nameInput}, {input: phoneInput}, {input: emailInput}, {input: resumeInput}]
}, (result) => {
    if (result.status) {
        if (submitBtn.hasAttribute("disabled")) {
            submitBtn.removeAttribute("disabled")
        }
    } else {
        if (!submitBtn.hasAttribute("disabled")) {
            submitBtn.setAttribute("disabled", "disabled")
        }
    }
});

const otherValidation = new Validation({
    numbers: [{input: phoneInput}],
    emails: [{input: emailInput}],
    files: [
        {input: resumeInput, mimeTypes: ['application/pdf'], minSize: false, maxSize: 1024 * 1024},
        {input: portfolioInput, mimeTypes: ['application/pdf'], minSize: false, maxSize: 1024 * 1024},
    ],
    minLengths: [
        {input: nameInput, length: 3},
        {input: phoneInput, length: 11},
    ],
    maxLengths: [
        {input: nameInput, length: 250},
        {input: companyInput, length: 250},
        {input: phoneInput, length: 11},
        {input: descriptionInput, length: 800},
    ]
}, () => {
    hamed()
}, false);

requiredValidation.validate();

form.addEventListener("submit", (event) => {
    event.preventDefault();


    otherValidation.clearInvalidClass()
    const result = otherValidation.validate()

    const formResult = document.querySelector('.form-result');

    if(result.status) {
        const httpResult = storeData();
        httpResult
            .then(({data, status}) => {
                if(status === 201) return renderStatus(["درخواست شما با موفقیت ثبت گردید"], true);
                else {
                    let errors = [];
                   for(let filed in data.data) {
                       data.data[filed].forEach(error => {
                           errors.push(error)
                       })
                   }
                    return renderStatus(errors, false)
                }
        }).catch(err => console.error({err}))
    } else {
        let errors = [];
        for (const errorsKey in result.errors) {
            form.querySelector(`#${errorsKey}`).classList.add("invalid")
            result.errors[errorsKey].forEach(err => {
                errors.push(err)
            });
        }
        renderStatus(errors, false)
    }
})

const storeData = async () => {
    form.querySelector("button[type='submit']").setAttribute("disabled", "disabled");

    try {
        let data = new FormData();

        data.append("fullname", nameInput.value);
        data.append("mobile", phoneInput.value);
        data.append("email", emailInput.value);
        data.append("contributors_type", typeInput ? typeInput.value : "");
        data.append("contributors_level", levelInput ? levelInput.value : "");
        data.append("description", descriptionInput.value);
        data.append("resume", resumeInput.files.length ? resumeInput.files[0] : "")
        data.append("portfolio", portfolioInput.files.length ? portfolioInput.files[0] : "")

        return await axios.post("/api/cloud_contributors", data);
    } catch (err) {
        throw new Error(err);
    }
}

const renderStatus = (messages, success = false) => {
    const formResult = document.querySelector('.form-result');
    if(success) {
        formResult.classList.remove("form-result-error")
        formResult.classList.add("form-result-success")
    } else {
        formResult.classList.add("form-result-error")
        formResult.classList.remove("form-result-success")
    }

    let html = "<ul>";
    messages.forEach(error => {
        html += `<li>${error}</li>`
    });
    html += "</ul>";

    formResult.innerHTML = html;
}

