var myIndex = 0;

carousel();
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
  	x[i].style.display = "none";  
   }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}  
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000); // Change image every 5 seconds
}

function showModal (id) {
  document.querySelector(id).style.display = 'block'
}

function hideModal (id) {
  document.querySelector(id).style.display = 'none'
}

setInterval(() => {
	const name = localStorage.user

	document.querySelector('.user-name').innerText = name
}, 3000)