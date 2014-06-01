
var GA = require('../canonical-ga');

var ga = new GA( {maxIterations: 100} );

ga.newBestChromo = function(data){
  console.log('new best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
}

var evalFn = function(testChromo){
  
  
  var sum = testChromo.reduce(function(total, ele){
    return total+ele;
  }, 0);
  
  return Math.pow(sum/testChromo.length, 2);
  
}

ga.run(200, 20, evalFn, function(err, data){
  if(err) {console.error(err); return;}
  console.log('best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
});
