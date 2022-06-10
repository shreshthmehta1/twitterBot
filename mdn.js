//Variables 
var x = 50;
let y = 10;
const z = 5; 

console.log(x, y, z);

//operators 
console.log(x + y);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log((x % y));
console.log(typeof(x % y));

//ternary operator 
var age = 20;
var beverage = (age >= 21) ? "Beer" : "Juice";
console.log(beverage); // "Beer"

//falsy values - null, undefined, 0, '',Nan
var user = null;
var mate = 'kevin'
if(user){
  console.log("Condition true");
}
if(mate){
  console.log("Print");
}

//type coercion
console.log("2"+2) 
console.log(2+2)

//switch statement 
const expr = 'banana';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}

//functions return vs console.log
function thor(){
    console.log("Thor");
}
thor();

function loki(){
 return "loki";
}
let lk = loki();
console.log(lk);

//funtion with object 
function myFunc(theObject) {
    theObject.make = 'Toyota';
  }

  //object
  var mycar = 
  {
    make: 'Honda',
    model: 'Accord',
    year: 1998,
    carType: ['aston','martin'],
    buyCar: function (carType){
      this.carType.push(carType);
    },
    getCarTypeCount: function (){
      console.log('car length',this.carType.length);
    }
  };
  mycar.buyCar('Fiat');
  mycar.getCarTypeCount();

  var x, w;
  
  x = mycar.make; 
  
  myFunc(mycar);
  w = mycar.make; 
console.log(mycar);

//function expression pass function as an argument to another function 
function map(f, a) {
    let result = []; 
    let i; 
    for (i = 0; i != a.length; i++)
      result[i] = f(a[i]);
    return result;
  }
  
  const f = function(x) {
     return x * x * x;
  }
  let numbers = [0, 1, 2, 5, 10];
  let cube = map(f,numbers);
  console.log(cube);

//context - global context collecting info
//execution context - rule 1) function declaration scanned and made available 

tipper(5);

function tipper(a){
 var bill = parseInt(a);
 console.log(bill + 5);
}
//tipper(5);

//variable decalration are scanned and made undefined  
var bigTipper = function (a){
  var bill = parseInt(a);
  console.log(bill + 5);
 }
 bigTipper(200);

 //code hoisting
var nam = "mehta";
console.log(nam);

//var name = "mehta"

//variable object collects info about code 
//scope chain 
//curly braces - scope

var example = "dunk";
console.log('A',example);

function sayName() {
  //var example = "MR H"
  console.log('B', example);
}
sayName();

//array
let countries = [];

countries.push('India', 'Australia', 'UK', 'US')
console.log(countries[0]); // countries[0] = 'Sri Lanka' to replace
console.log(countries.length);
countries.pop();
console.log(countries);
console.log(countries.indexOf("UK"));
console.log(Array.from("Shreshth"));

//fill & filter array functions 
var testArray = [2,4,6,7,8,9];
console.log(testArray.fill("S",2, 5))

const myNumbers = [22, 55, 77, 98]
const result = myNumbers.filter((num)=> num != 55)
console.log(result);

//slice & splice
var users = ["Ted", "Tim", "Tom", "Simon", "Shresh"]
console.log(users.slice(1, 3));

users.splice(1, 3, "Hi")
console.log(users);

//arrow function
var arrow = (fit) => console.log(fit + ' Mjolnir') 
arrow('Loki');


//callback 
function greeting(name) {
  console.log(name);
}



function processUserInput(callback) {
  var name = 'Thor';
  callback(name);
}

processUserInput(greeting);

//for loop 
let str = '';

for (let i = 0; i < 9; i++) {
  str = str + i;
}

console.log(str);
//expected output: "012345678"

const states = [
  "Rajasthan",
  "Delhi",
  "Assam",
  1947,
  "Tamil Nadu",
  "Maharashtra"
]

for(let i = 0; i < states.length; i++){
  if(typeof states[i] !== 'string') continue;
  console.log(states[i]);
}
console.log('####################');

//while & do while 
let j = 0;

while (j < states.length){
  console.log(states[j]);
  j++;
}
console.log('####################');

//forEach
states.forEach((s) => (console.log(s)));
console.log('####################');

//for of for arrays
const names = ["youtube", "facebook", "instagram", 'Netflix', 'Amazon']

for(const n of names){
  console.log(n);
}
console.log('################');

//for in for objects
const symbols = {
  yt : "Youtube",
  ig : "instagram",
  fb : 'facebook',
  lco : "learncodeonline"
}

