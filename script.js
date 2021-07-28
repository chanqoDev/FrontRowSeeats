const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// + makes it into a number
let ticketPrice = +movieSelect.value;
// 💡Tip: Keep functions above the event listeners

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


// update total and count
function updateSelectedCount() {
  // the selected seats are added on to a node list.
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

 // copy selected seats into arr
 // map through the array then return a new array of indexes
 // we want to store this in the local storage however this is an array no a string
 const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

// inorder to store the array we wrap it around using a JSON stringify
localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
// Get data from local Storage and populate UI
function populateUI() {
  // Tip: when getting something we can use getITem
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
// we are iterating through all the seats in local storage
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // we are selecting the seats that are in the index
      // we take the movie index then display the movie select
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  // we are storing the movie selected and the price
  setMovieData(e.target.selectedIndex, e.target.value);


  updateSelectedCount();
});

// Seat click event
//e.target lets us target the element that is being clicked
container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') &&
  !e.target.classList.contains('occupied')) {
    // we can do add,remove or toggle
    e.target.classList.toggle('selected');

    updateSelectedCount();
    }
});
//inital count and total set
updateSelectedCount();
