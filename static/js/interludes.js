/* NOTE TO THOSE INSPECTING THE SOURCE CODE:
The source code here contains plaintext spoilers for the Interludes puzzles.
Please don't read any further if you want to try the puzzles without being spoiled.
You have been warned!




































*/
//# for Music
NOTE = '♩'
SHARP = '♯'
FLAT = '♭'
//REST = '𝄽'
REST = ','
REST_SVG = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="12" height="25"> \
  <defs id="defs1363"/> \
  <g id="layer1"> \
    <g transform="translate(-175.719,-572.005)" style="fill:#000000;fill-opacity:1" id="g3008"> \
      <path d="M 181.69909,588.76398 C 182.47362,589.08988 182.3797,590.46481 181.42371,589.80261 C 180.70644,588.91354 179.33831,588.14481 178.34093,589.11155 C 177.5139,589.8776 177.78694,591.27023 178.71609,591.81509 C 179.37044,591.94893 179.86732,593.05704 178.79518,592.642 C 177.25015,592.11543 175.60062,590.79176 175.7257,588.99985 C 175.70261,587.7787 176.9577,587.02175 178.07209,587.106 C 178.52013,586.94555 179.75824,587.58632 179.70251,587.30253 C 178.94921,586.14553 178.08957,585.05126 177.41509,583.84762 C 177.17661,583.12078 177.69942,582.42905 177.9199,581.7502 C 178.39967,580.55313 178.93636,579.37651 179.37409,578.16438 C 179.41525,577.41801 178.75249,576.88912 178.40914,576.2772 C 178.01153,575.64334 177.49169,575.07309 177.20209,574.38225 C 177.22225,573.50455 178.13012,574.48596 178.37637,574.84393 C 179.45036,576.11832 180.57945,577.34906 181.61509,578.65383 C 182.30749,579.4973 181.66158,580.48525 181.32581,581.32734 C 180.82735,582.58309 180.19033,583.79167 179.82409,585.09323 C 179.77639,586.1646 180.5603,587.05185 181.06346,587.94062 C 181.25685,588.22883 181.47282,588.50112 181.69909,588.76398 z " style="fill:#000000;fill-opacity:1" id="path3010"/> \
    </g> \
  </g> \
</svg>'

//# for Classics
LOREM_IPSUM = 'Lorem ipsum olor sit amet, consectetr adipiscing elit, ed do eusod tempr incidiunt t labre et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

function econ(request)
{  
  re = /[^A-Z]/g
  guess = request.toUpperCase().replace(re,'')
    len_11_guess = guess.substr(0,11)
    currencies = [
        'Argentine Peso',
        'British Pound',
        'Chinese Yuan',
        'Danish Krone',
        'Hungarian Forint',
        'Israeli Shekel',
        'Japanese Yen',
        'Kazakhstani Tenge',
        'Libyan Dinar',
        'Malaysian Ringgit',
        'New Zealand Dollar',
    ]
    answer = 'DATATRADING'
    res = []
    for (i = 0; i < len_11_guess.length; i++)
    {
        num = len_11_guess.charCodeAt(i) - 'A'.charCodeAt(0) + 1
        den = answer.charCodeAt(i) - 'A'.charCodeAt(0) + 1
        dec = (num/den).toFixed(4)
        res.push([currencies[i], dec])
    }
    
    return res

}

function music(request)
{
  re = /[^A-Z]/g
  guess = request.toUpperCase().replace(re,'')
  len_15_guess = guess.substr(0,15)
  for (i = len_15_guess.length; i < 15; i++)
  {
    len_15_guess += REST
  }
  answer = 'TAMAMONOMAEWEST'
  res = []
  for (i = 0; i < 15; i++)
  {
    if (len_15_guess[i] == REST)
    {
      res.push(REST)
    }
    else if (len_15_guess[i] < answer[i])
    {
      res.push(NOTE+FLAT);
    }
    else if (len_15_guess[i] == answer[i])
    {
      res.push(NOTE)
    }
    else
    {
      res.push(NOTE+SHARP)
    }
  }

  return res.join('&emsp;').replaceAll(REST,REST_SVG);
}

function english(request)
{

  re = /[^A-Z\s,]/g
  guess = request.toUpperCase().replace(re,'')
  words = guess.split(/(?:[,\s]+)/);
  distinct = {}
  for (i = 0; i < words.length; i++)
  {
    distinct[words[i]] = true;
  }
  words = Object.keys(distinct)
  table1_nonspecial = []
  table2_nonspecial = []
  for (i = 0; i < words.length; i++)
  {
    if (words[i] != 'NEGATIVE')
    {
      table1_nonspecial.push(words[i])
    }

    
    if (words[i] != 'DOUBLES')
    {
      table2_nonspecial.push(words[i])
    }
  }

  table1_nonspecial.push('NEGATIVE')
  table2_nonspecial.push('DOUBLES')
  table1_nonspecial.sort()
  table2_nonspecial.sort()
  table1_idx = table1_nonspecial.indexOf('NEGATIVE')
  table2_idx = table2_nonspecial.indexOf('DOUBLES')
  col1 = []
  col2 = []
  col3 = []
  col4 = []
  if (table1_idx >= 1)
  {
    col1 = table1_nonspecial.slice(0, table1_idx)
    col1.reverse()
  }

  col2 = table1_nonspecial.slice(table1_idx + 1)
  
  if (table2_idx >= 1)
  {
    col3 = table2_nonspecial.slice(0, table2_idx)
    col3.reverse()
  } 

  col4 = table2_nonspecial.slice(table2_idx + 1)
  num_rows = Math.max(col1.length, col2.length, col3.length, col4.length)

  res = {'numNonHeaderRows': num_rows, 'col1': col1, 'col2': col2, 'col3': col3, 'col4': col4}
  if ('NEGATIVE' in distinct)
  {
      res['header1'] = 'NEGATIVE'
  }
  if ('DOUBLES' in distinct)
  {
      res['header2'] = 'DOUBLES'
  }
  return res
}


