require 'httparty'

Signal.trap("INT") do
  puts "\nExiting gracefully..."
  exit
end

def clr
  puts "
╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳╮
┃╭━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭━━┫┃\e[34mGithub\e[32m
┃╰━━┳╮╭┳━┳━━┳━━┳━╮┃╰━━┫┃╭╮╱╭┳━╮╭━╮
┃╭━━┫┃┃┃╭┫╭╮┃╭╮┃╭╮┫╭━━┫┃┃┃╱┃┃╭╮┫╭╮╮
┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃┃╱╱┃╰┫╰━╯┃┃┃┃┃┃┃
╰╯╱╱╰━━┻╯╰━╮┣━━┻╯╰┻╯╱╱╰━┻━╮╭┻╯╰┻╯╰╯
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╭━╯┃\e[0mUsername
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╱╱╱╱╱╰━━╯\e[33mChecker

\e[32m[+] Type \"cl\" to clear the screen\e[0m
  "
end

def check_username(username)
  response = HTTParty.get("https://github.com/#{username}", headers: { 'User-Agent' => 'Ruby' })
  if response.code == 404
    puts "\e[32mUsername \"#{username}\" is available.\e[0m"
    ask_for_another_username
  else
    puts "\e[31mUsername \"#{username}\" is already taken.\e[0m"
    ask_for_username
  end
rescue HTTParty::ResponseError => e
  puts "Error: #{e.message}"
  ask_for_username
end

def ask_for_another_username
  print 'Enter another username or type "exit" to quit: '
  input = gets.chomp
  if input.downcase == 'exit'
    puts "Exiting..."
    exit
  else
    check_username(input)
  end
end

def ask_for_username
  print 'Enter a GitHub username to check: '
  input = gets.chomp
  if input.downcase == 'cl'
    system('clear') || system('cls')
    ask_for_username
  else
    check_username(input)
  end
end

clr
ask_for_username