for(const y in symbols){
  console.log(`key: ${y} & value : ${symbols[y]}`);
}

//this - global object
console.log(this);
// console.log(doc);

//dom checkout index.html
// var indira = doc.querySelector(".cl")
// console.log(indira.innerHTML);


//prototype
function Person(first, last, age, gender, interests) {

  // property and method definitions
  this.name = {
    'first': first,
    'last' : last
  };
  this.age = age;
  this.gender = gender;
  
}

let person1 = new Person('Tammi', 'Smith', 32, 'neutral', ['music', 'skiing', 'kickboxing']);

Person.prototype.farewell = function() {
  console.log(this.name.first + ' has left the building. Bye for now!');
};

person1.farewell();

//map 
const myMap = new Map()

const keyString = 'a string'
const keyObj    = {}
const keyFunc   = function() {}

// setting the values
myMap.set(keyString, "value associated with 'a string'")
myMap.set(keyObj, 'value associated with keyObj')
myMap.set(keyFunc, 'value associated with keyFunc')

myMap.size              // 3

// getting the values
myMap.get(keyString)    // "value associated with 'a string'"
myMap.get(keyObj)       // "value associated with keyObj"
myMap.get(keyFunc)      // "value associated with keyFunc"

myMap.get('a string')    // "value associated with 'a string'"
                         // because keyString === 'a string'
myMap.get({})            // undefined, because keyObj !== {}
myMap.get(function() {}) // undefined, because keyFunc !== function () {}

console.log(myMap);

const myMap1 = new Map()
myMap1.set(0, 'zero')
myMap1.set(1, 'one')

for (const [key, value] of myMap1) {
  console.log(key + ' -> ' + value)
}
// 0 = zero
// 1 = one

for (const key of myMap1.keys()) {
  console.log(key)
}
// 0
// 1

for (const value of myMap1.values()) {
  console.log(value)
}
// zero
// one

for (const [key, value] of myMap1.entries()) {
  console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one

myMap1.forEach(function(value, key) {
  console.log(key + ' = ' + value)
})
// 0 = zero
// 1 = one

const kvArray = [['key1', 'value1'], ['key2', 'value2']]

// Use the regular Map constructor to transform a 2D key-value Array into a map
const myMap2 = new Map(kvArray)

myMap2.get('key1') // returns "value1"



// Use Array.from() to transform a map into a 2D key-value Array
console.log(Array.from(myMap2)) // Will show you exactly the same Array as kvArray

// A succinct way to do the same, using the spread syntax
console.log([...myMap2])

// Or use the keys() or values() iterators, and convert them to an array
console.log(Array.from(myMap2.keys())) // ["key1", "key2"]

const original = new Map([
  [1, 'one']
])

const clone = new Map(original)

console.log(clone.get(1))       // one
console.log(original === clone) // false (useful for shallow comparison)

const first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])

const second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// Merge maps with an array. The last repeated key wins.
const merged = new Map([...first, ...second, [1, 'eins']])

console.log(merged.get(1)) // eins
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three

// Template literals
console.log('string text line 1\n' +
'string text line 2');

console.log(`string text line 1 
string text line 2`);

let a = 5;
let b = 10;
console.log('Fifteen is ' + (a + b) + ' and\nnot ' + (2 * a + b) + '.');


let c = 5;
let d = 10;
console.log(`Fifteen is ${c + d} and
not ${2 * c + d}.`);


// Spread operators
function sum(x, y, z, t) {
  return x + y + z + t;
}

const digits = [1, 2, 3, 4];
console.log(sum(...digits));
console.log(sum.apply(null, digits));

// Rest operator
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));

// Classes and objects

// let bro = {
//   firstName: "David",
//   lastName: "Smith",
//   fullName: (user) => {
//     return `${user.firstName} ${user.lastName}`;
//   }
// }
// console.log(bro.fullName(bro));
// for(let keys in bro){
//   console.log(bro[keys]);
// }

class User {
  constructor(firstName, lastName, sideHustles) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.sideHustles = sideHustles;
  }
}
let david = new User("David", "Smith", ["YouTube", "blogging"] )
fullName=() => {
  return `${this.firstName} ${this.lastName}`;
}
console.log(david);
// getters & setters
// inheritance
// promise async 


// interview challenges 

// #1 Palindrome
function isPalindrome(str) {  
  str = str.toLowerCase();  
  console.log(str.split('').reverse().join(''));
  return str === str.split('').reverse().join('');
} 
console.log(isPalindrome('racecar')) // true;isPalindrome('car') // false

