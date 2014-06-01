

//Canonical
var GA = function(args){
  
  var fitnesses = [],
    xProp = 0.7,
    mutProp = 1, //this will become 1/chromoCount
    population = [];
    this.useElites = false;
    this.maxIterationCnt = 100;
    this.tolerance = 1e-3;
    
  if(args){
    
    if(args.useElites){
      this.useElites = args.useElites;
      console.log('useElites = ' + this.useElites)
    }
      
    if(args.maxIterations){
      this.maxIterationCnt = args.maxIterations;
      console.log('maxIterations = ' + this.maxIterationCnt)
    }
    
    if(args.tolerance){
      this.tolerance = args.tolerance;
      console.log('tolerance = ' + this.tolerance)
    }
    
  }

  //newBestChromo(population[bestIndex],bestFitness);
  this.newBestChromo = null;
  
  //evaluate must be set before beginning
  var evaluate = null;
  
  
  
  this.run = function(popSize, chromosomeCount, evalFn, cb){
    process.nextTick(function(){
        initialize(popSize, chromosomeCount, evalFn, cb);
    }.bind(this));
  }
  
  
  var initialize = function(popSize, chromoLength, evalFn, cb){
    
    if(!eval){
      cb('evaluation function must be provided :/');
      return;
    }
    
    evaluate = evalFn;
    
    mutProp = 1/chromoLength;
    
    population = [];
    popRow = [];
    for(var i = 0 ; i < popSize; i++){
      popRow = [];
      for(var j = 0 ; j < chromoLength; j++){
        popRow.push(~~((Math.random()*1000)%2));
      }
      population.push(popRow);
    }
    
    begin(cb);
    
  }.bind(this);
  
  
  var begin = function(cb){
    
    fitnesses = [];
    
    var finished = false;
    
    var iterationCnt = 0,
        bestIndex = -1,
        bestFitness = 0,
        bestFitnessOverAll = -1,
        bestChromoOverAll = [],
        bestChromo = [];
        
    console.log('beginnig GA');
    
    var step = function(){
      
        if(finished){
          cb(null, {
                chromo: bestChromoOverAll,
                fitness: bestFitnessOverAll,
                iteration: iterationCnt
            });
          return true;
        }
          
        fitnesses = population.map(function(curr){
            return evaluate(curr);
        });
        
        bestFitness = Math.max.apply(null, fitnesses);
        
        bestIndex = fitnesses.indexOf(bestFitness);
        
        bestChromo = population[bestIndex];
        
        if(bestFitness > bestFitnessOverAll){
          
          bestFitnessOverAll = bestFitness;
          
          bestChromoOverAll = bestChromo;
          
          if(this.newBestChromo)
            this.newBestChromo({
                chromo: bestChromoOverAll,
                fitness: bestFitnessOverAll,
                iteration: iterationCnt
            });
        }
        
        if((1-bestFitness) < this.tolerance){
          finished = true;
        }
        
        if(this.useElites && iterationCnt!=0){
          var tmp;
          for(var i = 0 ; i < population.length; i++){
            tmp = bestChromoOverAll.slice();
            mutate(tmp);
            population[i] = tmp;
          }
          
        }
        
        evolve();
        
        iterationCnt++;
        
    }.bind(this);
    
    while(iterationCnt <= this.maxIterationCnt){
        
        if(step())
          return;
        
    }
    
    cb(null, {
                chromo: bestChromoOverAll,
                fitness: bestFitnessOverAll,
                iteration: iterationCnt-1
            });
    
  }.bind(this)
  
  //evolves using the fitnesses on this object
  var evolve = function(){
    var chosen = [], children = [];
    
    var i = 0;
    
    for(; i < population.length; i++){
      chosen.push(spin(fitnesses));
    }
    
    for(i = 1 ; i < population.length; i+=2){
      var chillens = crossover(chosen[i-1], chosen[i]);
      children.push(chillens[0]);
      children.push(chillens[1]);
    }
    
    population = children.slice();
  }.bind(this)
  
  //need cross-over, mutate, and random spinner functions
  var crossover = function(p1, p2){
    var size = population[0].length
    var index = ~~(size * Math.random()); // get random index for crossing
    
    if (index == 0)
        index += 1;
    else if (index == size)
        index -= 1;
    
    var child1 = [], //tmp variable for storage
        child2 = []; //tmp variable for storage
    
    var rand = Math.random(); // get random value
    
    if (rand >= xProp) // if greater than 0.7, then don't cross
    {
        child1 = population[p1].slice();
        child2 = population[p2].slice();
        mutate(child1); // mutate
        mutate(child2); // mutate
        return [child1, child2];
    }
    
    for (var i = 0; i < size; i++) // cross children with parents
    {
        if (index >= i)
        {
             child1.push(population[p1][i]);
             child2.push(population[p2][i]);
        }
        else
        {
             child1.push(population[p2][i]);
             child2.push(population[p1][i]);
        }
    }
    
    mutate(child1); // mutate
    mutate(child2); // mutate
    return [child1, child2];
  }.bind(this)
  
  var flip = function(chance, val)
  {
       return Math.random() <= chance ? 1 - val : val;
  }
          
  var mutate = function(chromo){
    for (var i = 0; i < chromo.length; i++)
      chromo[i] = flip(mutProp, chromo[i]);
  }.bind(this)
  
  var spin = function(fitnesses){
    var i = 0, count = 0;
    
    sum = fitnesses.reduce(function(total, curr){
      total += curr;
      return total;
    },0);
    
    var normalized = fitnesses.slice();
    
    for (i = 0; i < normalized.length; i++)
        normalized[i] /= sum;
    
    var val = Math.random();
    
    for (i = 0; i < fitnesses.length; i++)
    {
        count += normalized[i];
        if (count >= val)
             return i;
    }
    
    return fitnesses.length - 1;
    
  }.bind(this)
};

module.exports = GA;