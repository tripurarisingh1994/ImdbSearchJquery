$(document).ready(function () {
    $('#search_btn').prop('disabled', true);
    $('#search_key').focus();
    $('#year-col').css('display', 'none');

    $('#select_type').change(function () {

        if ($('#select_type').val() == 'id') {
            $('#result').empty();
            $('#year-col').css('display', 'none');
            $('#search_key').attr('placeholder', 'Imdb Id')
            $('#search_key').focus();
        }
        else {
            $('#result').empty();
            $('#year-col').css('display', 'block');
            $('#search_key').attr('placeholder', 'Movie Title');
            $('#search_key').focus();
        }
    });

    $('#search_key').keyup(function () {
        if ($(this).val().length > 1) {
            $('#search_btn').prop('disabled', false);
        }
        else {
            $('#search_btn').prop('disabled', true);
        }
    });

    $('#search_btn').click(function () {
        $('#result').empty();
        let url = '';

        if ($('#select_type').val() == 'id') {

            let searchKey = $('#search_key').val();

            url = `https://www.omdbapi.com/?i=${searchKey}&apikey=2a153d57`;
        }
        else {

            let searchKey = $('#search_key').val();
            let searchYear = $('#select_year').val();

            if (!searchYear) {
                url = `https://www.omdbapi.com/?t=${searchKey}&apikey=2a153d57`;
            }
            else {
                url = `https://www.omdbapi.com/?t=${searchKey}&y=${searchYear}&apikey=2a153d57`;
            }

        }


        let settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "GET",
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            let image='';
            if (response.Response == 'True') {

                if (response.Poster == 'N/A') {
                    image = 'assets/img/dummy_poster.png';
                }
                else {
                    image = response.Poster;
                }

                let card = `<div class="row" style="margin:0px;padding:20px;">
                <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4" style="padding:0px;">
                    <div style="background-image:url(&quot;${image}&quot;);height:50vh;background-repeat:no-repeat;background-size:cover;background-position:center;"></div>
                </div>
                <div class="w-100 d-sm-block d-md-none d-lg-none d-xl-none"></div>
                <div class="col" style="padding:0px;">
                    <div class="card">
                        <div class="card-body" style="height:50vh;">
                            <h4 class="card-title">${response.Title}&nbsp;&nbsp;&nbsp;(${response.Year})</h4>
                            <h6 class="text-muted card-subtitle mb-2">R |&nbsp;<span>${response.Runtime}</span>&nbsp; |&nbsp;<span>${response.Genre}</span></h6>
                            <h6>Rating &nbsp;<span>${response.imdbRating}</span>&nbsp;</h6>
                            <p class="card-text">${response.Plot}</p>
                            <h6>Director:&nbsp;<span>${response.Director}</span>&nbsp; &nbsp;| &nbsp;Starts: &nbsp;<span>${response.Actors}</span></h6>
                            <h6>Votes: &nbsp;<span>${response.imdbVotes}</span>&nbsp;</h6>
                        </div>
                    </div>
                </div>
            </div>`;


                $('#result').append(card);
            }
            else if (response.Response == 'False') {
                $('#result').append(`<h3 style="text-align:center;margin-top:10%;">${response.Error}</h3>`);
            }

        });
    });
});