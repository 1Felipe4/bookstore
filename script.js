
//function initialize(){
var xmlDoc = document.getElementById("xmlDoc");
var bkStore = xmlDoc.getElementsByTagName("bookstore");
var books = xmlDoc.getElementsByTagName("book");

//}


function generate(){
  document.getElementById("content").innerHTML = "";

  for (var j = 0; j < books.length; j++) {
    var book = books[j];
    var section = document.createElement("section");
    section.style.border = "3px solid black";
    section.style.padding = "2%";
    section.style.marginTop = "5%";




    section.style.backgroundColor = "tan";
    bookCover = book.getAttribute("cover");
    if(bookCover == null){
      bookCover = "";
    }


    // section.style.backgroundImage = "url(sectionBG.png)";
    // section.style.backgroundSize = "contain";

    var title = document.createElement("h3")

    var bookTitles = book.getElementsByTagName("title");
    for (var i = 0; i < bookTitles.length; i++) {
        title.innerText+=bookTitles[i].innerText;
        if(i != bookTitles.length-1){
          title.innerText+= " | ";
        }

    }
    title.setAttribute("name", "" +title.innerText);
    section.setAttribute("name", title.innerText);



    var bookCategory = book.getAttribute("category");
    var category = document.createElement("p");
    category.innerText += "Category: " + bookCategory;
    section.setAttribute("class", "Book " + bookCategory);

    var authors =  document.createElement("p");
    var bookAuthors = book.getElementsByTagName("author");

    for (var i = 0; i < bookAuthors.length; i++) {
      if(i == 0){
        if(bookAuthors.length > 1){
          authors.innerText +="Authors: "
        }
        else{
          authors.innerText +="Author: "
        }
      }
      authors.innerText+=bookAuthors[i].innerText;
      if(i != bookAuthors.length-1){
        authors.innerText+= ", ";
      }

    }

    var year = document.createElement("p");
    var bookYear = book.getElementsByTagName("year");
    for (var i = 0; i < bookYear.length; i++) {
      if(i == 0){
        year.innerText+= "Year: "
      }
      year.innerText+= bookYear[i].innerText
      if(i != bookYear.length-1){
        year.innerText+= ", ";
      }
    }

    var price = document.createElement("ul");
    price.style.paddingLeft="0";
    price.setAttribute("name", 'PriceFor:' + title.innerText);
    var priceV = document.createElement("li");
    priceV.setAttribute("name", title.innerText);
    priceV.style.display = "inline-block";
    var bookPrice = book.getElementsByTagName("price");
    for (var i = 0; i < bookPrice.length; i++) {
      if(i==0){
        price.innerText+= "Price: $";
      }
      priceV.innerText += bookPrice[i].innerText;
      price.appendChild(priceV);
    }

    var select = document.createElement("ul");
    select.style.paddingLeft="0";
    var inputLi = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "number";
    checkbox.setAttribute("name", title.innerText);
    checkbox.setAttribute("value", 0);
    checkbox.setAttribute("min", 0);
    var labelLi = document.createElement("li");
    labelLi.innerText = "Add To Cart";
    labelLi.style.marginLeft = "1%";
    inputLi.appendChild(checkbox);
    select.appendChild(inputLi);
    select.appendChild(labelLi);

    var selectLi = select.getElementsByTagName("li");
    for (var i = 0; i < selectLi.length; i++) {
      selectLi[i].style.display = "inline-block";
    }

    if(bookCover.toLowerCase() == "paperback"){
      section.style.backgroundColor = "whitesmoke";
      title.innerText += " (" + bookCover +  ")"
    }


    section.appendChild(title);
    section.appendChild(category);
    section.appendChild(authors);
    section.appendChild(year);
    section.appendChild(price);
    section.appendChild(select);
    console.log(section);
    document.getElementById("content").appendChild(section);

  }

  generateAside();
  dropdown();
}


