  // project
  const categoryTitle = document.querySelectorAll('.category-title');
  const allCategoryPosts = document.querySelectorAll('.all');
  
  for(let i = 0; i < categoryTitle.length; i++){
      categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
  }
  
  function filterPosts(item){
      changeActivePosition(item);
      for(let i = 0; i < allCategoryPosts.length; i++){
          if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
              allCategoryPosts[i].style.display = "block";
          } else {
              allCategoryPosts[i].style.display = "none";
          }
      }
  }
  
  function changeActivePosition(activeItem){
      for(let i = 0; i < categoryTitle.length; i++){
          categoryTitle[i].classList.remove('active');
      }
      activeItem.classList.add('active');
  };
  

















// navbar style
function navSlide() {
     const burger = document.querySelector(".burger");
     const nav = document.querySelector(".nav-links");
     const navLinks = document.querySelectorAll(".nav-links li");
     
     burger.addEventListener("click", () => {
         //Toggle Nav
         nav.classList.toggle("nav-active");
         
       
         //Burger Animation
         burger.classList.toggle("toggle");
     });
     
 }

// navbar's underline change on scroll
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("#my_navbar .nav-links li");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("myNavActive");
    if (li.classList.contains(current)) {
      li.classList.add("myNavActive");
    }
  });
});


// navbar scroll fixed
 
 $(document).ready(function() {
   
    $(window).scroll(function () { 
     var height =$('#particles-js').height();
      // console.log($(window).scrollTop());
  
      if ($(window).scrollTop() > height+10) {
        $('#my_navbar').addClass('fixed');
      }
  
      if ($(window).scrollTop() < height) {
        $('#my_navbar').removeClass('fixed');
      }
    });
  });


  // fadup al items
  AOS.init({
    duration: 1000,
    offset: 150,
    once: true,
  });
 navSlide();



 $('.targetDiv').hide();
 function showDec(id){
  console.log(id);
  $('.targetDiv').hide();
  $('#'+id).show();

 }


 $('.hide').click(function () {
  $('.targetDiv').hide();

});

 
var myTree = new ECOTree("myTree","myTreeContainer");
myTree.add(0,-1,"Apex Node");
myTree.add(1,0,"Left Child");
myTree.add(2,0,"Right Child");
myTree.UpdateTree();