$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log("Submit error(s).");
            console.log(error);
        },
        submitSuccess: function($form, event) {

            console.log("Submit succeeded.");

            var opts = {
              lines: 12 // The number of lines to draw
            , length: 7 // The length of each line
            , width: 3 // The line thickness
            , radius: 7 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute'
            , top: '50%'
            }

            var spinner = new Spinner(opts).spin();
            var target = $("#sendMailBtn");
            target.append(spinner.el);
            $(".spinner").css("left", "200px");

            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();


            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            emailjs.init("user_nAp4KshFufj6TN0ttH5AM");
            emailjs.send("gmail", "template_AVIG2s7C", {"reply_to":email,"from_name":name,"phone":phone,"message":message})
            .then(function(response) {
              // Enable button & show success message
              $("#btnSubmit").attr("disabled", false);
              $('#success').html("<div class='alert alert-success'>");
              $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
              $('#success > .alert-success')
                  .append("<strong>Your message has been sent. </strong>");
              $('#success > .alert-success')
                  .append('</div>');

              //clear all fields
              $('#contactForm').trigger("reset");

              spinner.stop();

            }, function(err) {
              // Fail message
              $('#success').html("<div class='alert alert-danger'>");
              $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
              $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
              $('#success > .alert-danger').append('</div>');
              //clear all fields
              $('#contactForm').trigger("reset");
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
