import React from 'react';

function CardForm({formState, changeForm, deckId, submitHandler}) {
    return(
        <form onSubmit={submitHandler}>
        <fieldset>
            <div class="mb-3">
                <label for="front" class="form-label">Front:</label>
                <textArea
                    onChange={changeForm}
                    class="form-control"
                    id="front"
                    name="front"
                    required
                    placeholder={formState.card.front}
                >{formState.card.front}</textArea>
            </div>
            <div class="mb-3">
                <label for="back" class="form-label">Back:</label>
                <textArea
                    onChange={changeForm}
                    class="form-control"
                    id="back"
                    name="back"
                    required
                    Placeholder={formState.card.back}
                >{formState.card.back}</textArea>
            </div>
            <div>
                <button type="submit" class="btn btn-primary">Save</button>
                <a href={`/decks/${deckId}`} class="btn btn-primary">Cancel</a>
            </div>
        </fieldset>
        </form>
    )
}

export default CardForm;