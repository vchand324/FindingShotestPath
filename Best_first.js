
function solve_using_bestfirst(heu){
    clear_path();                       //function present in grid.js file
    var openList=[]
    var closedList=[]
    var flag=0
    var path=[]
    
    openList.push(tiles[sc][sr])

    var time_s = new Date().getTime();
    
    while(openList.length >0){

        var tile_with_lowest_h =0           //index of tile having lowest heuristic value

        for(var i=0;i<openList.length;i++){
            openList[i].h =  weight * heuristic(openList[i],tiles[ec][er],heu)          //function present in heuristic.js file
            openList[tile_with_lowest_h].h =  weight * heuristic(openList[tile_with_lowest_h],tiles[ec][er],heu)            //function present in heuristic.js file
           if(openList[i].h < openList[tile_with_lowest_h].h){
            tile_with_lowest_h =i
           }
        }

        var current = openList[tile_with_lowest_h]
        if(current === tiles[ec][er]){
            path =path_f(current)           //function to find path present in path.js file        
            flag =1
            break;  
        }
       
        remove(openList,current)        //function remove element from array present in path.js file
        closedList.push(current)


       var neighbors= addNeighbors(current,current.c,current.r)     //function present in grid.js file
        for(var i=0;i<neighbors.length;i++){               
            var neighbor = neighbors[i]

            if(!closedList.includes(neighbor) && neighbor.state != 'w' ){    // this means the neighbor has not been evaluated yet 
                var betterPath = false
               
                if(!openList.includes(neighbor)){
                    openList.push(neighbor)
                    
                    betterPath= true
                    
                }
                if(betterPath){
                    neighbor.h = weight * heuristic(neighbor,tiles[ec][er],heu)     //function present in heuristic.js file
                    neighbor.previous = current


                }
                
            }
               
        }
        var time_e = new Date().getTime();
    }

    if(flag === 0){
        console.log('No path exists')
    }
    else{        
        var time= time_e-time_s
        closed(closedList,path)             //function present in animation.js file
        open(openList,closedList,path)      //function present in animation.js file
        pathvisual(path,time,closedList)    //function present in animation.js file
        console.log('Solution exists')
    }
}