// #2 Fibonacci
function fibonacci(num) {
  console.log(num)
  let result = [ 0, 1 ];
  for(let i=2; i<=num; i++){
  let prevNum1 = result[i-1];
  let prevNum2 = result[i-2];
  result.push( prevNum1 + prevNum2);
  }
  console.log(result[num]);

return result[num];
}
// Recursive
function fibonacciR(num) {
  console.log(num);
  if(num < 2){
    return num;
   }
return fibonacciR(num-1) + fibonacciR(num-2);
}
// console.log(fibonacci(7));
// console.log(fibonacciR(7));

// #3 FizzBuzz
function fizzbuzz(n) {
  for (let i = 1; i <= n; i++) {
     if (i % 3 === 0 && i % 5 === 0) {
           console.log('fizzbuzz')
         }
     else if (i % 3 === 0) {
           console.log('fizz')
        }
     else if (i % 5 === 0) {
           console.log('buzz')
        }
     else {
          console.log(i)
       }
   }
 }
fizzbuzz(20)

// #4 Anagram
const buildCharObject = str => {
  const charObj = {}
  for (let char of str.toLowerCase()) {
    charObj[char] = charObj[char] + 1 || 1
  }
return charObj
}
const anagram = (strA, strB) => {
  const aCharObject = buildCharObject(strA)
  const bCharObject = buildCharObject(strB)
 if (Object.keys(aCharObject).length !==  Object.keys(bCharObject).length) {
     return false
    }
for (let char in aCharObject) {
if (aCharObject[char] !== bCharObject[char]) {
    return false
   }
}
return true
}

console.log(anagram('fried','fired')) // true;
anagram('gainly', 'lying') //true;
anagram('listen', 'bye')  // false;

// #5 Find the Vowels
const findVowel = (str) => {
  let count = 0;
  let vowel = ['a', 'e', 'i', 'o', 'u'];
  for (let char of str.toLowerCase()) {
     if (vowel.includes(char)) {
          count++;
      }
    }
return count;
}

console.log(findVowel('hello')) // --> 2
console.log(findVowel('why')) // --> 0

// #6 String Reverse
const reverse = str => {
  str = str.toLowerCase();
  return str.split('').reverse().join('');
}
console.log(reverse("Hello")) // --> olleh

// #7 Title Case a String
function upperCaseFirst(str) {
  let valueOfFirstChar = str.charCodeAt(0);
  console.log(valueOfFirstChar);
  let upperCaseLetter = String.fromCharCode(valueOfFirstChar - 32);
  console.log(upperCaseLetter)
  let restOfString = str.slice(1);
  console.log(restOfString);
  let finalResult = upperCaseLetter + restOfString;
  console.log(finalResult);
  return finalResult;
}

function titleCase(inputStr) {
  let token = inputStr.split(' ');
  let upperCaseToken = token.map(x => upperCaseFirst(x));
  let result = upperCaseToken.join(' ');
  console.log(result)
}

titleCase('athem');

// #8 Replace One Character With Another
function replaceChar(inputStr, replaceThis, withThis) {
  let retVal = [];
  for (let i = 0; i < inputStr.length; i++) {
    if (inputStr[i] === replaceThis) {
        retVal.push(withThis)
    }
    else {
      retVal.push(inputStr[i])
    }
 }
return retVal.join('')
}

console.log(replaceChar('Hello World', 'o', 'x'))

// #9 Remove all duplicates from an array of integers
function removeDuplicate(arr) {
  let result = [...new Set(arr)];
  return result;
}
let norris = ['M','A','T','E','M','A','T','E']
console.log(removeDuplicate(norris))

// #10 Find all pairs in an array of integers whose sum is equal to a given number
let arr = [1,5,6,1,0,1];
const findSumPairs = (arr, value) => {
  let sumsLookup = {};
  let output = [];
  
  for(let i = 0; i < arr.length; i++) {
    let targetVal = value - arr[i];
    
    if(sumsLookup[targetVal]) {
      output.push([arr[i], targetVal]);
    }  
    
    sumsLookup[arr[i]] = true;
  }
  
  return output;
}
console.log(findSumPairs(arr, 6));

console.log('a');
let timmy = setTimeout(function (){
    console.log('b')
},100);


let num = 0;

async function increment(){
    num = num + await 2;
    console.log(num);
}

increment();

num = num + 1;
console.log(num);


let fe = function (a, b){
    if(arguments.length === f.length){
        console.log('Match');
    } else {
        console.log('No Match');
    }

}

fe(1);
fe(1,2);
fe(1,2,3);

