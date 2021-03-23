import React, { useState, useEffect } from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom';

import {
    readDeck,
    createCard,
} from '../utils/api';

import CardForm from "./CardForm";

function CreateCard() {
    const history = useHistory();

    const { deckId, } = useParams();

    const initState = {
        deck: {},
        card: {
            front: "",
            back: "",
        },
    }
    const [ formState, setFormState ] = useState(initState);

    useEffect(() => {
        async function fetchDeck() {
            setFormState({
                ...formState,
                deck: await readDeck(deckId),
            });
        }

        fetchDeck();
    }, []);

    const changeForm = (event) => {
        const target = event.target;
        const newValue = target.value;
        const name = target.name;
        setFormState({
            ...formState,
            card: {
                ...formState.card,
                [name]: newValue,
            },
        });
    }

    const submitHandler = () => {
        const newCard = {
            front: formState.card.front,
            back: formState.card.back,
        }
        createCard(deckId, newCard);
        history.push(`/decks/${deckId}`)
    }

    return(<section>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href={`/decks/${formState.deck.id}`}>{formState.deck.name}</a></li>
                <li class="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h3>{formState.deck.name}: Add Card</h3>
        <CardForm formState={formState} changeForm={changeForm} deckId={deckId} submitHandler={submitHandler}/>
    </section>)
}

export default CreateCard;