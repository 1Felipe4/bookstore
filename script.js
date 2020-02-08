
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
    section.style.backgroundColor = "whitesmoke";
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
    var bookCategory = book.getAttribute("category");
    var category = document.createElement("p");
    category.innerText += "Category: " + bookCategory;

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
    checkbox.type = "checkbox";
    checkbox.setAttribute("name", title.innerText);
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

    section.appendChild(title);
    section.appendChild(category);
    section.appendChild(authors);
    section.appendChild(year);
    section.appendChild(price);
    section.appendChild(select);

    document.getElementById("content").appendChild(section);

  }

  generateAside();
}


function generateAside(){
  var selected = getSelected();
  var uls = [];
  var sum = 0.0;

for (var i = 0; i < selected.length; i++) {
  uls.push(document.getElementsByName("PriceFor:" + selected[i].name)[0]);
}



  var table = document.createElement("table");
  table.style.borderCollapse ="collapse";
  table.style.border = "3px solid gray";
  var hRow = document.createElement("tr");
  var bookHead = document.createElement("th");
  var costHead = document.createElement("th");
  bookHead.innerText ="Book";
  costHead.innerText = "Cost";
  bookHead.style.border = "1px solid lightgray";
  costHead.style.border = "1px solid lightgray";
  hRow.appendChild(bookHead);
  hRow.appendChild(costHead);

  table.appendChild(hRow);

  if(selected.length == 0){
    var noneRow = document.createElement("tr");
    var noneData = document.createElement("td");
    var noneSum = document.createElement("td");
    noneData.innerText ="None";
    noneSum.innerText = "$0.00";

    noneRow.appendChild(noneData);
    noneRow.appendChild(noneSum);
    table.appendChild(noneRow);
  }


  for (var i = 0; i < uls.length; i++) {
    let row = document.createElement("tr");
    let node = uls[i].childNodes[1];
    var bookName = document.createElement("td");
    bookName.innerText = "" +node.getAttribute("name");
    var bookPrice = document.createElement("td");
    bookPrice.innerText = "$" + node.innerText;
    sum+= parseFloat(node.innerText)
    row.appendChild(bookName);
    row.appendChild(bookPrice);
    table.appendChild(row);
  }

  var row = document.createElement("tr");
  row.style.border = "2px solid lightgray";
  var totalTxt = document.createElement("td");
  totalTxt.innerText = "Total";
  var total = document.createElement("td");
  total.innerText = "$" + sum.toFixed(2);
  row.appendChild(totalTxt);
  row.appendChild(total);
  table.appendChild(row);
  section = document.getElementById("calculate");
  section.innerHTML = "";
  section.appendChild(table);

}

function getSelected(){
  var inputs = document.getElementsByTagName("input");
  var selected = [];
  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].checked){
      selected.push(inputs[i]);
    }

  }


return selected;

}
