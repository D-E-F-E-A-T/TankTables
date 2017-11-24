// Set up max volume and max sounding value of tanks
sludgeTankMaxVolume = 28.8;
sludgeTankMaxSoungindValue = 230;

// default trim value
var trim = "EVEN";

// adjust trim
var trimButtons = document.querySelectorAll(".trim");
for(var i = 0; i < trimButtons.length; i++) {
    trimButtons[i].addEventListener("click", function(){
        for(var i = 0; i < trimButtons.length; i++){
            trimButtons[i].style.backgroundColor = "white";
            trimButtons[i].style.color = "black";
        }
        this.style.backgroundColor = "navy";
        this.style.color = "white";
        trim = this.dataset.value;
    });
}

// taking input value and adjusting event on tanks button
var sludgeTankInput = document.querySelector('#sludgeTank');
var sludgeTankButton = document.querySelector("#sludgeTankButton");
var sludgeTankResult = document.querySelector("#sludgeTankResult");

sludgeTankButton.addEventListener("click", function(){
    var volume = calculateSoundingValue(sludgeTankInput.value, sludgeChart, sludgeTankMaxSoungindValue, sludgeTankMaxVolume);
    sludgeTankResult.innerHTML = "You have " + volume + "m3 in tank. <br> That's "+ (Math.decimal((volume/sludgeTankMaxVolume)*100,2)) + "% of it's volume." ;
    console.log("elo"+volume);
});


//calculating function
function calculateSoundingValue(UserValue, TankChart, TankMaxSoundingValue, TankMaxVolume){
    if(UserValue == TankMaxSoundingValue){
        return TankMaxVolume;
    }
    // get number divided by 5 to read the volume value from nameChart in tables.js
    var smallerValue = Math.floor(UserValue - UserValue%5);
    var smallerVolume = TankChart[trim][smallerValue];
    // calculate the volume by 1 cm
    var bigerVolume = TankChart[trim][smallerValue+5];
    var oneCmVolume = (bigerVolume - smallerVolume) / 5;
    // calculate the rest of volume
    var restVolume = (UserValue%5) * oneCmVolume;
    // calculate total volume
    return Math.decimal((smallerVolume + restVolume), 2);
}
//rounding
Math.decimal = function(number,placeAfterDecimal) {
    var factor = Math.pow(10, placeAfterDecimal + 1);
    number = Math.round(Math.round(number * factor) / 10);
    return number / (factor / 10);
};