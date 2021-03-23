import React, { useEffect, useState }  from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom';

import {
    readDeck,
    listCards,
    deleteDeck,
    deleteCard,
} from "../utils/api/index";

function DisplayCard({ deck, card, cards, cardRemoval }) {
    
    const deleteCardHandler = () => {
        if(window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(card.id);
            cardRemoval(cards, card);
        }
    }

    return(
        <div class="card">
            <div class="card-body">
                
                <p class="card-text">{card.front}</p>

                <p class="card-text">{card.back}</p>

                <a type="button" href={`/decks/${deck.id}/cards/${card.id}/edit`} class="btn btn-primary">Edit</a>

                <button type="button" onClick={deleteCardHandler} class="btn btn-danger">Delete</button>
            </div>
        </div>);
}

function Deck() {
    const history = useHistory();
    const { deckId } = useParams();

    const initState = {
        deck: {},
        cards: [],
        displayCards: [],
    }
    const [state, setState] = useState(initState);
    
    function generateDisplayCards(cardList = []) {
        return cardList.map((card) => {
            return <DisplayCard deck={state.deck} card={card} cards={state.cards} cardRemoval={cardRemovalHandler} />
        });
    }

    useEffect(() => {
        async function fetchData() {
            setState({
                ...state,
                deck: await readDeck(deckId),
                cards: await listCards(deckId),
            });
        }

        fetchData();
    }, []);

    useEffect(() => {
        setState({
            ...state,
            displayCards: generateDisplayCards(state.cards),
        });
    }, [state.cards]);

    const cardRemovalHandler = (allCards, cardForRemoval) => {
        const newCardList = allCards.map((card) => {
            if(card !== cardForRemoval) return card;
        });

        setState({
            ...state,
            cards: newCardList,
        });
        history.go(0);
    }

    const deleteDeckHandler = () => {
        if(window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(deckId).then(history.push("/"));
            
        }
    }

    return(<section>
        {state.deck.name ? <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{state.deck.name}</li>
                </ol>
            </nav>

            <h3>{state.deck.name}</h3>
            
            <p>{state.deck.description}</p>
            
            <a type="button" href={`/decks/${state.deck.id}/study`} class="btn btn-primary">Study</a>
            
            <a type="button" href={`/decks/${state.deck.id}/edit`} class="btn btn-primary">Edit</a>
            
            <a type="button" href={`/decks/${state.deck.id}/cards/new`} class="btn btn-primary">Add Cards</a>

            <button type="button" onClick={deleteDeckHandler} class="btn btn-danger">Delete</button>

            {state.displayCards ? 
            <div>
                {state.displayCards.length !== 0 ? 
                    <div>
                        <h3>Cards</h3>
                        {state.displayCards}
                    </div>
                :
                    <h3>No cards created yet!</h3>
                }
            </div>
            :
            <div>
                <h3>Loading...</h3>
            </div>}
        </div>
        :
        <div>
            <h3>Loading...</h3>
        </div>}
    </section>);
}

export default Deck;