function generateAside(){
  var selected = getSelected();
  var uls = [];
  var sum = 0.0;
  var sumBooks = 0;

for (var i = 0; i < selected.length; i++) {
  uls.push(document.getElementsByName("PriceFor:" + selected[i].name)[0]);
}



  var table = document.createElement("table");
  table.style.borderCollapse ="collapse";
  table.style.border = "3px solid gray";


  var hRow = document.createElement("tr");
  hRow.style.fontSize = "1.4em";
  var bookHead = document.createElement("th");
  bookHead.innerText ="Book";
  bookHead.style.border = "1px solid lightgray";


  hRow.appendChild(bookHead);



  var amountHead = document.createElement("th");
  amountHead.innerText = "Amount";
  amountHead.style.border = "1px solid lightgray";

  var costHead = document.createElement("th");
  costHead.innerText = "Cost";
  costHead.style.border = "1px solid lightgray";
  hRow.appendChild(costHead);

  hRow.appendChild(amountHead);
  table.appendChild(hRow);

  if(selected.length == 0){
    var noneRow = document.createElement("tr");
    noneRow.style.fontSize = "1.3em";
    var noneData = document.createElement("td");
    noneData.innerText ="None";
    noneRow.appendChild(noneData);



    var noneAmount = document.createElement("td");
    noneAmount.innerText = "0"
    noneAmount.style.border = "2px solid lightgray";
    noneAmount.style.textAlign = "center";
    noneRow.appendChild(noneAmount);

    var noneSum = document.createElement("td");
    noneSum.innerText = "$0.00";
    noneRow.appendChild(noneSum);

    table.appendChild(noneRow);
  }


  for (var i = 0; i < uls.length; i++) {
    let row = document.createElement("tr");
    row.style.fontSize = "1.3em";
    let node = uls[i].childNodes[1];
    let selInput = selected[i];

    var bookName = document.createElement("td");
    bookName.innerText = "" +node.getAttribute("name");
    row.appendChild(bookName);



    var bookAmount = document.createElement("td");
    bookAmount.innerText = selInput.value;
    bookAmount.style.border = "2px solid lightgray";
    bookAmount.style.textAlign = "center";
    row.appendChild(bookAmount);


    var bookPrice = document.createElement("td");
    bookPrice.innerText = "$" + parseFloat(node.innerText*selInput.value).toFixed(2);
    row.appendChild(bookPrice);

    sumBooks+= parseInt(selInput.value);
    sum+= parseFloat(node.innerText) * selInput.value;
    table.appendChild(row);
  }

  var row = document.createElement("tr");
  row.style.border = "2px solid lightgray";
  row.style.fontSize = "1.3em";
  var total = document.createElement("th");
  total.innerText = "Total";
  row.appendChild(total);



  var amount = document.createElement("td");
  console.log(sumBooks);
  amount.innerText = sumBooks;
  amount.style.textAlign = "center";
  row.appendChild(amount);

  var totalTxt = document.createElement("td");
  totalTxt.innerText = "$" + sum.toFixed(2);
  row.appendChild(totalTxt);

  table.appendChild(row);
  section = document.getElementById("calculate");
  section.innerHTML = "";
  section.appendChild(table);

}

function dropdown() {
var categories = ["all"];
for (var j = 0; j < books.length; j++) {
  var book = books[j];
  var b = true;
  for (var i = 0; i < categories.length; i++) {
    if(categories[i] == book.getAttribute("category")){
      b = false;
    }
  }

  if (b == true){
    categories.push(book.getAttribute("category"));
  }
}

var select = document.getElementById("dropdown");
select.style.fontSize = "1.2em";
select.innerHTML = "";

for (var i = 0; i < categories.length; i++) {
  var opt = document.createElement("option");
  opt.innerText = categories[i];
  select.appendChild(opt);

}

console.log(categories);
}

function getSelected(){
  var inputs = document.getElementsByTagName("input");
  var selected = [];
  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].value > 0){
      selected.push(inputs[i]);
    }

  }


return selected;

}

function displayCategory(){
  var sections = document.getElementsByClassName("Book");
  var select = document.getElementById("dropdown");
  var category = select.value;
  var booksInCategory = document.getElementsByClassName(category);
  console.log(booksInCategory);

if (category != "all") {
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  for (var i = 0; i < booksInCategory.length; i++) {
    booksInCategory[i].style.display = "block";
  }
}else {
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "block";
  }
}

}
