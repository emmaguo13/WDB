class Calculator {
    numOnDisplay = 0;
    pendingResult = "";
    currentOperation = "";

    numAddDisplay(numToAdd) {
        this.numOnDisplay = this.numOnDisplay * 10 + numToAdd;
        this.numShowDisplay(this.numOnDisplay);
    }

    numShowDisplay(numOnDisplay) {
        document.getElementsByClassName("display")[0].innerHTML = numOnDisplay;
    }

   clear() {
       this.pendingResult = "";
       this.numOnDisplay = 0;
       this.numShowDisplay(this.numOnDisplay);
   }

   op(buttonString) {
        this.pendingResult += this.numOnDisplay + " " + buttonString + " ";
        this.currentOperation = buttonString;
        this.numOnDisplay = 0;
        this.numShowDisplay(this.numOnDisplay);
   }

   performOp() {
        /*
        var pend = this.pendingResult.split(" ");
        var result = pend[0];
        var curr = 0;
        var op = "";
        for (var i = 1; i < pend.length; i++) {
            if (pend[i] == "+" || pend[i] == "-" || pend[i] == "÷" || pend[i] == "x") {
                op = pend[i];
            } else {
                curr = pend[i];
                if (op != "") {

            }

            }
        }
         */
       console.log(this.pendingResult);
       let result = eval(this.pendingResult);
       this.numShowDisplay(result);
       this.numOnDisplay = result;
       this.currentOperation = "";
       this.pendingResult = "";
       console.log(result);
   }

    clickedButton(event) {
        let buttonString = event.target.textContent;
        console.log(buttonString);
        if (buttonString == "+" || buttonString == "-" || buttonString == "x" || buttonString == "÷" ) {
            if (buttonString == "x") {
                buttonString = "*";
            } else if (buttonString == "÷") {
                buttonString = "/";
            }
            this.op(buttonString);
        } else if (buttonString == "C") {
            this.clear();
        } else if (buttonString == "←") {
            //problem: what happens while we delete and we are adding/subbing something?
            if (this.numOnDisplay < 10) {
                this.numOnDisplay = 0;
            } else {
                this.numOnDisplay = Math.floor(this.numOnDisplay / 10);
            }
            this.pendingResult = this.pendingResult.slice(0, this.pendingResult.length - 1); //what if its an operator
            this.numShowDisplay(this.numOnDisplay);
        } else if (buttonString == "=") {
            if (this.pendingResult != "") {
                console.log(this.pendingResult);
                this.performOp();
            }
        } else if (parseInt(buttonString) < 10 && parseInt(buttonString) >= 0) {
            if (this.currentOperation == "") {
                this.numAddDisplay(parseInt(buttonString));
            } else {
                this.currentOperation = "";
                this.numAddDisplay(parseInt(buttonString));
                if (!parseInt(this.pendingResult.split(this.pendingResult.length - 1, this.pendingResult.length)) < 10) {
                    this.pendingResult += buttonString;
                }
            }
        }
    }
}

let calc = new Calculator();
buttons = document.getElementsByClassName("calculator-button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', calc.clickedButton.bind(calc)); //how do u pass in params
}

