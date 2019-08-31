var Section = /** @class */ (function () {
    function Section(sectionName, spaces) {
        this.sectionName = sectionName;
        this.spaces = spaces;
        this.keepRow = false;
        // Global constants
        this.row = this.createDiv();
        this.row.classList.add('row');
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
    Section.prototype.charNote = function (noteData, classes) {
        this.setRow();
        if (classes) {
            this.formatNote('character', noteData, classes);
        }
        else {
            this.formatNote('character', noteData);
        }
    };
    Section.prototype.wordNote = function (noteData, wordMeaning, classes) {
        this.setRow();
        var wordBody = this.createDiv();
        wordBody.classList.add('word-note');
        this.row.appendChild(wordBody);
        for (var i = 0; i < noteData.length; i++) {
            if (classes) {
                this.formatNote('word', noteData[i], wordBody, classes);
            }
            else {
                this.formatNote('word', noteData[i], wordBody);
            }
        }
        this.formatNote('word-meaning', null, wordBody, null, wordMeaning);
    };
    Section.prototype.formatNote = function (type, noteData, wordBody, classes, wordMeaning) {
        var noteBody = this.createDiv();
        this.row.appendChild(noteBody);
        var note;
        switch (type) {
            case 'character':
                noteBody.classList.add('character-note');
                note = [
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
                break;
            case 'word':
                noteBody.classList.add('word-character-note');
                var characterTag = document.createElement('p');
                var pronunciationTag = document.createElement('p');
                characterTag.appendChild(document.createTextNode(noteData.character));
                pronunciationTag.appendChild(document.createTextNode(noteData.pronunciation));
                this.appendElement(noteBody, characterTag, 'character');
                this.appendElement(noteBody, pronunciationTag, 'pronunciation');
                wordBody.appendChild(noteBody);
                break;
            case 'word-meaning':
                noteBody.classList.add('word-character-note');
                var meaningTag = document.createElement('p');
                meaningTag.appendChild(document.createTextNode(wordMeaning));
                this.appendElement(noteBody, meaningTag, 'meaning');
                wordBody.appendChild(noteBody);
                this.appendElement(noteBody, null, 'space');
                break;
        }
    };
    Section.prototype.appendElement = function (parent, elementToAdd, classToAdd) {
        var div = document.createElement('div');
        div.classList.add('square');
        var line = document.createElement('div');
        line.classList.add('line');
        div.appendChild(line);
        if (elementToAdd) {
            div.appendChild(elementToAdd);
        }
        if (classToAdd) {
            div.classList.add(classToAdd);
        }
        parent.appendChild(div);
    };
    Section.prototype.setRow = function () {
        if (this.keepRow) {
            this.sectionName.appendChild(this.row);
            this.keepRow = false;
        }
        else {
            var newRow = this.createDiv();
            newRow.classList.add('row');
            this.row = newRow;
            this.sectionName.appendChild(this.row);
        }
    };
    Section.prototype.insertSpace = function () {
        this.charNote({
            character: '',
            meaning: '',
            pronunciation: ''
        });
    };
    Section.prototype.insertHalfSpace = function () {
        var wordBody = this.createDiv();
        wordBody.classList.add('word-note');
        this.row.appendChild(wordBody);
        this.formatNote('word-meaning', null, wordBody, null, ' ');
    };
    Section.prototype.sameRow = function () {
        this.keepRow = true;
    };
    Section.prototype.changeDirection = function () {
        this.sectionName.style.flexDirection = 'row';
    };
    Section.prototype.createDiv = function () {
        return document.createElement('div');
    };
    Section.prototype.indent = function () {
        for (var i = 0; i < this.spaces; i++) {
            this.insertSpace();
            this.sameRow();
        }
        // this.keepRow = false;
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
                    var charWidth = sections[i].offsetWidth / 2;
                    var tittle = sections[i].getElementsByClassName('tittle');
                    for (var k = 0; k <
                        Math.floor((children[j].offsetWidth -
                            sections[i].offsetWidth) /
                            charWidth); k++) {
                        var divSquareLine = squareWithLine();
                        tittle[0].appendChild(divSquareLine);
                    }
                    sections[i].style.width =
                        (children[j].offsetWidth + 1).toString() +
                            'px';
                }
            }
        }
    }
});
function squareWithLine() {
    var div = document.createElement('div');
    div.classList.add('square');
    var line = document.createElement('div');
    line.classList.add('line');
    div.appendChild(line);
    return div;
}
