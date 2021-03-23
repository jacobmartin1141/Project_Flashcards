import React, { useState, useEffect } from 'react';
import {
    useParams,
} from 'react-router-dom';

import {
    readDeck,
    createCard,
} from '../utils/api';

function CreateCard() {
    const { deckId, } = useParams();

    const initState = {
        deck: {},
        frontInput: "",
        backInput: "",
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
            [name]: newValue,
        });
    }

    const submitHandler = () => {
        const newCard = {
            front: formState.frontInput,
            back: formState.backInput,
        }
        createCard(deckId, newCard);
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
        <form onSubmit={submitHandler}>
            <fieldset>
                <div class="mb-3">
                    <label for="frontInput" class="form-label">Front:</label>
                    <textArea
                        onChange={changeForm}
                        value={formState.frontInput}
                        class="form-control"
                        id="frontInput"
                        name="frontInput"
                        required
                        placeholder="Front side of card"
                    ></textArea>
                </div>
                <div class="mb-3">
                    <label for="backInput" class="form-label">Back:</label>
                    <textArea
                        onChange={changeForm}
                        value={formState.backInput}
                        class="form-control"
                        id="backInput"
                        name="backInput"
                        required
                        Placeholder="Back side of card"
                    ></textArea>
                </div>
                <div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                    <a class="btn btn-primary" href={`/decks/${deckId}`}>Done</a>
                </div>
            </fieldset>
        </form>
    </section>)
}

export default CreateCard;