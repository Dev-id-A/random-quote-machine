import { useEffect, useState } from 'react'
import './App.css'
import $ from 'jquery'


function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [abled, setAbled] = useState(false);

  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  


  const obtainQuote = async () =>{
    try{
      const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      const data = await response.json()
      
      const randomIndex = Math.floor(Math.random() * (data.quotes.length))
      setQuote(data.quotes[randomIndex].quote);
      setAuthor(data.quotes[randomIndex].author);

    }
      catch (err){
        alert("We don't have any quotes for you :(");
      }
      finally{
        setAbled(false);
      }
  }

  const slowQuote = () =>{
    if(!abled){
      $("#text").fadeOut(1000);
      $("#author").fadeOut(1000);
    setTimeout(()=>{
      $("#text").fadeIn(1000);
      $("#author").fadeIn(1000);
      $("body").css("background-color", `rgb(${red}, ${green}, ${blue})`)
    }, 1000);
    setAbled(true);
    setTimeout(()=>obtainQuote(),1001);
    }
  }

  useEffect(()=>{
    obtainQuote();
    $("body").css("background-color", `rgb(${red}, ${green}, ${blue})`);
  }, [])

  
  return (
    <div id="quote-box">
      <div id="inner-quote">
      <h2 id="text">{quote}</h2>
      </div>
        <h4 id="author">-{author}</h4>
        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank"><i class="bi bi-twitter-x"></i></a>
        <button onClick={slowQuote} type="button" className="btn btn-primary" id="new-quote" disabled={abled}>New quote</button>
    </div>
  )
}

export default App
