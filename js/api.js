(function($) {
    'use strict';

    // remove this body append code, just for initial test
    $('body').append('js file is working');

    /**
     * Ajax-based random post fetching & History API
     */

    $('#new-quote-button').on('click', function(event) {
        event.preventDefault();
        //write ajax for get request

        $.ajax({
            method: 'GET',
            url: api_vars.root_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            cache: false,
        }).done(function(data) {
            console.log(data);
            //append the data to html,

        }).fail(function() {

        });
    });

    //take a look at the wp javascript slides for post request
    /**
     * Ajax-based front-end post submissions.
     */

})(jQuery);