import React, { useState, useEffect } from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom';

import {
    readDeck,
    readCard,
    updateCard,
} from '../utils/api';

import CardForm from "./CardForm.js";

function EditCard() {
    const history = useHistory();

    const { deckId, cardId } = useParams();

    const [ formState, setFormState ] = useState({});

    useEffect(() => {
        async function fetchData() {
            setFormState({
                ...formState,
                card: await readCard(cardId),
                deck: await readDeck(deckId),
            });
        }

        fetchData();
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
        const updatedCard = {
            id: cardId,
            front: formState.card.front,
            back: formState.card.back,
            deckId: deckId,
        }
        updateCard(updatedCard);
        history.push(`/decks/${deckId}`);
    }

    return(<section>
        {formState.deck ?
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href={`/decks/${formState.deck.id}`}>{formState.deck.name}</a></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>
        :
        <h3>Loading...</h3>}
        {formState.card ? 
            <CardForm formState={formState} changeForm={changeForm} deckId={deckId} submitHandler={submitHandler} />
        :
        <div>
            <h3>Loading...</h3>
        </div>}
    </section>)
}

export default EditCard;