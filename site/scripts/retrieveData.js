var element = {
    event:{
        add:function(parmNodeHTML, parmNodeXML){
            var type = parmNodeXML.getAttribute('type') || false;
			var strAccessKey = parmNodeXML.getAttribute('accesskey') || '';
            if(!type){return void(0);}
            var url = parmNodeXML.firstChild.nodeValue;            
            switch(type){
                case 'url':
                    parmNodeHTML.setAttribute('href', url);
					if(strAccessKey != ''){
						parmNodeHTML.setAttribute('accesskey', strAccessKey);
					}					
                    break;
                case 'file':
                    utils.listeners.add('click', parmNodeHTML, url);
                    break;				
                case 'text':
                    /* TODO: use listeners.add:function(parmEvent, parmNode) to define click event that will open window */
                    break;                                
                default:
                    throw new Error('events.node discovered undefinded case in switch type:\t' + type);
            }
        }
    }
};
var ObjHTMLData = function(parmTwoDimArr){
		var HTMLNodeContainer = document.getElementById('container');
        var node = {frag:document.createElement('dl'), header:null, headerSpan:null, neu:null, anchor:null, text:null, xml:null};
        var twoDimArrLength = parmTwoDimArr.length;
        
		for(var i = 0; i < twoDimArrLength; i++){
			node.header = document.createElement('dt');
			node.text = document.createTextNode(parmTwoDimArr[i][0].getAttribute('cat'));
            node.headerSpan = document.createElement('span');
            node.headerSpan.appendChild(node.text);
			node.header.appendChild(node.headerSpan);
			var j = 0;
			while(!!parmTwoDimArr[i][j] && parmTwoDimArr[i][j] !== null){
				node.xml = parmTwoDimArr[i][j++];
				node.neu = document.createElement('dd');
				node.anchor = document.createElement('a');
                element.event.add(node.anchor, node.xml);
				node.text = document.createTextNode(node.xml.getAttribute('desc'));
				node.anchor.appendChild(node.text);
				node.neu.appendChild(node.anchor);
				node.header.appendChild(node.neu);
			}
			node.frag.appendChild(node.header);
		}
		HTMLNodeContainer.appendChild(node.frag);
};
var ObjXMLData = function(){
	this._setCacheChilds();
	this.childs = [];
	this._setLocalXMLArray();
};
ObjXMLData.prototype = {
	_setCacheChilds:function(){
		XML.cache.docElement.firstChilds = XML.cache.docElement.node.getElementsByTagName('site');
	},
	_setLocalXMLArray:function(){
		var xml = {currentNode:null, currentAttribute:''}
		var intCounter = 0;
		
		var intNumberCategories = 0;
		var intArrayRow = 0;
		var intArrayCol = 0;
		var len = XML.cache.docElement.firstChilds.length;
		/* go through each site node in XML */
		for(var i = 0; i < len; i++){
			/* we need a two-dimensional array to index XML nodes for each category */
			/* the model: row is category column is nodes in that category */
			this.childs[intArrayRow++] = [];
			intNumberCategories = intCounter;
			/* access the next XML site node */
			xml.currentAttribute = XML.cache.docElement.firstChilds[i].getAttribute('cat');
			/* optimization: increment intCounter only when condition is satisfied AND maintain intCounter state for each i counter */
			intArrayCol = 0;
			/* loop through each node in XML until find no match to xml.currentAttribute */
			while(!!XML.cache.docElement.firstChilds[intCounter] &&  xml.currentAttribute === XML.cache.docElement.firstChilds[intCounter].getAttribute('cat')){
				this.childs[intArrayRow-1][intArrayCol++] = XML.cache.docElement.firstChilds[intCounter];
				intCounter++;
			}
			/* optimization: increment i to where while loop let off. This is the node AFTER the last XML node that DID NOT satisfied the while condition */
			i = intCounter - 1;
		}
	},
	getLocalXMLArray:function(){
		return this.childs;
	}
};

var contollerData = (function(parmDelay){
	var controllerInterval = setInterval(function(){		
        /* pseudo-listener continue to execute interval until XML data AND HTML DOM become available */
		if( !!document.getElementById('container') && !!XML.cache.docElement.node ){
			clearInterval(controllerInterval);
			var objXMLData = new ObjXMLData();
			var xmlNodes = objXMLData.getLocalXMLArray();
			var objHTMLData = new ObjHTMLData(xmlNodes);
		}
	}, parmDelay);
})(44);