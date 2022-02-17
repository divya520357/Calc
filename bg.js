let runinngTotal =0;
let buffer ="0";
let previousOperation= null;


document.querySelectorAll(".calc-button").forEach(function(b){
    b.addEventListener("click", function(event){
     buttonClick(event.target.innerText);
    })
});


function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if(buffer=== "0"){
        buffer = value;
    }
    else{
        buffer+=value;
    }
}

function handleSymbol(value){
    switch(value){
        case 'C':
            buffer = "0";
            runinngTotal=0;
            previousOperation=null;
            break;

        case '=':
            if(previousOperation===null){
                return;
            }
                flushOperation(parseInt(buffer));
                previousOperation= null;
                buffer = " "+ runinngTotal;
                runinngTotal =0;
            break;

        case '←':
            if(buffer.length===1){
                buffer="0";
            }
            else{
                buffer = buffer.substring(0 , buffer.length -1 );
            }
            break;

        default:
            handleMaths(value);
        break;
    }
}

function handleMaths(value){
    const intBuffer = parseInt(buffer);
    if(runinngTotal===0){
        runinngTotal=intBuffer;
        console.log("here");
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperation= value;
    buffer = "0";
}

function flushOperation(intBuffer){
    if(previousOperation==='+'){
        runinngTotal += intBuffer; 
    }
    else if(previousOperation==='−'){
        runinngTotal -= intBuffer; 
    }   
    else if(previousOperation==='÷'){
        runinngTotal /= intBuffer; 
    }   
    else if(previousOperation==='×'){
        runinngTotal *= intBuffer; 
    }   
   
}

function rerender(){
    document.querySelector('.screen').innerText= buffer;
}