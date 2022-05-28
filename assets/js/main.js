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
}
function clearForm(){
    for(var i = 0 ; i< inputs.length;i++){
        inputs[i].value= "" ;
    }
}
function deleteBook(index){
    books.splice(index,1);
    localStorage.setItem("booksList",JSON.stringify(books));
    displayData();
}
deleteAll.onclick = function(){
    localStorage.removeItem("booksList");
    books=[];
    data.innerHTML = "";
}

title.onkeyup = function(){
    var titlePattern = /^[A-Z][a-z0-9]{2,10}$/;
   // console.log(titlePattern.test(title.value));
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