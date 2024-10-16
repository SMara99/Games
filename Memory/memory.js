const cardData = [
    { title : "1" , imageUrl : "Images/bear.PNG", backImage: "Images/backside.PNG"},
    { title : "2" , imageUrl : "Images/cat.PNG", backImage: "Images/backside.PNG"},
    { title : "3" , imageUrl : "Images/chicken.PNG", backImage: "Images/backside.PNG"},
    { title : "4" , imageUrl : "Images/cow.PNG", backImage: "Images/backside.PNG"},
    { title : "5" , imageUrl : "Images/crab.PNG", backImage: "Images/backside.PNG"},
    { title : "6" , imageUrl : "Images/crocodile.PNG", backImage: "Images/backside.PNG"},
    { title : "7" , imageUrl : "Images/dog.PNG", backImage: "Images/backside.PNG"},
    { title : "8" , imageUrl : "Images/dolphin.PNG", backImage: "Images/backside.PNG"},
    { title : "9" , imageUrl : "Images/donkey.PNG", backImage: "Images/backside.PNG"},
    { title : "10" , imageUrl : "Images/duck.PNG", backImage: "Images/backside.PNG"},
    { title : "11" , imageUrl : "Images/elefant.PNG", backImage: "Images/backside.PNG"},
    { title : "12" , imageUrl : "Images/fish.PNG", backImage: "Images/backside.PNG"},
    { title : "13" , imageUrl : "Images/fox.PNG", backImage: "Images/backside.PNG"},
    { title : "14" , imageUrl : "Images/giraffe.PNG", backImage: "Images/backside.PNG"},
    { title : "15" , imageUrl : "Images/goat.PNG", backImage: "Images/backside.PNG"},
    { title : "16" , imageUrl : "Images/goose.PNG", backImage: "Images/backside.PNG"},
    { title : "17" , imageUrl : "Images/hippo.PNG", backImage: "Images/backside.PNG"},
    { title : "18" , imageUrl : "Images/horse.PNG", backImage: "Images/backside.PNG"},
    { title : "19" , imageUrl : "Images/jellyfish.PNG", backImage: "Images/backside.PNG"},
    { title : "20" , imageUrl : "Images/leopard.PNG", backImage: "Images/backside.PNG"},
    { title : "21" , imageUrl : "Images/lion.PNG", backImage: "Images/backside.PNG"},
    { title : "22" , imageUrl : "Images/mokey.PNG", backImage: "Images/backside.PNG"},
    { title : "23" , imageUrl : "Images/nemo.PNG", backImage: "Images/backside.PNG"},
    { title : "24" , imageUrl : "Images/octopus.PNG", backImage: "Images/backside.PNG"},
    { title : "25" , imageUrl : "Images/owl.PNG", backImage: "Images/backside.PNG"},
    { title : "26" , imageUrl : "Images/penguin.PNG", backImage: "Images/backside.PNG"},
    { title : "27" , imageUrl : "Images/pig.PNG", backImage: "Images/backside.PNG"},
    { title : "28" , imageUrl : "Images/reindeer.PNG", backImage: "Images/backside.PNG"},
    { title : "29" , imageUrl : "Images/rhino.PNG", backImage: "Images/backside.PNG"},
    { title : "30" , imageUrl : "Images/rooster.PNG", backImage: "Images/backside.PNG"},
    { title : "31" , imageUrl : "Images/seahorse.PNG", backImage: "Images/backside.PNG"},
    { title : "32" , imageUrl : "Images/sheep.PNG", backImage: "Images/backside.PNG"},
    { title : "33" , imageUrl : "Images/startfish.PNG", backImage: "Images/backside.PNG"},
    { title : "34" , imageUrl : "Images/tiger.PNG", backImage: "Images/backside.PNG"},
    { title : "35" , imageUrl : "Images/turtle.PNG", backImage: "Images/backside.PNG"},
    { title : "36" , imageUrl : "Images/urangutan.PNG", backImage: "Images/backside.PNG"},
    { title : "37" , imageUrl : "Images/whale.PNG", backImage: "Images/backside.PNG"},
    { title : "38" , imageUrl : "Images/zebra.PNG", backImage: "Images/backside.PNG"}
]

function createCard(imageUrl, imgBack){
    const card = document.createElement("div");
    card.classList.add("card"); // Adding the "card" class to apply CSS styles

    // Create front side of the card
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const frontImage = document.createElement('img');
    frontImage.src = imageUrl;
    frontImage.alt = "Card Front";

    cardFront.appendChild(frontImage);  // Add image to front side

    // Create back side of the card
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const backImage = document.createElement('img');
    backImage.src = imgBack;
    backImage.alt = "Card Back";

    cardBack.appendChild(backImage); // Add image to back side

    // Add both front and back to the card
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    // Add click event listener to flip the card
    card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });

    return card;
}

const cardContainer = document.getElementById("cards");

cardData.forEach( data => {
    const card = createCard(data.imageUrl, data.backImage);
    cardContainer.appendChild(card);
})
