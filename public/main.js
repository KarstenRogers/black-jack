let dealerHand = []
let playerHand = []
let deck = []

let showPlayer = document.querySelector(".player-score")

let showDealer = document.querySelector(".dealer-score")

let displayStatus = document.querySelector(".winlose")

let playerCount = 0
let dealerCount = 0

let countPlayer = () => {
  if (playerHand.length === 2) {
    playerCount = playerHand[0].value + playerHand[1].value
    showPlayer.textContent = playerCount
  }
  if (playerHand.length === 3) {
    playerCount =
      playerHand[0].value + playerHand[1].value + playerHand[2].value
    showPlayer.textContent = playerCount
  }
  if (playerHand.length === 4) {
    playerCount =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value
    showPlayer.textContent = playerCount
  }
  if (playerHand.length === 5) {
    playerCount =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value +
      playerHand[4].value
    showPlayer.textContent = playerCount
    noMore()
  }
}

let countDealer = () => {
  if (dealerHand.length === 2) {
    dealerCount = dealerHand[0].value + dealerHand[1].value
    showDealer.textContent = dealerCount
  }
  if (dealerHand.length === 3) {
    dealerCount =
      dealerHand[0].value + dealerHand[1].value + dealerHand[2].value
    showDealer.textContent = dealerCount
  }
  if (dealerHand.length === 4) {
    dealerCount =
      dealerHand[0].value +
      dealerHand[1].value +
      dealerHand[2].value +
      dealerHand[3].value
    showDealer.textContent = dealerCount
  }
  if (dealerHand.length === 5) {
    dealerCount =
      dealerHand[0].value +
      dealerHand[1].value +
      dealerHand[2].value +
      dealerHand[3].value +
      dealerHand[4].value
    showDealer.textContent = dealerCount
    checkWinner()
  }
}

const checkWinner = () => {
  console.log("check winner")
  if (dealerCount > playerCount) {
    displayStatus.textContent =
      "DEALER HAS " + `${showDealer.textContent}` + ", YOU LOSE."
  }
  if (dealerCount < playerCount) {
    displayStatus.textContent =
      "YOU HAVE " + `${showPlayer.textContent}` + ", YOU WIN!"
  }
  if (dealerCount === playerCount) {
    displayStatus.textContent =
      "YOU BOTH HAVE" + `${showPlayer.textContent}` + ", THE DEALER WINS."
  }
}

const noMore = () => {
  console.log("stay") 
  document.querySelector(".hits").classList.add("hideme")
  document.querySelector(".stays").classList.add("hideme")
  document.querySelector(".back").classList.add("hideme")
  dealCardToDealer()
  countDealer()
  if (dealerCount < 17) {
    noMore()
  }
  if (dealerCount >= 17 && dealerCount <= 21) {
    checkWinner()
  }
  if (dealerCount > 21) {
    displayStatus.textContent =
      "DEALER BUSTED WITH " + `${showDealer.textContent}` + ", YOU WIN!"
  }
}

const giveMore = () => {
  console.log("hit")
  dealCardToPlayer()
  countPlayer()
  if (playerCount <= 21) {
    displayStatus.textContent =
      "YOU HAVE " + `${showPlayer.textContent}` + ", HIT OR STAY"
  }
  if (playerCount > 21) {
    document.querySelector(".hits").classList.add("hideme")
    document.querySelector(".stays").classList.add("hideme")
    displayStatus.textContent = "YOU BUSTED, PLAY AGAIN"
  }
}

const dealCardToPlayer = upOrDown => {
  countPlayer() 
  let card = deck.pop()
  
  playerHand.push(card)
  
  const playerHandDiv = document.querySelector(".player-hand")
  
  let image = document.createElement("img")
  
  image.src = `/images/${card.face}${card.suit}.jpg`
  
  playerHandDiv.appendChild(image)
}

const dealCardToDealer = upOrDown => {
  
  let card = deck.pop()
  
  dealerHand.push(card)
  
  const dealerHandDiv = document.querySelector(".dealer-hand")
  
  let image = document.createElement("img")
  
  image.src = `/images/${card.face}${card.suit}.jpg`
  
  dealerHandDiv.appendChild(image)
}

const main = () => {
  let suits = ["C", "S", "D", "H"]
  let cards = [
    { value: 2, face: "2" },
    { value: 3, face: "3" },
    { value: 4, face: "4" },
    { value: 5, face: "5" },
    { value: 6, face: "6" },
    { value: 7, face: "7" },
    { value: 8, face: "8" },
    { value: 9, face: "9" },
    { value: 10, face: "10" },
    { value: 10, face: "J" },
    { value: 10, face: "Q" },
    { value: 10, face: "K" },
    { value: 11, face: "A" }
  ]
  
  suits.forEach(suit => { 
    
    cards.forEach(card => {
      
      let newCardForTheDeck = {
        suit: suit,
        value: card.value,
        face: card.face
      }
      
      deck.push(newCardForTheDeck)
    })
  })
 
  for (let i = 52 - 1; i > 1; i -= 1) {
    let j = Math.floor(Math.random() * i)
    let firstCard = deck[i]
    let secondCard = deck[j]
    deck[i] = secondCard
    deck[j] = firstCard
  }
  dealCardToPlayer("up")
  dealCardToPlayer("up")
  dealCardToDealer("up")
  
  countPlayer()
  
  showDealer.textContent = "?"
  
  displayStatus.textContent =
    "YOU HAVE " + `${showPlayer.textContent}` + ", HIT OR STAY"
  
  document.querySelector(".hits").addEventListener("click", giveMore)
  document.querySelector(".stays").addEventListener("click", noMore)
  document.querySelector(".reset").addEventListener("click", () => {
    document.location = "/"
  })
}

document.addEventListener("DOMContentLoaded", main)
