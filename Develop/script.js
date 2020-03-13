let timeBlocks = $(".time-block");
let hours = $(".hour");
let timeRows = $("#timesheet div");
let textAreas = $(".textarea");

//function to return a clone of the moment object
//the moment object is mutable so i don't want to accidentally alter it and break other functions
// this way every time i get it i get a unique instance of it
let getCurrentTime = function () {
    return moment().clone();
}

let postDisplayDate = function () {  
    var dateString = getCurrentTime().format('dddd, MMMM Do');
    $("#currentDay").text(dateString);
}

let OnInit = function () {
    postDisplayDate();
    renderTimeBlocks();
};

let renderTimeBlocks = function () {
    
    // get the current hour as an int. this could be a problem if the for loop takes to long. but should be ok
    var currentHour = parseInt(getCurrentTime().format('H'));

    //trying to use arrow functions here.
    //only supported by modern browsers (not IE) but want to try them
    hours.each((index, hour) => {
        
        //moment(moment().format('YYYY-MM-DDT') + "09:00")

        //hours start at 9 and end at 5pm. using 24hr that would be 9 to 17
        //get the hour content and remove AM or PM. that should just give us a number to work with
        hour = hours[index];
        
        console.log(hour);
        let timeInt;
        if (hour.textContent.includes("PM")) {
            console.log("text includes PM")
            timeInt = parseInt(hour.textContent.replace("PM",""))
            if(timeInt !== 12){
                //12 is a special case, because it is set as PM but is already 24hr standard
                timeInt += 12;
                console.log("timeInt is not 12 adding 12")
            }
        } else {
            timeInt = parseInt(hour.textContent.replace("AM",""));
        }
        console.log(timeInt);
        timeblock = timeBlocks[index];
        if(currentHour > timeInt){
            //hour is in the past. apply the past style
            $(timeblock).removeClass("past present future").addClass("past");
        } else if(currentHour === timeInt){
            //hour is the current hour. apply the present style
            $(timeblock).removeClass("past present future").addClass("present");
        } else {
            //hour is in the future. apply the future style
            $(timeblock).removeClass("past present future").addClass("future");
        }
        // console.log(timeblock.textContent.replace("PM","").replace("AM",""));
    });
}

let saveTimeBlockText = function() {
    //this listener will be added to a save button so expect this to be the saveBtn
    var row = $(this).parent(".row")

    //use the hour as the key to save and retrieve from local storage
    var rowObject = {

    }

    //get the text to save
    var text = row.children(".textarea").text()

    
}

OnInit();