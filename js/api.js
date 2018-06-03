(function($) {
    'use strict';
    var lastPage = '';

    /**********************************************************
     * receiving post
     *********************************************************/

    $('#new-quote-button').on('click', function(evt) { //btn event listener
        evt.preventDefault();
        //write ajax for get request

        $.ajax({
            method: 'GET',
            url: api_vars.root_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1', //getting one post randomly
            cache: false
        }).done(function(data) {
            // console.log('button clicked to get posts');
            $('.entry-content').html(data[0].content.rendered);
            // console.log(data[0]);
            if (data[0]._qod_quote_source !== '' && data[0]._qod_quote_source_url !== '') { //if there is a url for source
                $('.entry-title').html('&mdash;' + '&nbsp;' + data[0].title.rendered + ',  ');
                $('.source').html('<a href="' + data[0]._qod_quote_source_url + '" alt="Quote Source">' + data[0]._qod_quote_source + '</a>');
            } else if (data[0]._qod_quote_source !== '') { //if there is not a url for source
                $('.entry-title').html('&mdash;' + '&nbsp;' + data[0].title.rendered + ',  ');
                $('.source').html(data[0]._qod_quote_source);
            } else {
                $('.entry-title').html('&mdash;' + '&nbsp;' + data[0].title.rendered);
                $('.source').empty();
            }

            lastPage = document.URL;

            history.pushState(null, null, data[0].slug); //keeping the history of the slug

        }).fail(function() {
            $('.site-main').html('Sorry! the post could not be received. Please try again.')
        });
    });

    /*****************************************************
     * submitting post
     *****************************************************/

    $('#quote-submission-form').submit(function(event) {
        event.preventDefault();

        $.ajax({
                method: 'POST',
                url: api_vars.root_url + 'wp/v2/posts/',
                data: {
                    title: $('#quote-author').val(),
                    content: $('#quote-content').val(),
                    _qod_quote_source: $('#quote-source').val(),
                    _qod_quote_source_url: $('#quote-source-url').val(),
                    status: 'pending'
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce); //checking for user Authentication
                }
            })
            .done(function() {
                $('#quote-submission-form').slideUp('slow');
                $('.quote-submission-wrapper').append('<p>' + api_vars.success + '</p>');
            })
            .fail(function() {
                $('#quote-submission-form').append('<p>' + api_vars.failure + '</p>');
            })
    });


    $(window).on('popstate', function() {
        window.location.replace(lastPage);
    });


})(jQuery);