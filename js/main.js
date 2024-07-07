//  selector in html
let title = document.querySelector("#Title");
let price = document.querySelector(".price");
let Taxes = document.querySelector(".Taxes");
let Ads = document.querySelector(".Ads");
let Discount = document.querySelector(".Discount");
let Count = document.querySelector("#Count");
let Category = document.querySelector("#Category");
let Search = document.querySelector("#Search");
let create = document.querySelector(".CreateProduct");
let Delete = document.getElementById("DeleteAll");
let total = document.querySelector(".Total");
let totalParent = document.querySelector(".total");
let TbodyTable = document.querySelector(".TBTable");
let BtnMood = "create";
let indexRow;

//  function to get total
function getTotal() {
  const priceVal = price.value;
  const TaxesVal = Taxes.value;
  const AdsVal = Ads.value;
  const DiscountVal = Discount.value;
  if (priceVal != "") {
    let result = +priceVal + +TaxesVal + +AdsVal - DiscountVal;
    total.innerHTML = result;
    totalParent.style.backgroundColor = "#3f85ff";
  } else {
    totalParent.style.backgroundColor = "#16c6fc";
    total.innerHTML = `0`;
  }
}

//  functions to create product and save in localStorage //

//  to check array in localStorage
let DataProduct = localStorage.Product ? JSON.parse(localStorage.Product) : [];

//  to create an object and add in array and LocalStorage
create.onclick = function () {
  let ProductObj = {
    title: title.value.toLowerCase(),
    price: price.value,
    Taxes: Taxes.value,
    Ads: Ads.value,
    Discount: Discount.value,
    Count: Count.value,
    total: total.innerHTML,
    Category: Category.value.toLowerCase(),
  };

  if (BtnMood === "create") {
    if (Count.value >= 1) {
      DataProduct = DataProduct || [];
      for (let i = 0; i < Count.value; i++) {
        DataProduct.push(ProductObj);
      }
    } else {
      DataProduct = DataProduct || [];
      DataProduct.push(ProductObj);
    }
  } else {
    DataProduct[indexRow] = ProductObj;
    BtnMood = "create";
    create.innerHTML = "Create";
    Count.style.display = "block";
  }

  localStorage.setItem("Product", JSON.stringify(DataProduct));
  console.log(DataProduct);
  ClearInputs();
  ShowData();
};

// function to clear inputs after create
function ClearInputs() {
  title.value = "";
  price.value = "";
  Taxes.value = "";
  Ads.value = "";
  Discount.value = "";
  Count.value = "";
  total.innerHTML = 0;
  Category.value = "";
}

// function to Show data from Array
function ShowData() {
  let table = "";
  for (let i = 0; i < DataProduct.length; i++) {
    table += `
        <tr>
              <td>${i}</td>
              <td>${DataProduct[i].title}</td>
              <td>${DataProduct[i].price}</td>
              <td>${DataProduct[i].Taxes}</td>
              <td>${DataProduct[i].Ads}</td>
              <td>${DataProduct[i].Discount}</td>
              <td>${DataProduct[i].total}</td>
              <td>${DataProduct[i].Category}</td>
              <td> <i onclick="deleteProduct(${i})" class="fa-solid fa-trash"></i> <i onclick="UpdateProduct(${i})"  class="fa-solid fa-pen"></i> </td>
            </tr>
        `;
  }
  TbodyTable.innerHTML = table;
  getTotal();
}
ShowData();

// function  to delete row from table
function deleteProduct(i) {
  DataProduct.splice(i, 1);
  localStorage.Product = JSON.stringify(DataProduct);
  ShowData();
}

// function  to delete All row from table
Delete.onclick = function () {
  DataProduct = [];
  localStorage.Product = JSON.stringify(DataProduct);
  TbodyTable.innerHTML = "";
  console.log(DataProduct);
};

// function  to update product
function UpdateProduct(i) {
  title.value = DataProduct[i].title;
  price.value = DataProduct[i].price;
  Taxes.value = DataProduct[i].Taxes;
  Ads.value = DataProduct[i].Ads;
  Discount.value = DataProduct[i].Discount;
  Count.style.display = "none";
  Category.value = DataProduct[i].Category;
  create.innerHTML = "Update";
  getTotal();
  BtnMood = "update";
  indexRow = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// function to get search mood
function SearchMood(id) {
  let searchMode;
  if (id === "SearchT") {
    searchMode = "title";
    Search.placeholder = "You Search by Title";
    document.getElementById("SearchT").classList.add("activeBtn");
    document.getElementById("SearchC").classList.remove("activeBtn");
  } else if (id === "SearchC") {
    searchMode = "Category";
    Search.placeholder = "You Search by Category";
    document.getElementById("SearchT").classList.remove("activeBtn");
    document.getElementById("SearchC").classList.add("activeBtn");
  }
  Search.value = "";
  ShowData();
}

// function to search in array and show result
function SearchData(value) {
  let table = "";
  if ((searchMode = "title")) {
    for (let i = 0; i < DataProduct.length; i++) {
      if (DataProduct[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
                  <td>${i}</td>
                  <td>${DataProduct[i].title}</td>
                  <td>${DataProduct[i].price}</td>
                  <td>${DataProduct[i].Taxes}</td>
                  <td>${DataProduct[i].Ads}</td>
                  <td>${DataProduct[i].Discount}</td>
                  <td>${DataProduct[i].total}</td>
                  <td>${DataProduct[i].Category}</td>
                  <td> <i onclick="deleteProduct(${i})" class="fa-solid fa-trash"></i> <i onclick="UpdateProduct(${i})"  class="fa-solid fa-pen"></i> </td>
                </tr>
            `;
      }
    }
  } else {
    for (let i = 0; i < DataProduct.length; i++) {
      if (DataProduct[i].Category.includes(value.toLowerCase())) {
        table += `
              <tr>
                    <td>${i}</td>
                    <td>${DataProduct[i].title}</td>
                    <td>${DataProduct[i].price}</td>
                    <td>${DataProduct[i].Taxes}</td>
                    <td>${DataProduct[i].Ads}</td>
                    <td>${DataProduct[i].Discount}</td>
                    <td>${DataProduct[i].total}</td>
                    <td>${DataProduct[i].Category}</td>
                    <td> <i onclick="deleteProduct(${i})" class="fa-solid fa-trash"></i> <i onclick="UpdateProduct(${i})"  class="fa-solid fa-pen"></i> </td>
                  </tr>
              `;
      }
    }
  }
  TbodyTable.innerHTML = table;
}
