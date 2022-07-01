
function solve_using_dijkstra(){ 
    clear_path();        // //function present in grid.js file
    var set=[]            // to store examined elements
    var path =[]
    var num=53*23          // grid dimensions
    var flag =0
    tiles[sc][sr].distance = 0       //initialising start distance to be 0
    var time_s = new Date().getTime();           //time starts
    
    while(num>0){
        var min = Infinity
        for(var i=0;i<tileColumn;i++){
            for(var j=0;j<tileRow;j++){
                
                if(tiles[i][j].distance < min   && tiles[i][j].visited === false){
                    min = tiles[i][j].distance
                    cur = tiles[i][j]
                }
            }
        }
        cur.visited=true
        set.push(cur)
        if(cur == tiles[ec][er]){              //if destination is found
            flag =1;
            path =path_f(cur)                 //function present in path.js
            break;                            //then break
        }
        var neighbors= addNeighbors(cur,cur.c,cur.r)           //function present in grid.js file
        for(var i=0;i<neighbors.length;i++){
            var neighbor = neighbors[i]
            if(neighbor.visited === false && neighbor.state!='w'){
                var temp = neighbor.distance
                if(isDiagonal(neighbor,cur)){                //function present in grid.js file
                    if(temp <  cur.distance+Math.sqrt(2)){
                        neighbor.distance = temp
                    }else{
                        neighbor.distance=cur.distance+Math.sqrt(2)
                        neighbor.previous = cur
                    }
                }else{
                    if(temp <  cur.distance+1){
                        neighbor.distance = temp
                    }else{
                        neighbor.distance=cur.distance+1
                        neighbor.previous = cur
                    }  
                }
            } 
        }
        num--  
    }
    var time_e = new Date().getTime();         //time ends

    if(flag == 1){
        var time= time_e-time_s
        closed(set,path)                  //function present in animation.js file
        pathvisual(path, time,set)            //function present in animation.js file
    }
        else{
        console.log('solution does not exist')
    }
}

