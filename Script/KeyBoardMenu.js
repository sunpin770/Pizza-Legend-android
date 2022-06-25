class KeyboardMenu {
    constructor(config = {}) {
        this.options = []
        this.up = null
        this.down = null
        this.prevFocus = null
        this.descriptionsContainer = config.descriptionsContainer
    }

    setOptions(options) {
        this.options = options    
        this.element.innerHTML = this.options.map((options, index) => {
            
            const disableAttr = options.disable ? "disabled" : ""  
            return (`
                <div class="options">
                    <button ${disableAttr}  data-button="${index}"  data-descriptions="${options.descriptions}">
                        ${options.label}
                        <span class="right-side"> ${options.right ? options.right() : ""}</span> 
                    </button>
                </div>
                
            `)
        }).join("")

        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                
                const chosenOptions = this.options[Number(button.dataset.button)]
                chosenOptions.handler()
            })

            button.addEventListener("mouseenter", () => {
                button.focus()
            })

            //Peut être changer en sah
            button.addEventListener("focus", () => {
                this.prevFocus = button
                this.descriptionsElementText.textContent = button.dataset.descriptions
            })
        })

        //Focus first Button we can

        setTimeout(() => {
            this.element.querySelector("button[data-button]:not([disabled])")?.focus()
        }, 10)

    }
    
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("keyboard-menu")

        this.descriptionsElement = document.createElement("div")
        this.descriptionsElement.classList.add("descriptions-box")
        this.descriptionsElement.innerHTML = (`<p></p>`)
        this.descriptionsElementText = this.descriptionsElement.querySelector("p")

       
    }

    init(container) {
       
        this.createElement() 
        let descContainer = this.descriptionsContainer || container
        descContainer.appendChild(this.descriptionsElement)
        container.appendChild(this.element)
        

        this.up = new KeyPressListener("z", () => {
            const currentButtonIndex = Number(this.prevFocus.dataset.button)
            const prevButton = Array.from(this.element.querySelectorAll("button[data-button]")).reverse().find(el => {
                return el.dataset.button < currentButtonIndex && !el.disabled
            })
            prevButton?.focus()
           
        })

        this.down = new KeyPressListener("s", () => {         
            const currentButtonIndex = Number(this.prevFocus.dataset.button)
            const nextButton = Array.from(this.element.querySelectorAll("button[data-button]")).find(el => {
                return el.dataset.button > currentButtonIndex && !el.disabled
            })     
            nextButton?.focus()
            
        })
    }

    end() {
        this.element.remove()
        this.descriptionsElement.remove()
        this.up.unbind()
        this.down.unbind()
    }
}