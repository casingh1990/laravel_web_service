window.URL = window.URL || window.webkitURL;
function setFileInfo(files) {
  var myVideos = [];
  $('#infos').html('');

  myVideos.push(files[0]);

  var video = document.createElement('video');
  var ext = $('#file').val().split('.').pop().toLowerCase();

  if($.inArray(ext, ['mp4']) == -1) {
      updateInfos("Only MP4 files allowed");
      return;
  }

  video.preload = 'metadata';
  video.onloadedmetadata = function() {
    window.URL.revokeObjectURL(this.src)
    var duration = video.duration;
    myVideos[myVideos.length-1].duration = duration;
    if ((parseFloat(duration) > 600)){
      updateInfos("Videos must be 10 minutes of shorter");
    }
  }
  video.src = URL.createObjectURL(files[0]);;
}

function updateInfos(info){
  $('#infos').html('<div class="alert alert-danger">' + info + '</div>');
}
