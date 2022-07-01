
function search(set,g,threshold,heu){
    var cur = set[set.length-1]                 //last element of the set
    var f = g+ weight * heuristic(cur,tiles[ec][er],heu)           //function present in heuristic.js
    if(f > threshold){
        return f
    }
    if(cur === tiles[ec][er]){
        return "FOUND"   
    }
    
    var min = Infinity
    var neighbors =addNeighbors(cur,cur.c,cur.r)            //function present in grid.js
    for(var i=0;i<neighbors.length;i++){
        var neighbor= neighbors[i]

        if( !set.includes(neighbor) && neighbor.state != 'w'){
            set.push(neighbor)
           if(isDiagonal(cur,neighbor)){               //function present in grid.js
                neighbor.g = cur.g + Math.SQRT2           
            }else{
               neighbor.g = cur.g + 1 
            } 
            var temp = search(set, neighbor.g,threshold,heu)
            if(temp == "FOUND"){
              return "FOUND"
            }
            if(temp < min){
                min = temp
            }
            set.pop()
        }
    } 
    return min
}
function solve_using_idastar(heu){
    clear_path();              //function present in grid.js
    var set=[]     
    var threshold  =  weight * heuristic(tiles[sc][sr],tiles[ec][er],heu)     //function present in heuristic.js
    var flag =0
    set.push(tiles[sc][sr])
    var time_s = new Date().getTime();     //time starts
    while(1){                                                 //infinite loop
        var temp = search(set,0,threshold,heu)
        if(temp == "FOUND"){
            flag=1
            break;
            
        }
        if(temp == Infinity){
            return [] 
        }
        threshold = temp
    }
    var time_e = new Date().getTime();
    if(flag == 0){
        console.log('Path does not exist')
    }else{
        var len= length(set).toFixed(2)        //function present in path.js
        document.getElementById("outcome").innerHTML = `Length= ${len}  Time= ${(time_e-time_s).toFixed(3)}ms`;
        for(var i=0;i<set.length;i++){
            set[i].state='x'
            tiles[sc][sr].state='s'
            tiles[ec][er].state='f'
        } 
    }
    
}

