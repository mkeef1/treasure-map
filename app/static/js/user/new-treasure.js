/* jshint unused:false, camelcase:false */
/* global AmCharts:true, google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTres);
  });

  function addTres(e){
    var lat = $('#lat').val();

    if(!lat){
      var spot = $('#spot').val();
      geocode(spot);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var spot = results[0].formatted_address,
          lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng();
      $('#spot').val(spot);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();

    });
  }
})();
