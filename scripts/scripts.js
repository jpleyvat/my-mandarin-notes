var Section = /** @class */ (function () {
    function Section(spaces, content) {
        this.spaces = spaces;
        this.keepRow = false;
        this.sectionName =
            document.scripts[document.scripts.length - 1].parentElement;
        // Global constants
        this.row = this.createDiv();
        this.row.classList.add('row');
        this.indent();
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
        divTittle.classList.add('tittle'),
            div.classList.add('square'),
            div2.classList.add('square'),
            line.classList.add('line'),
            line2.classList.add('line');
        // Element nestings
        // div.appendChild(line),
        // 	div2.appendChild(line2),
        tittle.appendChild(document.createTextNode(this.sectionName.id.toUpperCase())),
            // divTittle.appendChild(div),
            divTittle.appendChild(tittle),
            // divTittle.appendChild(div2),
            this.sectionName.appendChild(divTittle);
        if (content) {
            for (var i = 0; i < content.length; i++) {
                if (content[i][1] === 'same')
                    this.sameRow();
                this.setRow();
                if (content[i][0] === 'character') {
                    var note = this.createDiv(['character-note']);
                    this.row.appendChild(note);
                    for (var j = 2; j < content[i].length; j++) {
                        note.appendChild(this.note(content[i][j], j));
                    }
                    var space = this.createDiv(['square', 'space'], true);
                    note.append(space);
                }
                else if (content[i][0] === 'word') {
                    var note = this.createDiv(['word-note']);
                    this.row.appendChild(note);
                    var pronunciation = content[i][3];
                    for (var j = 2; j < content[i].length - 2; j++) {
                        if (j != 3) {
                            for (var k = 0; k < content[i][j].length; k++) {
                                var wordCharacter = this.createDiv([
                                    'word-character-note'
                                ]);
                                wordCharacter.appendChild(this.note(content[i][j][k], j));
                                wordCharacter.appendChild(this.note(content[i][j + 2][k], j));
                                note.appendChild(wordCharacter);
                            }
                        }
                    }
                }
            }
        }
        this.adjustSection();
        this.changeDirection();
    }
    Section.prototype.adjustSection = function () {
        var children = this.sectionName.childNodes;
        var maxWidth = this.sectionName.offsetWidth;
        var _a = [
            this.sectionName.offsetWidth / 2,
            this.sectionName.getElementsByClassName('tittle')
        ], charWidth = _a[0], tittle = _a[1];
        for (var i = 0; i < children.length; i++) {
            if (children[i].offsetWidth) {
                if (children[i].offsetWidth > maxWidth) {
                    maxWidth = children[i].offsetWidth;
                }
            }
        }
        var columnsToFill = Math.ceil(maxWidth / charWidth);
        this.sectionName.style.width =
            (maxWidth + 1).toString() + 'px';
        for (var k = 0; k < columnsToFill; k++) {
            var space = this.createDiv(['square', 'space'], true);
            tittle[0].appendChild(space);
        }
    };
    Section.prototype.note = function (content, typeNumber) {
        var type;
        switch (typeNumber) {
            case 2:
                type = 'character';
                break;
            case 3:
                type = 'meaning';
                break;
            case 4:
                type = 'pronunciation';
                break;
        }
        var element = this.createDiv(['square', type], true);
        var innerTag = document.createElement('p');
        innerTag.appendChild(document.createTextNode(content));
        element.appendChild(innerTag);
        return element;
    };
    Section.prototype.appendElement = function (parent, elementToAdd, classToAdd) {
        var _a = [
            document.createElement('div'),
            document.createElement('div')
        ], div = _a[0], line = _a[1];
        div.classList.add('square'),
            line.classList.add('line'),
            div.appendChild(line);
        if (elementToAdd)
            div.appendChild(elementToAdd);
        if (classToAdd)
            div.classList.add(classToAdd);
        parent.appendChild(div);
    };
    Section.prototype.setRow = function () {
        if (this.keepRow) {
            this.sectionName.appendChild(this.row),
                (this.keepRow = false);
        }
        else {
            var newRow = this.createDiv();
            newRow.classList.add('row'),
                (this.row = newRow),
                this.sectionName.appendChild(this.row);
        }
    };
    Section.prototype.sameRow = function () {
        this.keepRow = true;
    };
    Section.prototype.changeDirection = function () {
        this.sectionName.style.flexDirection = 'row';
    };
    Section.prototype.createDiv = function (classes, withLine) {
        var div = document.createElement('div');
        if (withLine) {
            var line = document.createElement('div');
            line.classList.add('line');
            div.appendChild(line);
        }
        if (classes)
            for (var i = 0; i < classes.length; i++) {
                div.classList.add(classes[i]);
            }
        return div;
    };
    Section.prototype.indent = function () {
        var charWidth = Number(window
            .getComputedStyle(document.body)
            .getPropertyValue('font-size')
            .match(/\d+/)[0]);
        for (var i = 0; i < this.spaces; i++) {
            var margin = this.sectionName.style.marginLeft;
            var marginNumber = Number(margin.replace('px', ''));
            (marginNumber += charWidth),
                (this.sectionName.style.marginLeft =
                    String(marginNumber) + 'px');
        }
    };
    Section.prototype.charNote = function (noteData, classes) {
        this.setRow();
        if (classes)
            this.formatNote('character', noteData, classes);
        else
            this.formatNote('character', noteData);
    };
    Section.prototype.wordNote = function (noteData, wordMeaning, classes) {
        this.setRow();
        var wordBody = this.createDiv();
        wordBody.classList.add('word-note'),
            this.row.appendChild(wordBody);
        for (var i = 0; i < noteData.length; i++) {
            if (classes)
                this.formatNote('word', noteData[i], wordBody, classes);
            else
                this.formatNote('word', noteData[i], wordBody);
        }
        this.formatNote('word-meaning', null, wordBody, null, wordMeaning);
    };
    Section.prototype.formatNote = function (type, noteData, wordBody, classes, wordMeaning) {
        var _a = [
            this.createDiv(),
            document.createElement('p'),
            document.createElement('p'),
            document.createElement('p'),
            {
                character: false,
                meaning: false,
                pronunciation: false,
                space: false
            }
        ], noteBody = _a[0], characterTag = _a[1], pronunciationTag = _a[2], meaningTag = _a[3], appendlist = _a[4];
        if (classes) {
            for (var i = 0; i < classes.length; i++) {
                noteBody.classList.add(classes[i]);
            }
        }
        this.row.appendChild(noteBody);
        if (noteData) {
            characterTag.appendChild(document.createTextNode(noteData.character)),
                pronunciationTag.appendChild(document.createTextNode(noteData.pronunciation));
            if (noteData.meaning)
                meaningTag.appendChild(document.createTextNode(noteData.meaning));
        }
        if (wordMeaning)
            meaningTag.appendChild(document.createTextNode(wordMeaning));
        switch (type) {
            case 'character':
                noteBody.classList.add('character-note'),
                    (appendlist = {
                        character: true,
                        meaning: true,
                        pronunciation: true,
                        space: true
                    });
                if (wordBody)
                    wordBody.appendChild(noteBody);
                break;
            case 'word':
                noteBody.classList.add('word-character-note'),
                    wordBody.appendChild(noteBody),
                    (appendlist = {
                        character: true,
                        meaning: false,
                        pronunciation: true,
                        space: false
                    });
                break;
            case 'word-meaning':
                noteBody.classList.add('word-character-note'),
                    wordBody.appendChild(noteBody),
                    (appendlist = {
                        character: false,
                        meaning: true,
                        pronunciation: false,
                        space: true
                    });
                break;
            case 'quarter-space':
                noteBody.classList.add('word-character-note'),
                    wordBody.appendChild(noteBody),
                    (appendlist = {
                        character: false,
                        meaning: false,
                        pronunciation: false,
                        space: true
                    });
                break;
        }
        if (appendlist.character)
            this.appendElement(noteBody, characterTag, 'character');
        if (appendlist.meaning)
            this.appendElement(noteBody, meaningTag, 'meaning');
        if (appendlist.pronunciation)
            this.appendElement(noteBody, pronunciationTag, 'pronunciation');
        if (appendlist.space)
            this.appendElement(noteBody, null, 'space');
    };
    Section.prototype.insertSpace = function () {
        this.charNote({
            character: '',
            meaning: '',
            pronunciation: ''
        });
    };
    Section.prototype.insertHalfSpace = function (IndentSpace) {
        var invisible;
        if (IndentSpace)
            invisible = 'indent-space';
        else
            invisible = invisible = null;
        var wordBody = this.createDiv();
        wordBody.classList.add('word-note'),
            this.row.appendChild(wordBody),
            this.formatNote('word-meaning', null, wordBody, [invisible], ' ');
    };
    Section.prototype.insertQuarterSpace = function (IndentSpace) {
        this.setRow();
        var invisible;
        if (IndentSpace)
            invisible = 'indent-space';
        else
            invisible = invisible = null;
        var wordBody = this.createDiv();
        this.row.appendChild(wordBody);
        wordBody.classList.add('quarter-space'),
            this.row.appendChild(wordBody),
            this.formatNote('quarter-space', null, wordBody, [invisible], ' '),
            this.formatNote('quarter-space', null, wordBody, [invisible], ' ');
    };
    return Section;
}());
function squareWithLine() {
    var _a = [
        document.createElement('div'),
        document.createElement('div')
    ], div = _a[0], line = _a[1];
    div.classList.add('square'),
        line.classList.add('line'),
        div.appendChild(line);
    return div;
}
function pages() {
    var pagesList = document.getElementById('pages');
    var pages = document.getElementsByClassName('page');
    var _loop_1 = function (i) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(getNumberInMandarin(i)));
        pagesList.appendChild(li);
        li.onclick = function () {
            showPage(i);
        };
    };
    for (var i = pages.length; i > 0; i--) {
        _loop_1(i);
    }
}
function showPage(page) {
    var pages = document.getElementsByClassName('page');
    if (page) {
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].id === String(page)) {
                pages[i].style.display = 'flex';
            }
            else {
                pages[i].style.display = 'none';
            }
        }
    }
}
function getNumberInMandarin(number) {
    switch (number) {
        case 1:
            return '一';
        case 2:
            return '二';
        case 3:
            return '三';
        case 4:
            return '四';
        case 5:
            return '五';
        case 6:
            return '六';
        case 7:
            return '七';
        case 8:
            return '八';
        case 9:
            return '九';
        case 10:
            return '十';
    }
}
