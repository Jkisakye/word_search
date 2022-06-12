var number
var wordsFound
 
//program entry point
function getWords(){
    wordsFound=[]
    number=0

    var randomLetters=document.getElementById('inputLetters').value

    const h3 = document.querySelector('.letters')
    h3.innerHTML=`letters: ${randomLetters}`

    //generate a list of all possible permutations from the letters
    possibles=tree(randomLetters.split('')).map(   
        function(str) {
             return str.join('')
            }  
         )

    //load the file with json data that has the list of English words and search for matching words
    //fetch is blocked by chrome's cross origin resource sharing blocking policy if not loaded in live server of vs code
    fetch("./words.json")
    .then(response => {
    return response.json();
    })
    .then(jsondata => search(jsondata.words, possibles));
    
}


//recursive function to find all possible permutations
//bug: allows repeated permutations of the same letter
function tree(leafs) {
    var branches = []

    if (leafs.length == 1) return leafs

    for (var k in leafs) {
        var leaf = leafs[k]

        tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
            branches.push([leaf].concat(subtree))
        })
    }
    return branches
}



//function to search through the words looking for matches
function search(dictionary, possibles) {
    possibles.forEach(element => {
        binarySearch(element,dictionary)
    });
    
    display()
}

//display html of the list
function display() {
    const ul = document.querySelector('.wordsFound')
    let wordsHtml=``

    let add= (word)=>{
         wordsHtml += `<li style ="color: black">${word}</li>`
    }
    alert(number+" words found")
    wordsFound.forEach(add)
    ul.innerHTML=wordsHtml
}



//binary search to look through the entire english word list
function binarySearch(word, words){
    var first,last,mid
    first=0
    last=words.length-1
    mid=Math.floor((first+last)/2)  

    while(first<=last){
        if(words[mid] < word){
            first = mid+1 
        }
        else if(words[mid] == word){
            number++
            wordsFound.push(words[mid])
            break
        }   
        else{
            last = mid-1 
        }

        mid = Math.floor((first+last)/2) 
    }
}
