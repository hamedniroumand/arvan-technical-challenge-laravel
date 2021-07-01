export default class Validation {

    constructor(inputs, callback, autoRun = true) {
        this.result = { status: false, errors: {} };
        this.inputs = inputs;
        this.callback = callback;
        this.autoRun = autoRun;
        this.bindInputs();
        autoRun ? callback(this.validate()) : null;
    }

    changeToAutoRun() {
        this.autoRun = true;
        this.bindInputs();
    }

    bindInputs() {
        if(!this.autoRun) return;
        for (let inputsKey in this.inputs) {
            this.inputs[inputsKey].forEach(({input}) => {

                if(input.type === "file") {
                    input.addEventListener("change", () => {
                        this.callback(this.validate());
                    })
                } else {
                    input.addEventListener("input", () => {
                        this.callback(this.validate());
                    })
                }
            })
        }
    }

    clearInvalidClass() {
        for (let inputsKey in this.inputs) {
            this.inputs[inputsKey].forEach(({input}) => {
                input.classList.remove("invalid")
            })
        }
    }

    reset() {
        this.result = {
            status: false,
            errors: {},
        }
    }

    validate() {
       this.reset();

        this.validateRequired();
        this.validateNumbers();
        this.validateEmails();
        this.fileValidation()
        this.minLengthsValidation();
        this.maxLengthsValidation();

        return this.getResult();
    }

    getResult() {
        if(Object.keys(this.result.errors).length) {
            return this.result;
        }
        return {
            status: true,
            errors: {}
        }
    }

    pushInErrors(input, error) {
        if(this.result.errors[input.getAttribute("id")]) {
            this.result.errors[input.getAttribute("id")].push(error)
        } else {
            this.result.errors[input.getAttribute("id")] = [error]
        }
    }

    getFiledName(input) {
        return input.getAttribute("data-label")
    }

    validateRequired(){
        if(!this.inputs.required) return;
        this.inputs.required.forEach(({input}) => {
            const inputName = this.getFiledName(input);
            if (input.type === "file") {
                if (!input.files.length) {
                    this.pushInErrors(input, `وارد کردن فیلد "${inputName}" الزامی است`)
                }
            } else {
                if (!input.value.trim()) {
                    this.pushInErrors(input, `پر کردن فیلد "${inputName}" الزامی است`)
                }
            }
        })
    }

    validateNumbers() {
        if(!this.inputs.numbers) return;
        this.inputs.numbers.forEach(({input}) => {
            if (!Number.isInteger(+input.value.trim())) {
                this.pushInErrors(input, `فیلد "${this.getFiledName(input)}" نامعتبر است`)
            }
        })
    }

    validateEmails() {
        if(!this.inputs.emails) return;
        this.inputs.emails.forEach(({input}) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(input.value.trim()).toLowerCase())) {
                this.pushInErrors(input, `فیلد "${this.getFiledName(input)}" نامعتبر است`)
            }
        });
    }

    fileValidation() {
        if(!this.inputs.files) return;
        this.inputs.files.forEach(({input, mimeTypes, minSize, maxSize}) => {
            (Array.from(input.files)).forEach(selectedFile => {
                mimeTypes.forEach(mimeType => {
                    if (selectedFile.type !== mimeType) {
                        this.pushInErrors(input, `فیلد "${this.getFiledName(input)}" نامعتبر است`)
                    }
                });
                if (minSize) {
                    if (selectedFile.size < minSize) {
                        this.pushInErrors(input, `حجم فایل "${this.getFiledName(input)}" از حداقل حجم مشخص شده کمتر است`)
                    }
                }
                if (maxSize) {
                    if (selectedFile.size > maxSize) {
                        this.pushInErrors(input, `حجم فایل "${this.getFiledName(input)}" از حداکثر حجم مشخص شده بیشتر است`)
                    }
                }
            });
        });
    }

    minLengthsValidation() {
        if(!this.inputs.minLengths) return;
        this.inputs.minLengths.forEach(({input, length}) => {
            if(input.value.length < length) {
                this.pushInErrors(input, `طول فیلد "${this.getFiledName(input)}" کمتر از حد مجاز است`)
            }
        })
    }

    maxLengthsValidation() {
        if(!this.inputs.maxLengths) return;
        this.inputs.maxLengths.forEach(({input, length}) => {
            if(input.value.length > length) {
                this.pushInErrors(input, `طول فیلد "${this.getFiledName(input)}" بیشتر از حد مجاز است`)
            }
        })
    }
}
