//open respective modals//
$('.openModal').on('click', function () {

    $('.noteForm').empty();
    let id = $(this).attr('data-target');
    console.log(id);
    $(id).modal('show');

});

$('.openNotes').on('click', function () {
    $('.noteError').hide();
    let id = $(this).attr('data-target');
    console.log(id);
    $(id).modal('show');

});


//get new articles//
$('#scrape').on('click', () => {
    $.ajax({
        method: 'GET',
        url: '/scrape/'
    }).then(function (data) {

    });

});

//note submit//
$('.submitForm').on('click', function (event) {
    event.preventDefault();
    let id = $(this).attr('id');
    let formNameCall = "#formName" + id;
    let formNoteCall = "#formNote" + id;
    let name = $(formNameCall).val();
    console.log(name)
    let note = $(formNoteCall).val();
    console.log(note)
    let newNote = {
        name: name,
        note: note
    };
    $.ajax({
        method: 'POST',
        url: '/articles/' + id,
        data: newNote
    }).then(function (data) {
        console.log(data)
        $('.modal').modal('hide')
        $('.noteForm').empty();
    });


})

$('.deleteNoteButton').on('click', function () {
    id = $(this).attr('data-id');
    $.ajax({
        method: 'DELETE',
        url: '/deleteNote/' + id
    }).then(function (data) {
        $("#" + id).remove()
    });

})