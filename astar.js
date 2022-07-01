function solve_using_astar(heu){
clear_path();              //function present in grid.js file
var flag=0
var path=[]
var openList=[]      // to store elements which are still to be evaluated
var closedList=[]        // to store elements which are already being evaluated
openList.push(tiles[sc][sr])                    //adding start tile to openSet
var time_s = new Date().getTime();              //time starts                        
while(openList.length >0){
    var tile_with_lowest_f =0                 
    for(var i=0;i<openList.length;i++){
        if(openList[i].f < openList[tile_with_lowest_f].f){
            tile_with_lowest_f =i
        }
    }
    var current = openList[tile_with_lowest_f]
    if(current === tiles[ec][er]){        //if destination is found
        path =path_f(current)              //function present in path.js file
        flag =1
        break;                            //then break
   } 
    remove(openList,current)                //function present in path.js file
    closedList.push(current)
    var neighbors= addNeighbors(current,current.c,current.r)       //function present in grid.js file
    for(var i=0;i<neighbors.length;i++){               
        var neighbor = neighbors[i]
        if(!closedList.includes(neighbor) && neighbor.state != 'w'){  
           var tempG    
           if(isDiagonal(current,neighbor)){                //function present in grid.js file
               tempG = current.g + Math.SQRT2
           }  else{
            tempG = current.g +1    
           }                                           // this means the neighbor has not been evaluated yet                                 
            var betterPath = false
            if(openList.includes(neighbor)){           // if element is already present in openSet       
                if(tempG < neighbor.g){
                    neighbor.g = tempG                // then get the better g 
                    betterPath=true
                }
            }else{
                neighbor.g = tempG                   //else add element to openSet
                openList.push(neighbor)
                betterPath=true
            }
            if(betterPath){
               //console.log(weight)

                neighbor.h= weight * heuristic(neighbor,tiles[ec][er],heu)      //function present in heuristic.js file
                neighbor.f = neighbor.g + neighbor.h      
                neighbor.previous = current
            }
        }
    }    
}
var time_e = new Date().getTime();       //time ends

if(flag === 0){
    console.log('No Possible Path')
}else{
    console.log('Path exists')
    var time= time_e-time_s
    closed(closedList,path)              //function present in animation.js file
    open(openList,closedList,path)        //function present in animation.js file
    pathvisual(path,time,closedList)         //function present in animation.js file

}
       
}
