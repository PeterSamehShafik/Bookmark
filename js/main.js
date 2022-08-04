var bName = document.getElementById("bName");
var bURL = document.getElementById("bURL");
var sumbitBTN = document.getElementById("sumbitBTN");
sumbitBTN.addEventListener("click",add);
var deleteBTNs;
var errorField= Array.from( document.querySelectorAll(".error"));
var bookList;

if(localStorage.getItem("data")==null){
    bookList=[]
}else{
    bookList=JSON.parse(localStorage.getItem("data"));
    display(bookList)
}

function clear(){
    bName.value="";
    bURL.value="";
}

function add(){
    var bookObj={
        name:bName.value,
        URL:bURL.value
    };
    
    if(checkValidation(bookObj.URL)){
        bookObj.URL=modURL; //modfied with 'https'
        bookList.push(bookObj);
        localStorage.setItem("data",JSON.stringify(bookList));
        
        display(bookList);
        clear();
    }
}

function display(bookmarkeList){
    var box=``;
    for(var i=0; i<bookmarkeList.length; i++){
        box+=`
        <div class="bookmarked-item">
            <p>${bookmarkeList[i].name}</p>
            <div class="control-btns">
                <a class="btn" target="_blank" href="${bookmarkeList[i].URL}">Visit</a>
                <button class="btn btn-red deleteBTNs">Delete</button>
            </div>
        </div>
        `
    }
    document.querySelector(".bookmark-list").innerHTML=box;
    deleteBTNs= Array.from( document.querySelectorAll(".deleteBTNs"));
    
    for(let i=0;i<bookmarkeList.length;i++){ //var error!!
        deleteBTNs[i].addEventListener("click",function(){deleteFunc(i)});
    }
}

function deleteFunc(i){
    bookList.splice(i,1);
    deleteBTNs.splice(i,1);
    localStorage.setItem("data", JSON.stringify(bookList))
    display(bookList)
}


var modURL;
function checkValidation(URL){
    errorField[0].style.display="none";
    errorField[1].style.display="none";
    if(bName.value=="" || bURL.value=="")
    {
        if(bName.value=="" && bURL.value==""){
            errorField[0].style.display="block";
            errorField[1].style.display="block";
        }
        else if(bName.value==""){
            errorField[0].style.display="block";
        }
        else if(bURL.value==""){
            errorField[1].style.display="block";
        }
        return false;
    }
    
        //make the url start with https if it doesn't
        if(URL.startsWith("https")){
            modURL=URL; 
        }else{
            modURL="https://"+URL;
        }
        for(var i=0; i<bookList.length;i++){
            if(bookList[i].name.toLowerCase()==bName.value.toLowerCase() || bookList[i].URL.toLowerCase()==modURL.toLowerCase() ){
               errorField[0].style.display="block";
               errorField[0].innerHTML="already exits";
               return false;
            }
    }


        return true;
    
}