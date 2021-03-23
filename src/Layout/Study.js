import React, { useState, useEffect } from "react";
import {
    useParams,
    useHistory,
} from "react-router-dom";

import { listCards, readDeck, } from "../utils/api/index";

function Study() {
    const { deckId } = useParams();

    const initState = {
        currentCard: 0,
        flipped: false,
        cards: [],
        deck: {},
    }

    const [state, setstate] = useState(initState);

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            setstate({
                ...state,
                cards: await listCards(deckId),
                deck: await readDeck(deckId),
            });
        }

        fetchData();
    }, []);


    const handleFlip = () => {
        setstate({...state, flipped: true,})
    }

    const handleShowNext = () => {
        if(state.currentCard + 1 < state.cards.length) {
            if(state.flipped) {
                setstate({
                    ...state,
                    currentCard: state.currentCard + 1,
                    flipped: false,
                });
            }
        } else {
            if(window.confirm("Would you like to restart the deck? Press cancel to return home...")) {
                setstate({
                    ...state,
                    currentCard: 0,
                    flipped: false,
                });
            } else { 
                history.push("/");
            }
        }
    }
    return((state.cards && state.deck) ? 
        <section>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href={`/decks/${state.deck.id}`}>{state.deck.name}</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <div>
                <h3>Study: {state.deck.name}</h3>
                {
                state.cards.length > 2 ?
                <div class="card">
                    <h6 class="card-subtitle text-muted">Card {state.currentCard + 1} of {state.cards.length}</h6>
                    <div class="card-body">
                        <p class="card-text">{
                            state.flipped ? 
                                state.cards[state.currentCard].back
                                :
                                state.cards[state.currentCard].front
                            }</p>

                        <button
                            type="button"
                            onClick={handleFlip}
                            class="btn btn-primary"
                            disabled={state.flipped}
                        >Flip</button>

                        <button
                            class="btn btn-primary"
                            disabled={!state.flipped}
                            onClick={handleShowNext}
                        >Next</button>
                    </div>
                </div>
                :
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study.
                    There are {state.cards.length} cards in this deck.</p>
                    <a href={`/decks/${deckId}/cards/new`} class="btn btn-primary">Add Cards</a>
                </div>
                }
            </div>
        </section>
        :
        <h3>Loading...</h3>
    )
}

export default Study;