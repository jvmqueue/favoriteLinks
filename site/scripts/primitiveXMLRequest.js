var mainXMLRequest = (function(){
	var paths = {
		root:'http://127.0.0.1',
		port:'88',
		dir:'/data/',
		file:'dataB.xml',
		noCaching:new Date().getTime()
	};
	
    var strFilePath = paths.root + ':' + paths.port + paths.dir + paths.file + '?noCaching=' + paths.noCaching;
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
                    /* this is only a test here */
                    var demo = document.getElementsByTagName('body')[0];
                    /* assign the requests responseXML documentElement to a member-level variable so that we can access its nodes */
					xml.docElm = req.responseXML.documentElement;
                }
            };
            /* FIRING the onreadystatechange event */
            req.open('GET', strFilePath, true);
            req.send(null);
        }
    })();
})();
