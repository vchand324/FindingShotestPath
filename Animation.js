function closed(closedList,path){

    var i=0
    
    let timerId= window.setInterval(function(){      
        if(i === closedList.length){
            i=0
            clearInterval(timerId)
        }else{
            if(!path.includes(closedList[i])){
               closedList[i].state='p'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
            }
        }
        i++
    },10)

}

function open(openList,closedList,path){

    var j=0
    
    let timerId1= window.setInterval(function(){
        if(j === openList.length){
            j=0
            clearInterval(timerId1)
    
        }else{
            if(!path.includes(openList[j])){
                openList[j].state ='l'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
               
            }
        }
        j++
    },(closedList.length*11)/(openList.length))

}

function pathvisual(path,time, closedList){

    path.reverse()
    var k=0
    var len= length(path).toFixed(2)

    let timerId2= window.setInterval(function(){
        if(k=== path.length){
            k=0
            document.getElementById("outcome").innerHTML = `Length= ${len}   Time= ${(time).toFixed(3)}ms`;
            clearInterval(timerId2)
        }else{
            path[k].state='x'
            tiles[sc][sr].state='s'
            tiles[ec][er].state='f'
        }
        k++;   
    },(closedList.length*11)/(path.length))

}
