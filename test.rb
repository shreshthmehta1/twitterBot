puts "Hello World"

def greeting
    puts "Hello Ruby"
  end
  greeting()

  def greet(name)
    puts "hello #{name}"
  end
  greet("dave")

  def say_hello_to(name)
    return "hello #{name}"
  end
  puts say_hello_to "dave"


def add(x,y)
    puts x+y
end

def subtract(x,y)
    puts x-y
end

def multiply(x,y)
    puts x*y
end

def divide(x,y)
    puts x/y
  end

  add(5,6)