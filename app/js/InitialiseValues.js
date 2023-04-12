fetch('/keys-count')
    .then(response => response.json())
    .then(data => {
        keysCheckedCount = data.keysCount.toString();
        console.log(keysCheckedCount);
    })
    .catch(error => console.error(error));

fetch('/current-key-index')
    .then(response => response.json())
    .then(data => {
        currentKeyString = data.currentKeyString.toString();
        console.log(keysCheckedCount);
    })
    .catch(error => console.error(error));