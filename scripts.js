var Section = /** @class */ (function () {
    function Section(sectionName) {
        this.sectionName = sectionName;
        // Elements asignment
        var _a = [
            this.createDiv(),
            this.createDiv(),
            this.createDiv(),
            this.createDiv(),
            this.createDiv(),
            document.createElement('h1')
        ], divTittle = _a[0], div = _a[1], div2 = _a[2], line = _a[3], line2 = _a[4], tittle = _a[5];
        // Class asignments
        divTittle.classList.add('square', 'tittle'),
            div.classList.add('square'),
            div2.classList.add('square'),
            line.classList.add('line'),
            line2.classList.add('line');
        // Element nestings
        div.appendChild(line),
            div2.appendChild(line2),
            tittle.appendChild(document.createTextNode(sectionName.id.toUpperCase())),
            divTittle.appendChild(div),
            divTittle.appendChild(tittle),
            divTittle.appendChild(div2),
            sectionName.appendChild(divTittle);
    }
    Section.prototype.createDiv = function () {
        return document.createElement('div');
    };
    Section.prototype.createNote = function (noteData) {
        if (noteData.length === 1) {
            // let noteBody = this.createDiv();
            // noteBody.classList.add('character-note');
            // this.sectionName.appendChild(noteBody);
            this.formatNote(noteData[0]);
        }
        else {
            var wordBody = this.createDiv();
            wordBody.classList.add('word-note');
            this.sectionName.appendChild(wordBody);
            for (var i = 0; i < noteData.length; i++) {
                this.formatNote(noteData[i], wordBody);
            }
        }
    };
    Section.prototype.formatNote = function (noteData, wordBody) {
        var noteBody = this.createDiv();
        noteBody.classList.add('character-note');
        this.sectionName.appendChild(noteBody);
        var note = [
            {
                element: document.createElement('p'),
                elementClass: 'character'
            },
            {
                element: document.createTextNode(noteData.meaning),
                elementClass: 'meaning'
            },
            {
                element: document.createTextNode(noteData.pronunciation),
                elementClass: 'pronunciation'
            },
            { element: null, elementClass: 'space' }
        ];
        note[0].element.appendChild(document.createTextNode(noteData.character));
        for (var i = 0; i < note.length; i++) {
            this.appendElement(noteBody, note[i].element, note[i].elementClass);
        }
        if (wordBody) {
            wordBody.appendChild(noteBody);
        }
    };
    Section.prototype.appendElement = function (parent, text, classToAdd) {
        var div = document.createElement('div');
        div.classList.add('square');
        var line = document.createElement('div');
        line.classList.add('line');
        div.appendChild(line);
        if (text) {
            div.appendChild(text);
        }
        if (classToAdd) {
            div.classList.add(classToAdd);
        }
        parent.appendChild(div);
    };
    Section.prototype.inserSpace = function () {
        this.createNote([
            {
                character: null,
                meaning: null,
                pronunciation: null
            }
        ]);
    };
    return Section;
}());
document.addEventListener('DOMContentLoaded', function getWidths() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var children = sections[i].childNodes;
        for (var j = 0; j < children.length; j++) {
            if (children[j].offsetWidth) {
                if (children[j].offsetWidth > sections[i].offsetWidth) {
                    sections[i].style.width =
                        (children[j].offsetWidth + 1).toString() +
                            'px';
                    sections[i].style.flexDirection = 'row';
                }
            }
        }
    }
});
