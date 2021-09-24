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
