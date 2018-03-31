var Factories = {
    farm: {
        name: 'Farm',
        output: [{ type: 'food', amount: 100 }],
        input: [{ type: 'food', amount: 20 }],
        cost: [{ type: 'wood', amount: 10 }],
        time: 10000,
        factor: 1.2
    },
    woodCutter: {
        name: 'Wood Cutter',
        output: [{ type: 'wood', amount: 1 }],
        input: [{ type: 'food', amount: 10 }],
        cost: [{ type: 'wood', amount: 5 }],
        time: 2500,
        factor: 1.1
    },
    stoneMiner: {
        name: 'Stone Miner',
        output: [{ type: 'stone', amount: 1 }],
        input: [{ type: 'food', amount: 20 }],
        cost: [{ type: 'wood', amount: 10 }],
        time: 2500,
        factor: 1.1
    },
    sawmill: {
        name: 'Sawmill',
        output: [{ type: 'plank', amount: 2 }],
        input: [{ type: 'wood', amount: 1 }, { type: 'food', amount: 20 }],
        cost: [{ type: 'wood', amount: 10 }],
        time: 5000,
        factor: 1.2
    },
    mason: {
        name: 'Stone Mason',
        output: [{ type: 'cutStone', amount: 2 }],
        input: [{ type: 'stone', amount: 1 }, { type: 'food', amount: 20 }],
        cost: [{ type: 'stone', amount: 10 }, { type: 'plank', amount: 10 }, { type: 'wood', amount: 10 }],
        time: 5000,
        factor: 1.2
    }
}

var Resources = {}

var InputResources = {}
var OutputResources = {}
var GatherableResources = []

var ResourceNames = {
    wood: 'Wood',
    food: 'Food',
    plank: 'Wooden Plank',
    stone: 'Stone',
    cutStone: 'Cut Stone'
}

function LoadFactories() {
    for (factoryType in Factories) {
        let factory = Factories[factoryType]
        factory.total = 0
        factory.progress = 0
        factory.revealed = false
        factory.paused = false
        factory.pausing = false
        AddResources(factory)
    }

    for (resourceType in InputResources) {
        if (!OutputResources[resourceType]) {
            Resources[resourceType].revealed = true
            GatherableResources.push(resourceType)
        }
    }
}

function AddResources(factory) {
    let inputResources = {}
    let outputResources = {}

    if (factory.input) {
        for (let index = 0; index < factory.input.length; index++) {
            const element = factory.input[index];
            InputResources[element.type] = true
            inputResources[element.type] = true
            Resources[element.type] = {
                amount: 0,
                name: ResourceNames[element.type],
                revealed: false
            }
        }
    }

    if (factory.cost) {
        for (let index = 0; index < factory.cost.length; index++) {
            const element = factory.cost[index];
            InputResources[element.type] = true
            inputResources[element.type] = true
            Resources[element.type] = {
                amount: 0,
                name: ResourceNames[element.type],
                revealed: false
            }
        }
    }

    if (factory.output) {
        for (let index = 0; index < factory.output.length; index++) {
            const element = factory.output[index];
            if(!inputResources[element.type]){
                OutputResources[element.type] = true
            }
            Resources[element.type] = {
                amount: 0,
                name: ResourceNames[element.type],
                revealed: false
            }
        }
    }
}

LoadFactories()