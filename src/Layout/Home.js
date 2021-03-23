import React, { useEffect, useState }  from "react";
import {
    listDecks,
    listCards,
    deleteDeck,
} from "../utils/api/index";

function DisplayDeck({deck}) {
    const [cards, setCards] = useState([]);

    const deleteHandler = () => {
        if(window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(deck.id);
        }
    }

    useEffect(() => {
        async function fetchCards() {
            setCards(await listCards(deck.id));
        }
        fetchCards();
    }, []);

    return(
        <div class="card">
            <h5 class="card-header">{deck.name}: {cards.length} cards</h5>
            <div class="card-body">
                <p class="card-text">{deck.description}</p>

                <a type="button" href={`/decks/${deck.id}`} class="btn btn-primary">View</a>

                <a type="button" href={`/decks/${deck.id}/study`} class="btn btn-primary">Study</a>

                <a type="button" href={`/decks/${deck.id}/edit`} class="btn btn-primary">Edit</a>
                
                <button type="button" onClick={deleteHandler} class="btn btn-danger">Delete</button>
            </div>
        </div>);
};

function Home() {
    const [state, setState] = useState({});

    useEffect(() => {
        async function fetchDecks() {
            setState({...state, data: await listDecks()});

        }

        fetchDecks();
    }, []);

    useEffect(() => {
        if(state.data) {
            const updatedDecks = state.data.map((deck) => {
                return <DisplayDeck deck={deck} />;
            });

            setState({...state, decks: updatedDecks})
        }
    }, [state.data])

    return (<section>
        <a type="button" class="btn btn-primary" href="/decks/new">Create Deck</a>
        {state.decks ?
            state.decks
        : 
            <h3>Loading...</h3>
        }
        </section>);
}

export default Home;