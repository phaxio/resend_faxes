function resendFaxes(formData) {
  var apiKey = fetchValue(formData, 'api_key');
  var apiSecret = fetchValue(formData, 'api_secret');
  var faxIdsString = fetchValue(formData, 'fax_ids');
  var faxIds = getFaxIds(faxIdsString);
  for (var i = 0; i < faxIds.length; i++) {
    var faxId = faxIds[i];
    resendFax(apiKey, apiSecret, faxId);
  }
}

function resendFax(apiKey, apiSecret, faxId) {
  $.ajax({
    url: '/resend_faxes',
    type: 'POST',
    data: serializeData(apiKey, apiSecret, faxId)
  })
    .done(function(_data) {
      var data = JSON.parse(_data);
      var result = data[0];

      var row = $(
        '<tr>' +
          '<td>' + result['success'] + '</td>' +
          '<td>' + result['message'] + '</td>' +
          '<td>' + result['faxId']   + '</td>' +
        '</tr>'
      );

      if (!(result['success'])) { row.addClass('failed'); }

      $('#resendResults tbody').append(row);
    });
}

function fetchValue(formData, attrName) {
  return formData.filter(function(formObject) {
    return formObject.name === attrName;
  })[0].value;
}

function getFaxIds(faxIdsString) {
  return faxIdsString.split("\r\n");
}

function serializeData(apiKey, apiSecret, faxId) {
  return [
    { name: 'api_key', value: apiKey },
    { name: 'api_secret', value: apiSecret },
    { name: 'fax_ids', value: faxId }
  ];
}

$(document).ready(function() {
  $('#resendFaxes').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    resendFaxes(form.serializeArray());
  });

  $('#clearResults').on('click', function(event) {
    event.preventDefault();
    $('#resendResults tbody tr').remove();
  });
});
