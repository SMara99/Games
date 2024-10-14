const cardData = [
    { title : "1" , imageUrl : "Images/bear.PNG"},
    { title : "2" , imageUrl : "Images/cat.PNG"},
    { title : "3" , imageUrl : "Images/chicken.PNG"},
    { title : "4" , imageUrl : "Images/cow.PNG"},
    { title : "5" , imageUrl : "Images/crab.PNG"},
    { title : "6" , imageUrl : "Images/crocodile.PNG"},
    { title : "7" , imageUrl : "Images/dog.PNG"},
    { title : "8" , imageUrl : "Images/dolphin.PNG"},
    { title : "9" , imageUrl : "Images/donkey.PNG"},
    { title : "10" , imageUrl : "Images/duck.PNG"},
    { title : "11" , imageUrl : "Images/elefant.PNG"},
    { title : "12" , imageUrl : "Images/fish.PNG"},
    { title : "13" , imageUrl : "Images/fox.PNG"},
    { title : "14" , imageUrl : "Images/giraffe.PNG"},
    { title : "15" , imageUrl : "Images/goat.PNG"},
    { title : "16" , imageUrl : "Images/goose.PNG"},
    { title : "17" , imageUrl : "Images/hippo.PNG"},
    { title : "18" , imageUrl : "Images/horse.PNG"},
    { title : "19" , imageUrl : "Images/jellyfish.PNG"},
    { title : "20" , imageUrl : "Images/leopard.PNG"},
    { title : "21" , imageUrl : "Images/lion.PNG"},
    { title : "22" , imageUrl : "Images/mokey.PNG"},
    { title : "23" , imageUrl : "Images/nemo.PNG"},
    { title : "24" , imageUrl : "Images/octopus.PNG"},
    { title : "25" , imageUrl : "Images/owl.PNG"},
    { title : "26" , imageUrl : "Images/penguin.PNG"},
    { title : "27" , imageUrl : "Images/pig.PNG"},
    { title : "28" , imageUrl : "Images/reindeer.PNG"},
    { title : "29" , imageUrl : "Images/rhino.PNG"},
    { title : "30" , imageUrl : "Images/rooster.PNG"},
    { title : "31" , imageUrl : "Images/seahorse.PNG"},
    { title : "32" , imageUrl : "Images/sheep.PNG"},
    { title : "33" , imageUrl : "Images/startfish.PNG"},
    { title : "34" , imageUrl : "Images/tiger.PNG"},
    { title : "35" , imageUrl : "Images/turtle.PNG"},
    { title : "36" , imageUrl : "Images/urangutan.PNG"},
    { title : "37" , imageUrl : "Images/whale.PNG"},
    { title : "38" , imageUrl : "Images/zebra.PNG"}
]

function createCard(title, imageUrl){
    const card = document.createElement("div");
    card.classList.add("card");

    const cardImage = document.createElement("img");
    cardImage.src = imageUrl;
    cardImage.alt = title;
    cardImage.style.width = "100%";
    cardImage.style.borderRadius = "8px 8px 8px 8px";

    card.appendChild(cardImage);

    return card;
}

const cardContainer = document.getElementById("cards");

cardData.forEach( data => {
    const card = createCard(data.title, data.imageUrl);
    cardContainer.appendChild(card);
})