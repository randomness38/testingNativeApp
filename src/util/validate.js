const validate = values => {
    const errors = {};
    if (!values.deckTitle) {
        errors.deckTitle = "Required";
    }
    if (!values.cards || !values.cards.length) {
        errors.cards = { _error: "At least one card must be entered" };
    } else {
        const cardsArrayErrors = [];
        values.cards.forEach((card, cardIndex) => {
            const cardErrors = {};
            if (!card || !card.question) {
                cardErrors.question = "Required";
                cardsArrayErrors[cardIndex] = cardErrors;
            }
            if (!card || !card.answer) {
                cardErrors.answer = "Required";
                cardsArrayErrors[cardIndex] = cardErrors;
            }

            if (!card.opts || !card.opts.length) {
                cardErrors.opts = { _error: "At least one opt must be entered" };
                cardsArrayErrors[cardIndex] = cardErrors;
            }
            if (card && card.opts && card.opts.length) {
                const optArrayErrors = [];
                card.opts.forEach((opt, optIndex) => {
                    if (!opt || !opt.length) {
                        optArrayErrors[optIndex] = "Required";
                    }
                });
                if (optArrayErrors.length) {
                    cardErrors.opts = optArrayErrors;
                    cardsArrayErrors[cardIndex] = cardErrors;
                }
                if (card.opts.length > 4) {
                    if (!cardErrors.opts) {
                        cardErrors.opts = [];
                    }
                    cardErrors.opts._error = "No more than four opts allowed";
                    cardsArrayErrors[cardIndex] = cardErrors;
                }
            }
        });
        if (cardsArrayErrors.length) {
            errors.cards = cardsArrayErrors;
        }
    }



    return errors;
};

export default validate;
