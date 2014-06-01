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
##Elitist Selection

```
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

ga.run(100, 200, evalFn, function(err, data){
  if(err) {console.error(err); return;}
  console.log('best -> Fitness: '+ data.fitness + ' iteration: ' + data.iteration + ' Chromo: ' + data.chromo);
});

> useElites = true
> maxIterations = 200
> beginnig GA
> new best -> Fitness: 0.366025 iteration: 0
> new best -> Fitness: 0.3844 iteration: 2
> new best -> Fitness: 0.4096 iteration: 3
> new best -> Fitness: 0.42250000000000004 iteration: 4
> new best -> Fitness: 0.44222500000000003 iteration: 5
> new best -> Fitness: 0.45562500000000006 iteration: 6
> new best -> Fitness: 0.46922500000000006 iteration: 7
> new best -> Fitness: 0.48999999999999994 iteration: 8
> new best -> Fitness: 0.5112249999999999 iteration: 9
> new best -> Fitness: 0.525625 iteration: 10
> new best -> Fitness: 0.5476 iteration: 11
> new best -> Fitness: 0.5776 iteration: 12
> new best -> Fitness: 0.5929 iteration: 13
> new best -> Fitness: 0.6084 iteration: 14
> new best -> Fitness: 0.6241000000000001 iteration: 15
> new best -> Fitness: 0.6400000000000001 iteration: 16
> new best -> Fitness: 0.6561000000000001 iteration: 17
> new best -> Fitness: 0.664225 iteration: 18
> new best -> Fitness: 0.6723999999999999 iteration: 19
> new best -> Fitness: 0.6889 iteration: 20
> new best -> Fitness: 0.697225 iteration: 21
> new best -> Fitness: 0.7055999999999999 iteration: 22
> new best -> Fitness: 0.7310249999999999 iteration: 23
> new best -> Fitness: 0.748225 iteration: 24
> new best -> Fitness: 0.7569 iteration: 25
> new best -> Fitness: 0.765625 iteration: 26
> new best -> Fitness: 0.7832250000000001 iteration: 27
> new best -> Fitness: 0.7921 iteration: 28
> new best -> Fitness: 0.801025 iteration: 29
> new best -> Fitness: 0.81 iteration: 30
> new best -> Fitness: 0.8281000000000001 iteration: 31
> new best -> Fitness: 0.8464 iteration: 32
> new best -> Fitness: 0.8556250000000001 iteration: 33
> new best -> Fitness: 0.8649000000000001 iteration: 34
> new best -> Fitness: 0.8742250000000001 iteration: 35
> new best -> Fitness: 0.8835999999999999 iteration: 36
> new best -> Fitness: 0.893025 iteration: 37
> new best -> Fitness: 0.9025 iteration: 38
> new best -> Fitness: 0.912025 iteration: 39
> new best -> Fitness: 0.9216 iteration: 40
> new best -> Fitness: 0.931225 iteration: 41
> new best -> Fitness: 0.9409 iteration: 42
> new best -> Fitness: 0.9506249999999999 iteration: 48
> new best -> Fitness: 0.9603999999999999 iteration: 49
> new best -> Fitness: 0.970225 iteration: 50
> new best -> Fitness: 0.9801 iteration: 53
> new best -> Fitness: 0.990025 iteration: 55
> new best -> Fitness: 1 iteration: 59
> best -> Fitness: 1 iteration: 60 Chromo: 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

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

## var ga = new GA({ maxIterations: 100, tolerance: 1e-3, useElites: false });

Create a GA instance, maxIterations defaults to 100, but you can override. tolerance defaults to 1e-3.

useElites allows for enabling of elitism during selection.  This works well if you have a traditional hill climbing eval function.

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