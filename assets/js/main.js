var btitle = document.getElementById('title');
var bauther = document.getElementById('auther');
var bpub = document.getElementById('publisher');
var bgenre = document.getElementById('genre');
var bprice = document.getElementById('price');
var addBtn = document.getElementById('click');
var data = document.getElementById('data');
var inputs = document.getElementsByClassName('inputs');
var deleteAll = document.getElementById('deleteAll');
var  currentIndex = 0;
if(localStorage.getItem("booksList")== null){
    var books = [];
}
else{
var books = JSON.parse(localStorage.getItem("booksList"));
displayData();
}
addBtn.onclick = function(){
  if( addBtn.innerHTML == "Add Book") { 
    addBook();
  }
  else{
      updateData();
  }
    displayData();
    clearForm()
}
function addBook(){
    var book = {
    title:btitle.value,
    auther: bauther.value,
    publisher: bpub.value,
    genre: bgenre.value,
    price:bprice.value
};

books.push(book);
localStorage.setItem("booksList",JSON.stringify(books));
}
function displayData(){
        var result = "";
for (var i = 0; i<books.length;i++){
    result+=
     `<tr>
     <td>${i}</td>
     <td>${books[i].title}</td>
     <td>${books[i].auther}</td>
     <td>${books[i].publisher}</td>
     <td>${books[i].genre}</td>
     <td>${books[i].price}</td>
     <td><button class="upBtn" onclick = getData(${i})><i class="fa-solid fa-paintbrush"></i></button></td>
     <td><button class="delBtn" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can"></i></button></td>

     </tr>`
}
data.innerHTML = result;
}
function search(searchText){
    var result = "";
    for (var i = 0; i<books.length;i++){
        if(books[i].title.toLowerCase().includes(searchText.toLowerCase())){
        result+=
         `<tr>
         <td>${i}</td>
         <td>${books[i].title}</td>
         <td>${books[i].auther}</td>
         <td>${books[i].publisher}</td>
         <td>${books[i].genre}</td>
         <td>${books[i].price}</td>
         <td><button class="upBtn" onclick = getData(${i})>><i class="fa-solid fa-paintbrush"></i></button></td>
         <td><button class="delBtn" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can"></i></button></td>
    
         </tr>`
    }
}
    data.innerHTML = result;
}
function  getData(index){
    var book = books[index];
    btitle.value = book.title;
    bauther.value = book.auther;
    bpub.value = book.publisher;
    bgenre.value = book.genre;
    bprice.value = book.price;
    addBtn.innerHTML = "UpDate";
    currentIndex = index;
}
function  updateData(){
    
    var book = {
        title:btitle.value,
        auther: bauther.value,
        publisher: bpub.value,
        genre: bgenre.value,
        price:bprice.value
    };
    books[currentIndex].title = book.title;
    books[currentIndex].auther = book.auther;
    books[currentIndex].publisher = book.publisher;
    books[currentIndex].genre = book.genre;
    books[currentIndex].price = book.price;
    localStorage.setItem("booksList",JSON.stringify(books));
    addBtn.innerHTML ="Add Book";
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}
function clearForm(){
    for(var i = 0 ; i< inputs.length;i++){
        inputs[i].value= "" ;
    }
}
function deleteBook(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            books.splice(index,1);
    localStorage.setItem("booksList",JSON.stringify(books));
    displayData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}
deleteAll.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("booksList");
            books=[];
            data.innerHTML = "";
          Swal.fire(
            'Deleted!',
            'All files has been deleted.',
            'success'
          )
        }
      })
   
}

title.onkeyup = function(){
    var titlePattern = /^[A-Z][a-z0-9]{2,20}$/;
    //console.log(titlePattern.test(title.value));
   if(titlePattern.test(title.value)){
    addBtn.removeAttribute("disabled");
    title.classList.add('is-valid');
    title.classList.remove('is-invalid');
    titleAlert.classList.add('d-none');
       
   }
   else{
      addBtn.disabled = true;
       title.classList.add('is-invalid');
       title.classList.remove('is-valid');
       titleAlert.classList.remove('d-none')
   }
  
   }
auther.onkeyup = function(){
    var autherPattern = /^[A-Z][a-z]{2,20}$/;
     if(autherPattern.test(auther.value)){

        addBtn.removeAttribute("disabled");
        auther.classList.add('is-valid');
        auther.classList.remove('is-invalid');
        autherAlert.classList.add('d-none');
           
       }
       else{
           addBtn.disabled = true;
           auther.classList.add('is-invalid');
           auther.classList.remove('is-valid');
           autherAlert.classList.remove('d-none')
       }
}
publisher.onkeyup = function(){
    var publisherPattern = /^[A-Z][a-z]{2,20}$/;
     if(publisherPattern.test(publisher.value)){

        addBtn.removeAttribute("disabled");
        publisher.classList.add('is-valid');
        publisher.classList.remove('is-invalid');
        publisherAlert.classList.add('d-none');
           
       }
       else{
           addBtn.disabled = true;
           publisher.classList.add('is-invalid');
           publisher.classList.remove('is-valid');
           publisherAlert.classList.remove('d-none')
       }
}
genre.onkeyup = function(){
    var genrePattern = /^[a-zA-Z ]/;
     if(genrePattern.test(genre.value) != ""){
      
        addBtn.removeAttribute("disabled");
        genre.classList.add('is-valid');
        genre.classList.remove('is-invalid');
        genreAlert.classList.add('d-none');
           
       }
       else{
           addBtn.disabled = true;
           genre.classList.add('is-invalid');
           genre.classList.remove('is-valid');
           genreAlert.classList.remove('d-none')
       }
}
price.onkeyup = function(){
    var pricePattern = /^\d{0,8}[.]?\d{1,4}$/;
     if(pricePattern.test(price.value)){

        addBtn.removeAttribute("disabled");
        price.classList.add('is-valid');
        price.classList.remove('is-invalid');
        priceAlert.classList.add('d-none');
           
       }
       else{
           addBtn.disabled = true;
           price.classList.add('is-invalid');
           price.classList.remove('is-valid');
           priceAlert.classList.remove('d-none')
       }
}



