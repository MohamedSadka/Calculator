// theme toggle dark , light
const themeInput = document.querySelector(".themes__toggle");

const toggleDarkTheme =() => {
    themeInput.classList.toggle("themes__toggle--isActive")
}

const darkThemeAccessibility =(event) => (event.key === "Enter") && toggleDarkTheme();

themeInput.addEventListener("keydown", darkThemeAccessibility);

themeInput.addEventListener("click", toggleDarkTheme );


// logic for calculator
let storedNumber = ""
let currentNumber = ""
let operation = ""

const result = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen =(value)=> {
    result.innerText = !value ? "0" : value ;
}

const numbersButtonsHandler =(value)=> {

    if (value === "." && currentNumber.includes(".")) return
    if (value === "0" && !currentNumber) return

    currentNumber += value;
    updateScreen(currentNumber);
}

const resetButtonHandler =() => {
    storedNumber = "";
    currentNumber = "";
    operation = "";
    updateScreen();
}

const deleteButtonHandler =() => {
    if (!currentNumber || currentNumber === "0") return; 

    if (currentNumber.length === 1) {
        currentNumber = ''
    }else {
        currentNumber = currentNumber.substring(0, currentNumber.length - 1)
    }
    updateScreen(currentNumber)
}

const executeOperations =() => {
    if (currentNumber && storedNumber && operation) {
        switch (operation) {
            case "+":
                storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
                break;
            case "-":
                storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
                break;
            case "*":
                storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
                break;
            case "/":
                storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
                break;
        }
        currentNumber = "";
        updateScreen(storedNumber);
    }
}

const operationButtonsHandler =(operationValue) => {
    if (!storedNumber && !currentNumber) return ;

    if ( currentNumber  && !storedNumber) {
        storedNumber = currentNumber;
        currentNumber = "";
        operation = operationValue;
    }else if(storedNumber) {
        operation = operationValue;

        if (currentNumber) executeOperations();
    }
}

const keyElementsHandler = (element) => {
    element.addEventListener("click", ()=> {
        const type = element.dataset.type

        if(type === "number") {
            numbersButtonsHandler(element.dataset.value)
        }else if (type === "operation") {
            switch(element.dataset.value) {
                case "c" :
                    resetButtonHandler();
                    break

                case "Backspace":
                    deleteButtonHandler();
                    break

                case "Enter":
                    executeOperations();
                    break
                default :
                    operationButtonsHandler(element.dataset.value);
                
            }
        }
    })
};

keyElements.forEach(keyElementsHandler);


// use keyboard as input source
const availableNumbers = ["0","1","2","3","4","5","6","7","8","9","."];
const availableOperations = ["+","-","*","/"];
const availableKeys = [...availableNumbers, ...availableOperations, "Enter","Backspace","c"];

window.addEventListener("keydown",(event)=> {
    keyBoardWithHover(event.key);
})

const keyBoardWithHover =(key) => {
    if (availableKeys.includes(key)) {
        const ele = document.querySelector(`[data-value="${key}"]`);

        ele.classList.add("hover");

        ele.click();

        setTimeout(()=> ele.classList.remove("hover"), 100);
    }
}