import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./responsive.css";

const LOCAL_STORAGE_KEY = "joke";

function App() {
  interface Joke {
    language: string;
    text: string;
  }

  const [currentJoke, setCurrentJoke] = useState<string>("");
  const [jokes, setJokes] = useState<string[]>([]);

  useEffect(() => {
    loadJokes();
  }, []);

  async function generateJoke() {
    const index: number = 0;
    const getJoke = await fetch("https://witzapi.de/api/joke");
    const joke: Joke[] = await getJoke.json();
    setCurrentJoke(joke[index].text);
  }

  function addJoke() {
    const newJokeMessage: string =
      "Klicke auf neuer Witz um dir einen neuen Witz anzeigen zulassen.";
    const existingJokeMessage: string = "Der Witz existiert bereits.";
    const existingJoke = jokes.find((joke) => {
      return joke === currentJoke;
    });

    if (currentJoke === "") {
      alert(newJokeMessage);
    } else if (existingJoke === currentJoke) {
      alert(existingJokeMessage);
    } else {
      const newJokes: string[] = [currentJoke, ...jokes];
      console.log(newJokes);
      setJokes(newJokes);
      setJokesInStorage(newJokes);
      setCurrentJoke("");
    }
  }

  /*  !!!!!!!!!!!!!!!!! ACHTUNG ACHTUNG ACHTUNG !!!!!!!!!!!!!!!!!!!

      so wie es in dieser Anwendung der Fall ist, ist es möglich/kann man die Wirkung erzielen über Parameter die an eine Funktion übergeben 
      werden die von anderen Funktion kommen, den Inhalt womöglich zu aktualisieren

      in diesem Beispiel ist es der Fall das zum Beispiel der Wert jokes der sich in den () runden Klammern befindet so zusagen geupdatet wird
      wenn von der function addJokes der Funktionsaufruf setJokesInStorage kommt ++++ jokesSessionStorage was als Parameter an die Funktion 
      setJokesInStorage übergeben wird

      der gleiche Fall ist es auch wenn die function setJokesInStorage von der function deleteJoke aufgerufen wird und der neue aktuelle Standt
      an die function setJokesInStorage mit dem Parameter newJokeArray an die function setJokesInStorage übergeben wird
  
  */

  function setJokesInStorage(jokes: string[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jokes));
  }

  function loadJokes() {
    const getJokes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (getJokes !== null) {
      setJokes([...JSON.parse(getJokes), ...jokes]);
    }
  }

  function deleteJoke(joke: string) {
    const updateJokeArray: string[] = jokes.filter((item) => {
      return item !== joke;
    });
    console.log(updateJokeArray);
    setJokes([...updateJokeArray]);
    setJokesInStorage(updateJokeArray);
  }

  return (
    <>
      <div className="joke-head-container">
        <span className="joke-head-container__smiley-emoji-left">
          &#128514;
        </span>
        <span className="joke-head-container__headline">Witze Generator</span>
        <span className="joke-head-container__smiley-emoji-right">
          &#128514;
        </span>
      </div>

      <div className="joke-button-container">
        <button onClick={generateJoke} className="button generateJoke">
          <span className="generate-joke__clown-emoji-left">&#129313;</span>
          <span className="generate-joke__text"> Neuer Witz</span>
          <span className="generate-joke__clown-emoji-right">&#129313;</span>
        </button>
        <button onClick={addJoke} className="button addJoke">
          <span className="addJoke__star-emoji">&#127775;</span>
        </button>
      </div>
      <h3 className="joke-show-element">{currentJoke || "-"}</h3>
      <div className="joke-list-section">
        <section className="joke-list-head-section">
          <span className="joke-list-section__headline-star-emoji">
            &#127775;
          </span>
          <h3 className="joke-list-section__joke-headline"> Liste</h3>
        </section>
        <div>
          {jokes.map((joke) => {
            return (
              <div className="joke-div">
                <p className="joke">{joke}</p>
                <button
                  onClick={() => {
                    deleteJoke(joke);
                  }}
                  className="button deleteJoke"
                >
                  <span className="deleteJoke__garbagecan-emoji">
                    &#128465;
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  /*
      
  
  */
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
