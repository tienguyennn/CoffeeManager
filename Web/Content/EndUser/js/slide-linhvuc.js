//--------------------------SLIDE LĨNH VỰC VÀ DỰ ÁN -----------------------------------------------------
$(document).ready(function(){

$('#itemslider').carousel({ interval: 3000 });

$('.carousel-showmanymoveone .item').each(function(){
var itemToClone = $(this);

for (var i=1;i<4;i++) {
itemToClone = itemToClone.next();

if (!itemToClone.length) {
itemToClone = $(this).siblings(':first');
}

itemToClone.children(':first-child').clone()
.addClass("cloneditem-"+(i))
.appendTo($(this));
}
});

//----------------------------------SLIDE THÀNH VIÊN-----------------------------------------------

$('#itemslider-member').carousel({ interval: 3000 });

$('.showmanymoveone .item').each(function(){
var itemToClone = $(this);

for (var i=1;i<5;i++) {
itemToClone = itemToClone.next();

if (!itemToClone.length) {
itemToClone = $(this).siblings(':first');
}

itemToClone.children(':first-child').clone()
.addClass("cloneditem-"+(i))
.appendTo($(this));
}
});
});
//------------------------------------------slide phân khúc-----------------------
$('#itemslider-phankhuc').carousel({ interval: 3000 });

$('.showmanymoveone .item').each(function(){
var itemToClone = $(this);

for (var i=1;i<5;i++) {
itemToClone = itemToClone.next();

if (!itemToClone.length) {
itemToClone = $(this).siblings(':first');
}

itemToClone.children(':first-child').clone()
.addClass("cloneditem-"+(i))
.appendTo($(this));
}
});

