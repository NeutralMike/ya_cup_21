function getInsertInd(weights, matter){
  if (weights.length === 1){
    return + (matter > weights[0])
  }
  const mid = Math.floor(weights.length / 2)
  if (matter < weights[mid]){
    return getInsertInd(weights.slice(0, mid), matter)
  }
  return mid + getInsertInd(weights.slice(mid), matter)
  
}

function findLatestWeight (weights) {  
  weights.sort((a, b) => a - b)
  while (weights.length > 1)  {
    matter = Math.abs(weights.pop() - weights.pop())
    if (weights.length === 0){
      return matter
    }
    if (matter > 0){
      weights.splice(getInsertInd(weights, matter) , 0, matter)
    }
  }
  return weights[0]
}


module.exports = findLatestWeight;