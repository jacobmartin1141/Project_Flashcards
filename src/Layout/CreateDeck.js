import React, { useState, } from 'react';
import {
    useHistory,
} from "react-router-dom";

import {
    createDeck,
} from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();

    const initState = {
        nameInput: "",
        descInput: "",
    }
    const [formState, setFormState] = useState(initState);

    const changeForm = (event) => {
        const target = event.target;
        const newValue = target.value;
        const name = target.name;
        setFormState({
            ...formState,
            [name]: newValue,
        });
    }

    const handleSubmit = () => {
        async function submit() {
            const newDeck = {
                name: formState.nameInput,
                description: formState.descInput,
            }
            const deck = await Promise.resolve(createDeck(newDeck));
            history.push(`/decks/${deck.id}`);
        }

        submit();
    }

    return(<section>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <h3>Create Deck</h3>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div class="mb-3">
                    <label for="nameInput" class="form-label">Name:</label>
                    <input
                        onChange={changeForm}
                        value={formState.nameInput}
                        class="form-control"
                        id="nameInput"
                        type="text"
                        name="nameInput"
                        required
                        placeholder="What should this deck be named?"
                    ></input>
                </div>
                <div class="mb-3">
                    <label for="descInput" class="form-label">Description:</label>
                    <textArea
                        onChange={changeForm}
                        value={formState.descInput}
                        class="form-control"
                        id="descInput"
                        name="descInput"
                        required
                        Placeholder="What is this deck generally about?"
                    ></textArea>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-primary">Reset</button>
                    <a type="button" href="/" class="btn btn-primary">Cancel</a>
                    {//onClick={history.push("/")
                        }
                </div>
            </fieldset>
        </form>
    </section>);
}

export default CreateDeck;