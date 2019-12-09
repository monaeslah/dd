function injectStyles(rule, id) {
    removeStyle(id);
     var div = $("<div />", {
       html: '<style id="' + id +'">' + rule + '</style>'
     }).appendTo("body");    
   }
   
   function removeStyle(id) {
     $('#'+id).remove();
   }
   
   $("#change").on("click", function() {
     injectStyles(`video::-webkit-media-controls-panel
     {
          display: none !important;
          opacity: 0 !important;
     }`, 'd');
   });
   
   $("#remove").on("click", function() {
     removeStyle('d');
   });