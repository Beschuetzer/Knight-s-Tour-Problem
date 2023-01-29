//takes in two points on a chess board and returns the shortest path from start to end
//points are arrays of two length (e.g. [0,0] is lower left corner of board and [7,7] is upper right corner)

//Approach:
//validate values
//Get all the possible moves that start can move to
//iterate through each move.  
//return null if that location has been visited already
//return null if the move is out of bounds
//return the final array of moves if it is the end location

function knightMove (start, end, visited = [], shortestThusFar = {}) {
    if (
            !start ||
            !end ||
            start.length !== 2 ||
            end.length !== 2 ||
            start[0] > 7 ||
            start[1] > 7 ||
            start[0] < 0 ||
            start[1] < 0 ||
            end[0] > 7 ||
            end[1] > 7 ||
            end[0] < 0 ||
            end[1] < 0
        ){
        throw new Error("Invalid start or end value.  Values must meet the following condition: 0 <= x <= 7");
    }

    if (getEqual(start, end)) return visited;
    if (getAlreadyVisited(start, visited)) return null;
    if (shortestThusFar.shortest && shortestThusFar.shortest.length <= visited.length) return null;
   
    const possibleMoves = getPossibleMoves(start);

    let shortest = null;
    for(move of possibleMoves) {
        let result = knightMove(move, end, [...visited, start], shortestThusFar);
        if (result !== null && result !== undefined) {
            if (shortest === null || shortest.length > result.length) {
                shortest = result;
                if (!shortestThusFar.shortest || shortestThusFar.shortest && shortest.length < shortestThusFar.shortest.length) shortestThusFar.shortest = shortest;
            }

        }
    }

    let toReturn = null;
    if (shortestThusFar.shortest)  toReturn = [...shortestThusFar.shortest, end];
    return toReturn;
}

function getPossibleMoves(location) {
    //return an array of all 
    const possibleMoves = [];
    const matrix = [[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[-1,-2],[1,-2]];
    for (let i = 0; i < matrix.length; i++) {
        const move = matrix[i];
        const possibleMove = [move[0] + location[0], move[1] + location[1]];
        if (possibleMove[0] > 7 || possibleMove[0] < 0) continue;
        if (possibleMove[1] > 7 || possibleMove[1] < 0) continue;
        possibleMoves.push(possibleMove);
    }
    return possibleMoves;
}

function getAlreadyVisited(start, visited) {
    for (let i = 0; i < visited.length; i++) {
        const visit = visited[i];
        if (getEqual(start, visit)) return true;
    }
    return false;
}

function getEqual(arr1, arr2) {
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
    return false;
}

console.log(knightMove([4,4],[5,2]))   //[[4,4],[5,2]]
console.log(knightMove([0,0],[4,0]))   //[[0,0],[2,1],[4,0]]
console.log(knightMove([0,0],[0,4]))   //[[0,0],[1,2],[0,4]]
console.log(knightMove([0,0],[5,4]))   //[[0,0],[2,1],[4,2],[5,4]]
console.log(knightMove([0,0],[2,0]))   //[[0,0],[1,2],[2,0]
console.log(knightMove([0,0],[0,3]))   //[[0,0],[1,2],[2,4],[0,3]]

console.log(knightMove([0,0],[7,7]))   
console.log(knightMove([0,0],[7,6]))   

console.log(knightMove([2,3],[2,8]))   
console.log(knightMove([5,4],[7,6])) 
console.log(knightMove([6,0],[0,7])) 

console.log(knightMove([-1,0],[0,3]))  //throws
console.log(knightMove([0,-1],[7,7]))  //throws
console.log(knightMove([0,0],[-1,7]))  //throws
console.log(knightMove([0,0],[7,-1]))  //throws

console.log(knightMove([8,0],[0,7]))  //throws
console.log(knightMove([7,8],[0,7]))  //throws
console.log(knightMove([7,0],[8,7]))  //throws
console.log(knightMove([7,0],[0,8]))  //throws



   