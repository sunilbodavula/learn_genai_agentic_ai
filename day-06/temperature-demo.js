const candidates = [
    {token: "shipped", probability: 0.7},
    {token: "processing", probability: 0.2},
    {token: "delayed", probability: 0.1}
]

function adjustProbabilities(candidates, temperature){

    const weights = candidates.map(candidate => 
        Math.pow(candidate.probability, 1/temperature)
    );

    const total = weights.reduce(
        (sum, weight) => sum + weight, 0
    );
    
    return weights.map(weight => weight/total);
}

function selectToken(candidates, probabilities){
    const random = Math.random();

    let cumulativeProbability = 0;

    for(let i = 0; i < candidates.length; i++){
        cumulativeProbability += probabilities[i];

        if(random < cumulativeProbability){
            return candidates[i].token;
        }
    }

    return candidates[candidates.length - 1].token;
}

function runExperiment(temperature){
    const probabilities = adjustProbabilities(
        candidates, temperature
    );

    console.log(`\nTemperature: ${temperature}`);

    candidates.forEach((candidate, index) => {
        console.log(
            `${candidate.token}: ${(probabilities[index] * 100).toFixed(2)}%`
        );
    });

    console.log("Generated tokens: ");

    for(let i = 1; i <= 10; i++){
        console.log(selectToken(candidates, probabilities));
    }
}

runExperiment(0.5);
runExperiment(1);
runExperiment(2);