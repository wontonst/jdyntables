var jdyntable = {
    verbose: true,

    debug: function(text){
	if(this.verbose)
	    console.log(text);
    },

    load: function(){
	jdyntable.debug("jdyntable.load: beginning table loading");
	$('table.jdyntable').each(function(index){
	    jdyntable.debug("loading table "+$(this).attr('request')+"...");
	    var url = $(this).attr('url');
	    var request = $(this).attr('request');  
	    
	    var table = $(this);

	    $.post(url,
		   {
		       request:request,
		       action:"pull"
		   },
		   function(html,status)
		   {
		       var data = JSON.parse(html);
		       jdyntable.debug(html);
		       var thead = document.createElement("thead");
		       var tbody = document.createElement("tbody");
		       var tr = document.createElement("tr");
		       for(var i = 0; i != data.title.length; i++){
			   var th = document.createElement("th");
			   th.innerHTML = data.title[i];
			   tr.appendChild(th);
		       }
		       thead.appendChild(tr);
		       for(var i = 0 ; i != data.table.length; i++)
		       {
			   tr = document.createElement("tr");
			   var temp = jdyntable.newHiddenInput(data.table[i][0]);
			   tr.appendChild(temp);
			   for(var ii = 1; ii != data.table[i].length; ii++)
			   {
			       var th = document.createElement("th");
			       th.innerHTML = data.table[i][ii];
			       tr.appendChild(th);
			   }
			   tbody.appendChild(tr);
		       }
		       table.append(thead);
		       table.append(tbody);
		       jdyntable.debug(table.text());
		       jdyntable.debug(table.attr('request')+" loading complete");
		   });
	});
    },
    
    add:function()
    {
	
    },
    
    remove:function()
    {
	
    },
    newHiddenInput:function(value)
    {
	var input = document.createElement("input");
	input.value=value;
	input.type="hidden";
	return input;
    }
    
};
$(document).ready(function(){
    jdyntable.load();
});
