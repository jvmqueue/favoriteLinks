var utils = {
    listeners:{
        add:function(parmEvent, parmNodeHTML, parmURL){
            var blnHasEventListener = window.addEventListener ? true : false;
            if(blnHasEventListener == true){
                parmNodeHTML.addEventListener(parmEvent, function(){
                    prompt('local path', parmURL);
                }, false);
            }else{
                parmNodeHTML.attachEvent('on'+parmEvent, function(){
                    prompt('local path', parmURL);
                });
           }
        }    
    }
};