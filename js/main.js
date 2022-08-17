var productName= document.getElementById("productName");
var productPrice= document.getElementById("productPrice");
var productCategory= document.getElementById("productCategory");
var productDescription= document.getElementById("productDescription");
var addBtn= document.querySelector("#addProduct");
var clearBtn= document.querySelector("#clearForm");
var updateBtn= document.querySelector("#addUpdate");
var productList= [];
var copyIndex;

if(localStorage.getItem("myProduct") != null){
    productList = JSON.parse(localStorage.getItem("myProduct"));
    display(productList)
}
else{
    productList= []
}
addBtn.addEventListener('click', addProduct)
function addProduct(){
    var product={
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    };
    productList.push(product);
    localStorage.setItem("myProduct", JSON.stringify(productList));
    display(productList);
    clearInput();
}
clearBtn.addEventListener('click', clearInput)
function clearInput(){
    productName.value = '';
    productPrice.value = '';
    productDescription.value = '';
}

function updateProduct(list){
    productName.value = productList[list].name;
    productPrice.value = productList[list].price;
    productCategory.value = productList[list].category;
    productDescription.value = productList[list].desc;
    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
    copyIndex = list;
}
updateBtn.addEventListener('click', addUpdate);
function addUpdate(){
    productItem={
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    };
    productList[copyIndex] = productItem;
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    localStorage.setItem("myProduct", JSON.stringify(productList));
    display(productList);
    clearInput();
}
function deleteProduct(list){
     productList.splice(list,1);
     localStorage.setItem("myProduct", JSON.stringify(productList));
    display(productList);
}
function searchProduct(term){
    box = [];
    for(var i=0; i < productList.length; i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase())){
            box.push(productList[i])
        }
    }
    display(box)

}

function display(list){
    var box = ``;
    for(var i=0; i< list.length; i++){
        box += `
                <tr>
                    <td>${i}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].desc}</td>
                    <td><button class="btn btn-sm btn-warning" onclick="updateProduct(${i})">Update</button></td>
                    <td><button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`
    }
    document.getElementById("tableBody").innerHTML= box

}


