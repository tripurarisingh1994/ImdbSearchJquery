$(document).ready(function() {
        $('#search_btn').prop('disabled', true);
        $('#search_key').focus();
        $('#year-col').css('display','none');

    let yearList = [
        1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929,
        1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939,
        1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949,
        1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
        1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
        1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
        1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
        1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
        2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019
    ];

    yearList.forEach(year => {
       $('#select_year').append('<option value="'+year+'">'+year+'</option>');
    });


    $('#select_type').change(function() {

        if($('#select_type').val()=='id') {

            $('#year-col').css('display','none');
            $('#search_key').attr('placeholder','Imdb Id')
            $('#search_key').focus();
        }
        else {
            $('#year-col').css('display','block');
            $('#search_key').attr('placeholder','Movie Title');
            $('#search_key').focus();
        }
    });

    $('#search_key').keyup(function() {
        if($(this).val().length > 3) {
           $('#search_btn').prop('disabled', false);
        }
        else {
            $('#search_btn').prop('disabled', true);
        }
     });

    $('#search_btn').click(function() {

        let url = '';

            if($('#select_type').val()=='id') {

                let searchKey = $('#search_key').val();
                console.log(searchKey);

              url:`http://www.omdbapi.com/?i=${searchKey}&apikey=2a153d57`;
            }
            else {

                let searchKey = $('#search_key').val();
                let searchYear = $('#select_year').val();

                console.log(searchKey);
                console.log(searchYear);

                url:`http://www.omdbapi.com/?t=${searchKey}&y=${searchYear}&apikey=2a153d57`;
            }

            let settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": "GET",
                "headers": {
                  "cache-control": "no-cache",
                }
              }
              
              $.ajax(settings).done(function (response) {
                console.log(response);
              });
    });
});