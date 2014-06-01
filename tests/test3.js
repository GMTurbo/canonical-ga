
var GA = require('../canonical-ga');

var binaryEncoderRing = require('binary-encoder-ring');

var ga = new GA( {maxIterations: 500, useElites: true} );

ga.newBestChromo = function(data){
  console.log('new best -> Fitness: '+ data.fitness.toFixed(4) + ' iteration: ' + data.iteration);// + ' Chromo: ' + printResult(data.chromo));
}

var ring = new binaryEncoderRing();

var sentenceLong = "The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type a given text, such as the complete works of William Shakespeare."

var sentenceSmall = "bEeP bOoP";

var target = ring.encode(sentenceSmall);

var evalFn = function(testChromo){
  
  //let's write an eval function to make our GA
  // solve for the sentence 'BeEp BoOp' (@substack for origin)
  
  var sum = testChromo.reduce(function(total, ele, index){
    if(testChromo[index] === target[index])
      total++;
    return total;
  }, 0);
  
  if(sum == 0) sum = 1e-9
  return Math.pow(sum/target.length, 2);
  
}

var printResult = function(chromo){
  return ring.decode(chromo);
}

console.time('ga_run');

ga.run(1000, target.length, evalFn, function(err, data){
  if(err) {console.error(err); return;}
  
  console.timeEnd('ga_run');
  
  console.log('best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
  console.log("eval result = " + evalFn(data.chromo));
  console.log(printResult(data.chromo));
});


