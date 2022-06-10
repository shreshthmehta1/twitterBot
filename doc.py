# raw strings
print('C:\some\name')
print(r'C:\some\name')

# span multiple lines
print("""\
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
""")

# concatenate -> +, repeat -> * 
print( 3 * 'un' + 'ium')

text = ('Put several strings within parentheses '
         'to have them joined together.')
print(text)

word = 'Python'
print(word[0])
print(word[-1])
print(word[-6])
print(word[0:2])
print(word[2:5])
print(word[:2] + word[2:])
# print(word[42]) will throw error 

# strings cannot be changed — they are immutable 

s = 'supercalifragilisticexpialidocious'
print(len(s))

#lists
squares = [1, 4, 9, 16, 25]
print(squares)
print(squares[0])
print(squares[-1])
print(squares[-3:])
print(squares[:])
print(squares + [36, 49, 64, 81, 100])

# lists are a mutable type
cubes = [1, 8, 27, 65, 125]
cubes[3] = 64
print(cubes)
cubes.append(216)
print(cubes)
cubes.append(7 ** 3)
print(cubes)
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
print(letters)

# replace some values
letters[2:5] = ['C', 'D', 'E']
print(letters)
letters[2:5] = []
print(letters)
letters[:] = []
print(letters)

letters = ['a', 'b', 'c', 'd']
print(len(letters))

#  nest lists
a = ['a', 'b', 'c']
n = [1, 2, 3]
x = [a, n]
print(x)

# Fibonacci series:
# the sum of two elements defines the next

a, b = 0, 1
while a < 1000:
     print(a,end=',')
     a, b = b, a+b


# control flow tools
# if statement
x = int(input("Please enter an integer: "))
if x < 0:
     x = 0
     print('Negative changed to zero')
elif x == 0:
     print('Zero')
elif x == 1:
     print('Single')
else:
     print('More')

# for statement
words = ['cat', 'window', 'defenestrate']

for w in words:
     print(w, len(w))

users = {'Hans': 'active', 'Éléonore': 'inactive', '景太郎': 'active'}     
# Strategy:  Iterate over a copy
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

print(users)        

# Strategy:  Create a new collection
active_users = {}
for user, status in users.items():
    if status == 'active':
        active_users[user] = status
        
print(users)

# range
for i in range(5):
    print(i)

print(list(range(5, 10)))
print(list(range(0, 10, 3)))
print(list(range(-10, -100, -30)))

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
     print(i, a[i])

print(sum(range(4)))

# break
for n in range(2, 10):
     for x in range(2, n):
         if n % x == 0:
             print(n, 'equals', x, '*', n//x)
             break
     else:
         # loop fell through without finding a factor
         print(n, 'is a prime number')

# continue
for num in range(2, 10):
     if num % 2 == 0:
         print("Found an even number", num)
         continue
     print("Found an odd number", num)

# pass
while True:
     pass  # Busy-wait for keyboard interrupt (Ctrl+C)
     break

def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 418:
            return "I'm a teapot"
        case 401 | 403 | 404:
            return "Not allowed"

output_http = http_error(400)
print(output_http)

point = (0,0)
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"Y={y}")
    case (x, 0):
        print(f"X={x}")
    case (x, y):
        print(f"X={x}, Y={y}")
    case _:
        raise ValueError("Not a point")

class Point:
    x: int
    y: int

def where_is(point):
    match point:
        case Point(x=0, y=0):
            print("Origin")
        case Point(x=0, y=y):
            print(f"Y={y}")
        case Point(x=x, y=0):
            print(f"X={x}")
        case Point():
            print("Somewhere else")
        case _:
            print("Not a point")

# print(Point())

# write Fibonacci series up to n
def fib(n):    
     a, b = 0, 1
     while a < n:
         print(a, end=' ')
         a, b = b, a+b
     print()

fib(2000)

def fib2(n):  
     """Return a list containing the Fibonacci series up to n."""
     result = []
     a, b = 0, 1
     while a < n:
         result.append(a)  
         a, b = b, a+b
     return result

f100 = fib2(100)
print(f100)                

def ask_ok(prompt, retries=4, reminder='Please try again!'):
    while True:
        ok = input(prompt)
        if ok in ('y', 'ye', 'yes'):
            return True
        if ok in ('n', 'no', 'nop', 'nope'):
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError('invalid user response')
        print(reminder)

output_ask_ok = ask_ok('Do you really want to quit?')
print(output_ask_ok)

output_ask_ok2 = ask_ok('OK to overwrite the file?', 2)
print(output_ask_ok2)

output_ask_ok3 = ask_ok('OK to overwrite the file?', 2, 'Come on, only yes or no!')
print(output_ask_ok3)

# scope
i = 5
def f(arg=i):
    print(arg)
i = 6
print(f())

# accumulation
def f(a, L=[]):
    L.append(a)
    return L

print(f(1))
print(f(2))
print(f(3))

# no accumulation 
def f1(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L

print(f1(1))
print(f1(2))
print(f1(3))

# Keyword Arguments
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")

parrot(1000) 
parrot(voltage=1000)                                
parrot(voltage=1000000, action='VOOOOOM')           
parrot(action='VOOOOOM', voltage=1000000)           
parrot('a million', 'bereft of life', 'jump')       
parrot('a thousand', state='pushing up the daisies')

# invalid
'''
parrot()                     
parrot(voltage=5.0, 'dead')  
parrot(110, voltage=220)     
parrot(actor='John Cleese')
'''
def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])

cheeseshop("Limburger", "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin",
           client="John Cleese",
           sketch="Cheese Shop Sketch")

#def f5(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):

# Unpacking Argument Lists
args = [3, 6]
print(list(range(*args)))

# Data Structures

# lists as stacks last in first out
stack = [3, 4, 5]
stack.append(6)
print(stack)
stack.pop()
print(stack)

# Using Lists as Queues
from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")
queue.append("Graham") 
print(queue)
queue.popleft()
print(queue)


# Tuples and Sequences Tuples are immutable
t = 12345, 54321, 'hello!'
u = t, (1, 2, 3, 4, 5)
print(u)

# Sets
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)

a = set('abracadabra')
b = set('alacazam')
print(a-b)
print(a | b)
print(a & b)
print(a ^ b)

# Dictionaries
tel = {'jack': 4098, 'sape': 4139}
tel['guido'] = 4127
print(tel)
list(tel)

# Looping Techniques
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)

for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)

questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
    print('What is your {0}?  It is {1}.'.format(q, a))

basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for z in sorted(basket):
    print(z)

#syntax error 
#while True print('Hello world')

while True:
     try:
         x = int(input("Please enter a number: "))
         break
     except ValueError:
         print("Oops!  That was no valid number.  Try again...")

class B(Exception):
    pass

class C(B):
    pass

class D(C):
    pass

for cls in [B, C, D]:
    try:
        raise cls()
    except D:
        print("D")
    except C:
        print("C")
    except B:
        print("B")