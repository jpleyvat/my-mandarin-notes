var Section = /** @class */ (function () {
    function Section(spaces) {
        this.spaces = spaces;
        this.keepRow = false;
        this.sectionName =
            document.scripts[document.scripts.length - 1].parentElement;
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
            tittle.appendChild(document.createTextNode(this.sectionName.id.toUpperCase())),
            divTittle.appendChild(div),
            divTittle.appendChild(tittle),
            divTittle.appendChild(div2),
            this.sectionName.appendChild(divTittle);
    }
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
    return Section;
}());
document.addEventListener('DOMContentLoaded', function getWidths() {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        var children = sections[i].childNodes;
        for (var j = 0; j < children.length; j++) {
            if (children[j].offsetWidth) {
                if (children[j].offsetWidth > sections[i].offsetWidth) {
                    var _a = [
                        sections[i].offsetWidth / 2,
                        sections[i].getElementsByClassName('tittle')
                    ], charWidth = _a[0], tittle = _a[1];
                    var columnsToFill = (children[j].offsetWidth -
                        sections[i].offsetWidth) /
                        charWidth;
                    for (var k = 0; k < columnsToFill; k++) {
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
function prueba() {
    var request = new Request(
    // 'https://www.googleapis.com/language/translate/v2/?target=es&q=%E6%88%91&key=AIzaSyBmSLZ2bu7xgdwzz7lEVDwHikyaLXQJYNA'
    // 'https://cors-anywhere.herokuapp.com/https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=%E6%88%91&format=json'
    'https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=%E6%88%91&format=json');
    fetch(request)
        .then(function (response) {
        return response.text();
    })
        .then(function (text) {
        console.log(JSON.parse(text));
    })["catch"](function (error) {
        console.log(error);
    });
}
prueba();
