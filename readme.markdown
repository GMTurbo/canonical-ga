# Canonical-GA - Canonical Genetic Algorithm Implementation


Want to use a binary GA to (maybe?) solve some problems?  Now you can!

# example

```
var GA = require('canonical-ga');

var ga = new GA( {maxIterations: 100} );

ga.newBestChromo = function(data){
  console.log('new best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
}

//REQUIRED: define our own eval function
var evalFn = function(testChromo){
  
  var sum = testChromo.reduce(function(total, ele){
    return total+ele;
  }, 0);
  
  return sum/testChromo.length;
  
}

ga.run( /*population size*/ 200, /*chromosome length*/ 20, evalFn, function(err, data){
  if(err) {console.error(err); return;}
  console.dir(data);
});

> maxIterations = 100
> beginnig GA
> new best -> Fitness: 0.75 iteration: 0 Chromo: 1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0
> new best -> Fitness: 0.8 iteration: 1 Chromo: 1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0
> new best -> Fitness: 0.85 iteration: 5 Chromo: 1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1
> new best -> Fitness: 0.9 iteration: 11 Chromo: 1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1
> new best -> Fitness: 0.95 iteration: 12 Chromo: 1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
> new best -> Fitness: 1 iteration: 34 Chromo: 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

> best -> Fitness: 1 iteration: 35 Chromo: 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

```

# details

The simple genetic algorithm: an evolutionary algorithm based on binary strings, with crossover along with mutation as variation operator, and fitness-proportionate selection.  [thanks google!](http://geneura.ugr.es/~jmerelo/evolutionary-computation-perl/x207.html)

# scripts

## test

runs the example test.

# methods

``` js
var GA = require('canonical-ga');
```

## var ga = new GA({ maxIterations: 100, tolerance: 1e-3});

Create a GA instance, maxIterations defaults to 100, but you can override. tolerance defaults to 1e-3.

## ga.run(populationSize, chromoLength, evalFn, cb);

run the ga with the a population size and chromosome length.
evaluation function must be supplied.
cb on complete.

`cb(err, data)` signature.

## ga.newBestChromo = function(data){..};

* update event for new best chromosome
* data => { data.chromo, data.fitness, data.iteration }
* `chromo` is the chromosome array
* `fitness` is the fitness of that chromosome
* `iteration` is the iteration value of the newBestChromo call


# install

With [npm](https://npmjs.org) do:

```
npm install canonical-ga
```
to get the library.

# license

MIT