function distance(c1, c2)
{
  return Math.abs(c1.charCodeAt(0) - c2.charCodeAt(0))
}

function history(guesses)
{
  re = /[^A-Z]/g
  most_recent_guess = guesses[guesses.length-1].toUpperCase().replace(re,'')
  answer = 'UNHOLYPREDATERS'

  if (most_recent_guess.length != answer.length)
  {
    return {'error': 'Your guess must be 15 letters.'}
  }
  
  res = []
  if (most_recent_guess == answer)
  {
      for (i = 0; i < answer.length; i++)
      {
        res.push('green')
      }
      return {'output': res}
  }

  valid_guesses = []
  for (i = 0; i < guesses.length; i++)
  {
    if (guesses[i].length == 15)
    {
      valid_guesses.push(guesses[i])
    }
  }
  
  second_most_recent_guess = valid_guesses[valid_guesses.length - 2].toUpperCase()
  for (i = 0; i < answer.length; i++)
  {
    most_recent_dist = distance(most_recent_guess[i], answer[i])
    second_most_recent_dist = distance(second_most_recent_guess[i], answer[i])
    if (most_recent_dist == second_most_recent_dist)
    {
      res.push('')
    }
    else if (most_recent_dist > second_most_recent_dist)
    {
      res.push('blue')
    }
    else
    {
      res.push('red')
    }
  }
  return {'output':res}
}

function csNormalizer(guess)
{
  guess = guess.toUpperCase()
  transformed_result=''
  if (guess.length < 2)
  {
    transformed_result = ''
  }
  else
  {
    for (i = 0; i < guess.charCodeAt(0) - 'A'.charCodeAt(0) + 1; i++)
    {
      transformed_result += guess[1]
    }
    latter = guess.slice(2)
    latter = latter.split("").reverse().join("")
    transformed_result += latter
  }

  return transformed_result;
}

function cs(guess)
{
  transformed_result = csNormalizer(guess);
  if (transformed_result == 'BUGS')
  {
      return {'output': 'BUGS is correct!'}
  }
  return {'output': 'Sorry, '+transformed_result+' is incorrect.'}
}


function math(body)
{
  res = []
  coeffs = [23, 5, 18, 5, 14, 21, 13, 2, 5, 18, 15, 14, 5]
  a2m = 'abcdefghijklm'
  for (i = 0; i < 13; i++)
  {
    c = a2m[i]
    if (c in body)
    {
      num = parseInt(body[c])
      if (isNaN(num))
      {
        return {'error': 'Expected input for '+c.toUpperCase() + ' to be an integer, but it was not.'}
      }

      res.push(coeffs[i] * num)
    }
    else
    {
      return {'error': 'Expected field '+c.toUpperCase()+' to be present, but it was not.'}
    }
  }

  res = res.sort(function(a,b){
    return a - b
})

  output = []
  for (i = 0; i < res.length; i++)
  {
    output.push(res[i].toString())
  }
  return {'output': '{' + output.join(', ') + '}'}
}


function classics(guess)
{
  re = /[^A-Z\s,]/g
  guess = guess.toUpperCase().replace(re,'')

  output = LOREM_IPSUM
  offset = 0
  answer = 'dusimoduo'
  for (i = 0; i < Math.min(guess.length, 9); i++)
  {
    offset += guess.charCodeAt(i) - 'A'.charCodeAt(0)
    newoutput = output.slice(0,offset) + answer[i] + output.slice(offset)
    output=newoutput
    offset += 1
  }
  return {'output':output}
}

function sociology(guess)
{
  guess = guess.toUpperCase()

        res = []
        post_and_letter = [
            ['1 friend reacted with :bloom: 🌸', 'B'],
            ['1 friend reacted with :convergence: 🤝', 'U'],
            ['1 friend reacted with :convocation: 🎓', 'O'],
            ['1 friend reacted with :delegation: 💼', 'L'],
            ['1 friend reacted with :flamboyance: 🕺', 'L'],
            ['1 friend reacted with :murder: 🔪', 'H'],
            ['1 friend reacted with :ostentation: 💸', 'S'],
            ['1 friend reacted with :parliament: 🧑‍⚖️', 'E'],
            ['1 friend reacted with :piteousness: 🥺', 'O'],
            ['1 friend reacted with :pride: 🤗', 'L'],
            ['1 friend reacted with :shrewdness: 🧠', 'S'],
            ['1 friend reacted with :sleuth: 🕵', 'C'],
            ['1 friend reacted with :watch: ⌚', 'I']
        ]
        for (i = 0; i < post_and_letter.length; i++)
        {
          if (guess.indexOf(post_and_letter[i][1]) >=0)
          {
            res.push(post_and_letter[i][0])
          }
        }
        res.unshift(res.length.toString() + ' friend(s) liked your post!')
        return {'output': res}
  }