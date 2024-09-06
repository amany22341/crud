let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let catetory =document.getElementById("catetory");
let submit =document.getElementById("submit");
let btndeleteall=document.getElementById("deleteall");
let alert=document.getElementById("alertt");
let mood="Create"
let id 
let moodsearch='title';


// get total
// --------------------------------
function getTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML= result;
        total.style.backgroundColor="#040"
    }else{
        total.innerHTML='';
        total.style.backgroundColor="#a00d02"

        
    }
  
}

// save product in localstorage
// ======================================
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[]
}
// create function add product();
// ------------------------------------------
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catetory:catetory.value.toLowerCase(),
    }

if(title.value != ''&& price.value != '' && catetory.value != '' && count.value < 100){
    
    if(mood === 'Create'){
        if(newpro.count > 1){
            for(let i =0; i<newpro.count ;i++ )
                datapro.push(newpro)
        }else{
            datapro.push(newpro)
        }
    }else{
        datapro[id]=newpro;
        submit.innerHTML="create"
        count.style.display="block"
        getTotal()

    }
    cleardata()

}else{
    console.log("please enter your data");
    console.log(alert);
    
    alert.innerHTML=`<div class="alert">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    please enter your all data and count less than 100 </div>`
}
    localStorage.setItem('product', JSON.stringify(datapro))
    getTotal()
    showdata()
}

// create function cleardata()
// ------------------------------------------
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    catetory.value='';
}
// create function showdata()
// ------------------------------------------
function showdata(){
    let table=``;

    for(let i=0 ; i< datapro.length ; i++){
        // console.log(i);
        
        table +=`
        <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].catetory}</td>
                        <td><button id="update" onclick="updatadata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>
        `
    }
    document.getElementById("body").innerHTML=table
    if(datapro.length > 0){
        // console.log(btndeleteall);
        btndeleteall.innerHTML=`<button onclick="deletall()"> DeleteAll ( ${datapro.length} )</button>`;
    }else{
        btndeleteall.innerHTML=``;

    }
}
// create function deletedata()
// ------------------------------------------
function deletedata(i){
    datapro.splice(i ,1);
    localStorage.product=JSON.stringify(datapro);
    showdata();
}

// create deleteall()
// -------------------------------
function deletall(){
    localStorage.clear();
    datapro.splice(0);
    showdata()
}

// create function updatadata
// --------------------------------------
function updatadata(i){
    
    id=i;
    title.value=datapro[i].title
    price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    getTotal();
    total.value=datapro[i].total
    count.value=datapro[i].count
    catetory.value=datapro[i].catetory
    
    count.style.display="none"
    submit.innerHTML="updata"
    submit.style.backgroundColor="#52066f"
    mood="updata";
    scroll({
        top:0,
        behavior:'smooth'

    })
    showdata()
    // getTotal()

    }

    // create function search
    // -------------------------------
    let search=document.getElementById("search")

function getsearchmood(id){
    if(id === 'searchtitle'){
        moodsearch="title";
    }else{
        moodsearch="category";
    }
    search.placeholder="search by "+moodsearch

    search.focus();

    search.value=''
    searchtitle.innerHTML=`search by title`
    searchcategory.innerHTML=`search by category`



    showdata()

} 


function searchdata(value){
    let counttitle=0;
    let countcat=0;
    let table=``;
    for(let i=0 ; i<datapro.length ;i++){

    if(moodsearch=="title" ){
            if(datapro[i].title.includes(value.toLowerCase())){
                counttitle++
                table +=`
                 <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].catetory}</td>
                        <td><button id="update" onclick="updatadata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `
            }
            searchtitle.innerHTML=`search by catogery(${count})`


        
    }else{
            if(datapro[i].catetory.includes(value.toLowerCase())){
                countcat++
                table +=`
                 <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].catetory}</td>
                        <td><button id="update" onclick="updatadata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `
            }
            searchcategory.innerHTML=`search by catogery(${countcat})`
        
    }
}
    searchtitle.innerHTML=`search by title(${counttitle})`

    document.getElementById("body").innerHTML=table
    console.log(counttitle);
}

showdata()













