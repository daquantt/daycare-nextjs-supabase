function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function changeSpaceToDash(string) {
  return string.replace(/\s+/g, '-')
}

export { capitalizeWord, changeSpaceToDash }