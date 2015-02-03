var XML = {
	cache:{
		docElement:{
			node:false,
			firstChilds:[]
		}
	}
};
var main = (function(){
	var paths = {
		root:'./data/',
		dir:'',
		file:'data.xml',
		noCaching:'?noCaching=' + new Date().getTime()
	};
	
	var strLocation = window.location.toString();	
	var blnIsProjects = !!strLocation.match(/(project{1,2})/);
	
	paths.file = blnIsProjects == true ? 'dataProjects.xml' : paths.file;
	
	var strFilePath = '';
	for(var val in paths){
		strFilePath += paths[val];
	}
	var httpReq = null;

	var loadcode = (function(){
        /* instantiate the request object XMLHttpRequest */
        var req = new XMLHttpRequest();
        /* test for existence of the request object */
        if(req){
            /* HEADS UP: events have to be defined before they are fired */
            /* request objects have an onreadystatechange event */
            /* assign the request onreadystatechange to a function literal nesting access methods */
            req.onreadystatechange = function(){
                /* test requests ready state is finished AND either request status OK OR request status no change */
                if(req.readyState == 4 && (req.status == 200 || req.status == 304)){					
                    /* assign the requests responseXML documentElement to a member-level variable so that we can access its nodes */
					XML.cache.docElement.node = req.responseXML.documentElement;
                }
            };
            /* FIRING the onreadystatechange event */
            req.open('POST', strFilePath, true);
            req.send(null);
        }
    })();	
})();
