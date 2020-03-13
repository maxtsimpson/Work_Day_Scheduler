function nonRepeat(string){
    var letters = string.split('');
    var uniqueletters = [];
    letters.forEach(element => {
        var count = 0;
        for (let i = 0; i < letters.length; i++){
            if (element === letters[i]){
                count++;
            }
        }
        if (count === 1){
            uniqueletters.push(element);
        }
    });
    firstUniqueLetter = uniqueletters[0];
    if (firstUniqueLetter === "undefined") {
        return "no unique letters";
    }
    return firstUniqueLetter;
}

function firstDoesNotRepeat(string) {
    i=0;
    string.split("").forEach(char => {
        if((string.indexOf(char,i+1)) === -1)
        {
            //heres your link to indexOf you amatuer
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
            console.log("this is the first non repeating char: " + char);
            return;
        }
        i++;
    });
}

string = "anbana"

firstDoesNotRepeat("anbana");