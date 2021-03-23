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
            [name]: newValue,
        });
    }

    const submitHandler = () => {
        const updatedCard = {
            id: cardId,
            front: formState.front,
            back: formState.back,
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
        <form onSubmit={submitHandler}>
            <fieldset>
                <div class="mb-3">
                    <label for="front" class="form-label">Front:</label>
                    <textArea
                        onChange={changeForm}
                        value={formState.front}
                        class="form-control"
                        id="front"
                        name="front"
                        required
                        placeholder={formState.front}
                    ></textArea>
                </div>
                <div class="mb-3">
                    <label for="backInput" class="form-label">Back:</label>
                    <textArea
                        onChange={changeForm}
                        value={formState.back}
                        class="form-control"
                        id="back"
                        name="back"
                        required
                        Placeholder={formState.back}
                    ></textArea>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Save</button>
                    <a href={`/decks/${deckId}`} class="btn btn-primary">Cancel</a>
                </div>
            </fieldset>
        </form>
        :
        <div>
            <h3>Loading...</h3>
        </div>}
    </section>)
}

export default EditCard;