module.exports = function(str) {
  splitters = str.split(/[a-z]+/g)
  splitters = splitters.slice(1, splitters.length-1)
  uniqueSplitters = [...new Set(splitters)]
  res = {  
    mod: uniqueSplitters[0], // разделитель для модификатора  
    elem: uniqueSplitters[1] ?? '', // разделитель для элемента  
  }
  if (splitters.filter(el => el === res.elem).length > 1){
    res = {
      mod: res.elem,
      elem: res.mod
    }
  }
  return res
}