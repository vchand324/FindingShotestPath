function ManhattanHeu(dx,dy){           //all heuristic functions
    return (dx+dy)
}

function EuclideanHeu(dx,dy){
    return (Math.sqrt(dx * dx + dy * dy))
}

function OctileHeu(dx,dy){
    var F = Math.SQRT2 - 1;
    return (dx < dy) ? F * dx + dy : F * dy + dx;
}
function ChebyshevHeu(dx,dy){
    return (Math.max(dx, dy))
}


function heuristic(curr,end,heu){           //checking which heuristic is selected
    var dx = Math.abs(curr.c - end.c)
    var dy = Math.abs(curr.r - end.r)

    var val

    if (heu=='manhattan'){
        val = ManhattanHeu(dx,dy) 
    }
    else if (heu=='euclidean'){
        val = EuclideanHeu(dx,dy) 
    }
    else if (heu=='octile'){
        val = OctileHeu(dx,dy) 
    }
    else if (heu=='chebyshev'){
        val = ChebyshevHeu(dx,dy) 
    }
    return val
}
