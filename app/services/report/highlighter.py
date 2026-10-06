def highlight_sentences(sentences, scores, threshold=0.20, highlight_class="plagiarized"):

    highlighted_text = ""

    for sentence, score in zip(sentences, scores):

        if score >= threshold:
            highlighted_text += f'<span class="{highlight_class}">{sentence}</span> '
        else:
            highlighted_text += sentence + " "

    return highlighted_text
