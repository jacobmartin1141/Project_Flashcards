import React, { useEffect, useState }  from "react";
import {
    listDecks,
    listCards,
    deleteDeck,
} from "../utils/api/index";

function DisplayDeck({deck, cards}) {
    
    const deleteHandler = () => {
        if(window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(deck.id);
        }
    }

    return(<div key={deck.id}>
            <div class="card">
                <h5 class="card-header">{deck.name}</h5>
                <h6>{deck.cards.length} cards</h6>
                <div class="card-body">
                    <p class="card-text">{deck.description}</p>

                    <a type="button" href={`/decks/${deck.id}`} class="btn btn-primary">View</a>

                    <a type="button" href={`/decks/${deck.id}/study`} class="btn btn-primary">Study</a>

                    <a type="button" href={`/decks/${deck.id}/edit`} class="btn btn-primary">Edit</a>
                
                    <button type="button" onClick={deleteHandler} class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>);
};

function Home() {
    const [state, setState] = useState({cards: []});

    useEffect(() => {
        async function fetchDecks() {
            const decks = await listDecks();
            
            setState({
                decks: decks,
            });
        }

        fetchDecks();
    }, []);

    return (<section>
        <a type="button" className="btn btn-primary" href="/decks/new">Create Deck</a>
        {state.decks !== undefined ?
            <div name="HERE!">{state.decks.map((deck) => {
                return <DisplayDeck deck={deck} />;
            })}</div>
        : 
            <h6>No decks created!</h6>
        }
        </section>);
}

export default Home;