// scrolling
let element = document.getElementById("selectGroupsId");

let scrollPageLeft = document.getElementById("scrollPageLeft");
scrollPageLeft.addEventListener("click", scrollLeft);

let scrollPageRight = document.getElementById("scrollPageRight");
scrollPageRight.addEventListener("click", scrollRight);

let widthOfCard = document.getElementsByClassName("group")[0].offsetWidth;
function scrollLeft(){
  element.scrollLeft = element.scrollLeft - (widthOfCard * 2);
}

function scrollRight(){
  element.scrollLeft = element.scrollLeft + (widthOfCard * 2);
}

//menu
let menuBar = document.getElementById("menu-bar");
menuBar.addEventListener("click", toggleMenu);

function toggleMenu(){
  let asideMenu = document.getElementById("side-menu");
  asideMenu.classList.toggle("show");
  let menuIcon = document.getElementById("menu-icon");
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-times");
}


//search 

function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
  clearTimeout(timer);
  timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
  }
  const waitForInput = debounce(() => searchOnTable());

function searchOnTable() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputGroupName");
  filter = input.value.toUpperCase();
  table = document.getElementById("groupTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("groupTable");
  switching = true;
  
  dir = "asc"; 
  
  while (switching) {
    
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      
      if (dir == "asc") {
        if(n==2){

          if ("G" == compareDates(x.innerHTML.toLowerCase() , y.innerHTML.toLowerCase())) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }

        }else{

          if (x.innerHTML.trim() > y.innerHTML.trim()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }

        }
      } else if (dir == "desc") {
        if(n==2){

          if ("L" == compareDates(x.innerHTML.trim() , y.innerHTML.trim())) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }

        }else{

          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }

        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function compareDates(date1,date2){
  let d1,d2;
  d1 = date1.split("/");
  d2 = date2.split("/");
  let g1 = new Date(d1[2],d1[1],d1[0]);
  // (YYYY-MM-DD)
  let g2 = new Date(d2[2],d1[1],d1[0]);
  if (g1.getTime() < g2.getTime())
      return "L";
  else if (g1.getTime() > g2.getTime())
      return "G";
  else
      return "E";
}

//check box
let checkbox = document.getElementById("checkboxId");
checkbox.addEventListener('change', function() {
  let childCheckBoxs = document.querySelectorAll(".subC");
 
  

  if (this.checked) {
    childCheckBoxs.forEach((cc) => {
      cc.checked = true;
    });
  } else {
    childCheckBoxs.forEach((cc) => {
      cc.checked = false;
    });
  }
});


//pagination 

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
var tabledata,noOfDatas;
loadJSON('data.json',
         function(data) { 
            //console.log(data);
          tabledata =  data;
            //loadTable(data,0,10);
          noOfDatas = Object.keys(tabledata).length;

          goToPage(tabledata,noOfDatas,0);
           
          paginationFooter(tabledata, noOfDatas);
        },
         function(xhr) { console.error(xhr); }
);


function paginationFooter(data,noOfDatas){
  let pageNumberCount = Math.ceil(noOfDatas / 10);
  let tablepageNo = document.getElementById('pageNo');
  let offset,a,limit=10,text;

  for (let i = 0; i < pageNumberCount ; i++) {

    offset = i * limit;
    text = document.createTextNode(i+1);
    a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("data-page-number", i);
    a.setAttribute("onclick", "loadTable("+JSON.stringify(data)+","+noOfDatas+","+offset+","+limit+",this)");
    a.classList.add("page-numbers");
    if(i == 0)
      a.classList.add("active")
    a.appendChild(text);
    tablepageNo.appendChild(a);
  }
}
function goToPage(data,numberOfDatas,goto){
  let limit = 10;
  let offset = goto * limit;
  loadTable(data,numberOfDatas,offset,limit)
}

function onChangeGoToPage(go){
  let goto = go - 1;
  let pageNumberCount = Math.ceil(noOfDatas / 10);
  if(pageNumberCount < goto){
    console.log("invalid go to");
    return;
  }
  let limit = 10;
  let offset = goto * limit;
  loadTable(tabledata,noOfDatas,offset,limit)
}

function loadTable(tableData = [],noOfDatas=0,offset=0,limit=10,button){
  if(button)
    button.classList.add("visited");



  backBtn=document.getElementById("backBtn")
  let backBtnOffset = offset-10;
  if(backBtnOffset<0){
    backBtnOffset = 0;
  }
  backBtn.setAttribute("onclick", "loadTable("+JSON.stringify(tableData)+","+noOfDatas+","+ backBtnOffset +","+limit+")");
  let tableDataLen = noOfDatas;
  if(offset > tableDataLen){
    console.log("invalid offset")
    return
  }

  nextBtn=document.getElementById("nextBtn")
  let nextBtnOffset = offset+10;
  if(nextBtnOffset>noOfDatas){
    nextBtnOffset = 0;
  }
  nextBtn.setAttribute("onclick", "loadTable("+JSON.stringify(tableData)+","+noOfDatas+","+ nextBtnOffset +","+limit+")");
  tableDataLen = noOfDatas;
  if(offset > tableDataLen){
    console.log("invalid offset")
    return
  }

  if(limit > (tableDataLen - offset))
    limit = tableDataLen - offset;
  
  let table = document.getElementById('groupTableBody');
  table.innerHTML = '<tr><td colspan=4 style="text-align: center;">Loading..</td>';

  if(tableDataLen)
    table.innerHTML = '';

  let showing = document.getElementById("showing");
  showing.innerHTML = "Showing "+offset+" - "+ Math.ceil(limit + offset);
 
  setActivePageNumber(Math.ceil(limit + offset));
    
  let tdText1,tdText2,tdText3,tdText4;
  for (let i = offset; i < limit + offset ; i++) {

    tdText1 = tableData[i][0];
    tdText2 = tableData[i][1];
    tdText3 = tableData[i][2];
    tdText4 = tableData[i][3];
  
    let tr = document.createElement('tr');
  
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    td1.classList.add("checkboxGroupNameWidth");
    td2.classList.add("groupOwnerHid");
    td3.classList.add("createdDateHid");
    td4.classList.add("actions");

    let inputCheckBox = document.createElement('INPUT');
    inputCheckBox.setAttribute("type", "checkbox");
    inputCheckBox.classList.add("checkbox","subC");

    let inputBtn = document.createElement('button');
    inputBtn.classList.add("joinBtn");

    let span = document.createElement("span");
    span.classList.add("imageText")

    let span2 = document.createElement("span");
    span2.classList.add("imageText")

    let span3 = document.createElement("span");

    let img = document.createElement("img");
    img.setAttribute("src", "images/groupLogo.svg");
    img.setAttribute("alt", "groupLogo");
    img.classList.add("groupLogotable")

    let img2 = document.createElement("img");
    img2.setAttribute("src", "images/userIcon.svg");
    img2.setAttribute("alt", "userIcon");
    img2.classList.add("userIcon")

    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.classList.add("groupNameLink")

    let a2 = document.createElement("a");
    a2.setAttribute("href", "#");
  
    var text1 = document.createTextNode(tdText1);
    var text2 = document.createTextNode(tdText2);
    var text3 = document.createTextNode(tdText3);
    var text4 = document.createTextNode(tdText4);

    span.appendChild(img);
    a.appendChild(text1);
    span.appendChild(a);

    td1.appendChild(inputCheckBox);
    td1.appendChild(span);


    span2.appendChild(img2);
    a2.appendChild(text2);
    span2.appendChild(a2);

    td2.appendChild(span2);

    td3.appendChild(text3);

    span3.appendChild(text4);
    inputBtn.appendChild(span3)
    td4.appendChild(inputBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  
    table.appendChild(tr);
  }
}

function setActivePageNumber(offset){
let ofst = Math.ceil(offset / 10);
let pageNos = document.querySelectorAll(".page-numbers");

  for(let j=0; j < pageNos.length; j++){
    pageNos[j].classList.remove("active");
    if(j == ofst-1)
      pageNos[j].classList.add("active");
  }

}

// scrolling pagination
let pageNo = document.getElementById("pageNo");

let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", scrollLeftPageNo);

let nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", scrollRightPageNo);

let widthOfpagenumber = 10;
function scrollLeftPageNo(){
  pageNo.scrollLeft = element.scrollLeft - (widthOfpagenumber * 2);
}

function scrollRightPageNo(){
  pageNo.scrollLeft = element.scrollLeft + (widthOfpagenumber * 2);
}
