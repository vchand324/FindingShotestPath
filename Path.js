function path_f(current){
    
    var path =[]
    var temp = current
    path.push(temp)

    while(temp.previous){
        path.push(temp.previous)
        temp = temp.previous
    }
    return path

}

function length(path){
    
    var i=0
    var len=0

    while (i<path.length-1){
        if (((path[i].c-path[i+1].c)**2 + (path[i].r-path[i+1].r)**2) == 2 ){
            len=len+Math.sqrt(2)
        }
        else{
            len=len+1
        }
        i++
    }
    return len

}


function remove(openList,current){
    
    for(var i=openList.length-1;i>=0;i--){
        if(openList[i] == current){
            openList.splice(i,1)
        }
    }

}
