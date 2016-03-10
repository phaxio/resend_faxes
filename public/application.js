$(document).ready(function() {
  $('#resendFaxes').on('submit', function() {
   var form = $(this);

    $.ajax({
      url: '/resend_faxes',
      type: 'POST',
      data: $(this).serializeArray()
    })

      .done(function(_data) {
        $('#resendResults td').remove();
        var data = JSON.parse(_data);
        for (var i = 0; i < data.length; i++) {
          var result = data[i];

          var row = $(
            '<tr>' +
              '<td>' + result['success'] + '</td>' +
              '<td>' + result['message'] + '</td>' +
              '<td>' + result['faxId']   + '</td>' +
            '</tr>'
          )
          $('#resendResults tbody').append(row);
        }
      });

    return false;
  });
});
