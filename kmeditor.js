
$(function()
{
  var decorate = function(text, options)
  {
    text = marked(text);
    
    return text;
  };
  
  var loadRaw = function(raw, file)
  {
    var fr = new FileReader();
    fr.onload = function(e)
    {
      raw.innerText = fr.result;
      var event = document.createEvent('UIEvents'); 
      event.initEvent('x-kmeditor-update', false, false);
      
      raw.dispatchEvent(event);
    };
    
    fr.readAsText(file);
    
  };
  
  $(document).find('[data-kmeditor-container]').each(function()
  {
    var container = this;
    var raw = $('<div contenteditable="true" data-kmeditor-raw>')[0];
    var preview = $('<div data-kmeditor-preview>')[0];
    $(container).append(raw);
    $(container).append(preview);
    
    $(raw).on('input x-kmeditor-update', function()
    {
      preview.innerHTML = decorate(raw.innerText);
    });
    
    
    // TODO: テキストをドロップすると自動でDOMが構築される。text/plainのみにしたい
    $(container).on('drop', function(e)
    {
      var orge = e.originalEvent;
      if (0 < orge.dataTransfer.files.length)
      {
        orge.preventDefault();
        
        loadRaw(raw, orge.dataTransfer.files[0]);
      }
      /*else if (orge.dataTransfer.getData('text/html'))
      {
        orge.dataTransfer.clearData('text/html');
        orge.preventDefault();
      }*/
      else orge.preventDefault();
    });
  }
  );
  
});
