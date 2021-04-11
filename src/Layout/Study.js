import React, { useState, useEffect } from "react";
import {
    useParams,
    useHistory,
} from "react-router-dom";

import { listCards, readDeck, } from "../utils/api/index";

function Study() {
    const history = useHistory();
    const { deckId } = useParams();

    const initState = {
        currentCard: 0,
        flipped: false,
        deck: {
            name: "Loading",
            id: 420,
            cards: [],
        },
    }

    const [state, setstate] = useState(initState);

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

    return(<section>
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
                {state.deck.cards.length > 2 ?
                <div class="card">
                    <h6 class="card-subtitle text-muted">Card {state.currentCard + 1} of {state.deck.cards.length}</h6>
                        {state.flipped ? 
                            <div class="card-body">
                                <p class="card-text">{state.deck.cards[state.currentCard].back}</p>
                                <button
                                    class="btn btn-primary"
                                    onClick={handleShowNext}
                                >Next</button>
                            </div>
                            :
                            <div class="card-body">
                                <p class="card-text">{state.deck.cards[state.currentCard].front}</p>
                                <button
                                    type="button"
                                    onClick={handleFlip}
                                    class="btn btn-primary"
                                    >Flip</button>
                            </div>
                        }
                </div>
                :
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study.
                    There are {state.deck.cards.length} cards in this deck.</p>
                    <a href={`/decks/${deckId}/cards/new`} class="btn btn-primary">Add Cards</a>
                </div>
                }
            </div>
        </section>
    )
}

export default Study;