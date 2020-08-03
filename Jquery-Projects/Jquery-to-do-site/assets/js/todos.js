
$('ul').on('click', 'li', function() {
    $(this).toggleClass("completed");
});

$('ul').on('click', 'span', function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").on("keypress", function(event) {
    if (event.key === "Enter"){
        let toDotext = $(this).val();
        $(this).val("");
        $('ul').append(`<li> 
           <span> <i class="fa fa-trash"> </i></span>
           ${toDotext} 
        </li>`)
    }
});

$('.fa-plus').on('click',  function () {
    $("input[type='text']").fadeToggle();
})
