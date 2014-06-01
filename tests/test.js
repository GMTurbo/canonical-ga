
var GA = require('../canonical-ga');

var ga = new GA( {maxIterations: 200, useElites: true} );

ga.newBestChromo = function(data){
  console.log('new best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration);// + ' Chromo: ' + data.chromo);
}

var evalFn = function(testChromo){
  
  var sum = testChromo.reduce(function(total, ele){
    return total+ele;
  }, 0);
  
  return Math.pow(sum/testChromo.length, 2);
  
}

ga.run(1000, 1000, evalFn, function(err, data){
  if(err) {console.error(err); return;}
  console.log('best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
});

// var ga2 = new GA( {maxIterations: 500} );

// ga2.newBestChromo = function(data){
//   console.log('new best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
// }

// var evalFn2 = function(testChromo){
  
  
  
//   var sum = testChromo.reduce(function(total, ele){
//     return total+ele;
//   }, 0);
  
//   return sum/testChromo.length;
  
// }

// ga2.run(1000, 100, evalFn, function(err, data){
//   if(err) {console.error(err); return;}
//   console.dir(data);
// });
