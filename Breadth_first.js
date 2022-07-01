function solve_using_bfs(){
    clear_path();                     //function present grid.js file
    var set =[]
    var visited_elt=[]                // to store visited elements
    var  flag =0
    var path=[]
   
    set.push(tiles[sc][sr])
    tiles[sc][sr].visited = true
    var time_s = new Date().getTime();            //time starts
    while(set.length>0){  
        var cur = set[0]
        set.shift()
        visited_elt.push(cur)
        if(cur == tiles[ec][er]){
            flag =1
            path =path_f(cur)                  //function present in path.js file
            break;  
        }
        var neighbors = addNeighbors(cur,cur.c,cur.r)         //function present in grid.js
        for(var i=0;i<neighbors.length;i++){
            var neighbor = neighbors[i]
            if(neighbor.visited === false && neighbor.state!== 'w'){
                set.push(neighbor)
                neighbor.previous = cur
                neighbor.visited= true
            }
        }
    }
    var time_e = new Date().getTime();      // time ends

    if(flag ===1)
    { 
        var time= time_e-time_s
        closed(visited_elt,path)                     //function present in animation.js file
        pathvisual(path,time,visited_elt)              //function present in animation.js file


    }else{
        console.log('Solution does not exist')
    }
}

