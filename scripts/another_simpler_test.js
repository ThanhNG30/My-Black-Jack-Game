var cards = ["4-D", "3-C", "5-H", "7-S"];
var canSplit = false;

document.write(cards + "<br>");
var yourCards = [];
for (var i = 0; i< cards.length; i++) {
    var oneCard = cards[i].split("-");
    yourCards.push(oneCard[0]);
    
}

document.write(yourCards);
//Can split
const toFindDuplicates = yourCards => yourCards.filter((value, index) => yourCards.indexOf(value) !== index) //Return the duplicated value in your cards
const duplicateElements = toFindDuplicates(yourCards);
console.log(duplicateElements);

if( duplicateElements != '') {
    canSplit = true;
    document.write("Do you want to split?");
}



// for (var n = 0; n < yourCards.length; n++) {
//     // console.log(n);

//     console.log("Your n card is" + yourCards[n]);
//     // for (var m = 1; m < yourCards.length; m++) {
//     //     // console.log(m);
//     //     console.log("Your m card is" + yourCards[m]);
//     //     if ( (yourCards[n] == yourCards[m])) {
//     //         document.write("You have 2 cards of the same value! You may split.");
//     //         n = 100;
//     //         m = 100;
//     //     }
        
//     // }
//     // m++;
//     console.log("Your n+1 card is" + yourCards[n+1]);
//     if ( yourCards[n] == yourCards[n+1]) {
//         document.write("You have 2 cards of the same value! You may split.");

//     }

// }