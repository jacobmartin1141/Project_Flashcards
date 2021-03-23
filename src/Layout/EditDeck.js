import React, { useState, useEffect } from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom';

import {
    readDeck,
    updateDeck,
} from "../utils/api/index";

function EditDeck() {
    const { deckId } = useParams();

    const [formState, setFormState] = useState({});

    useEffect(() => {
        async function fetchDeck() {
            
            setFormState(await readDeck(deckId));
        }
        fetchDeck();
    }, []);

    const changeForm = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleSubmit = () => {
        updateDeck({...formState});
    }

    return(<section>
        {formState.id ? <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{formState.name}</a></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <h3>Edit Deck</h3>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div class="mb-3">
                    <label for="name" class="form-label">Name:</label>
                    <input
                        onChange={changeForm}
                        value={formState.name}
                        class="form-control"
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder={formState.name}
                    ></input>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description:</label>
                    <textArea
                        onChange={changeForm}
                        value={formState.description}
                        class="form-control"
                        id="description"
                        name="description"
                        required
                        Placeholder={formState.description}
                    ></textArea>
                </div>
                <div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                    <a class="btn btn-primary" href={`/decks/${deckId}`}>Cancel</a>
                </div>
            </fieldset>
        </form>
        </div>
        :
        <div>
            <h3>Loading...</h3>
        </div>}
    </section>);
}

export default EditDeck;