var Section = (function () {
    function Section(spaces, content) {
        this.spaces = spaces;
        this.keepRow = false;
        this.sectionName =
            document.scripts[document.scripts.length - 1].parentElement;
        // Global constants
        this.content = content;
        this.characterWidth = this.sectionName.offsetWidth / 2;
        this.row = this.createDiv();
        this.row.classList.add('row');
        this.indent();
        // Title
        var _a = [
            this.createDiv(['title']),
            document.createElement('h1')
        ], divTitle = _a[0], title = _a[1];
        title.appendChild(document.createTextNode(this.sectionName.title.toUpperCase())),
            divTitle.appendChild(title),
            this.sectionName.appendChild(divTitle);
        this.showContent();
    }
    Section.prototype.showContent = function () {
        var index = 0;
        var loop = function (self) {
            if (index < self.content.length) {
                var element = self.content[index];
                if (element[1] === 'same')
                    self.sameRow();
                self.setRow();
                switch (element[0]) {
                    case 'character':
                        getCharacterData(self.content[index][2])
                            .then(function (res) {
                            var note = self.createDiv([
                                'character-note'
                            ]);
                            self.row.appendChild(note);
                            note.appendChild(self.note(res.hanzi, 2));
                            note.appendChild(self.note(res.meaning, 3));
                            note.appendChild(self.note(res.pinyin, 4));
                            note.appendChild(self.insertSpace());
                            index += 1;
                            loop(self);
                        })
                            .catch(function (err) {
                            console.log('error', err);
                        });
                        break;
                    case 'word':
                        getCharacterData(self.content[index][2])
                            .then(function (res) {
                            var _a = [
                                self.createDiv(['word-note']),
                                self.createDiv([
                                    'word-character-note'
                                ])
                            ], note = _a[0], meaningTag = _a[1];
                            self.row.appendChild(note);
                            var pinyin = res.pinyin.split(' ');
                            for (var i = 0; i < res.hanzi.length; i++) {
                                var wordCharacter = self.createDiv(['word-character-note']);
                                wordCharacter.appendChild(self.note(res.hanzi[i], 2)),
                                    wordCharacter.appendChild(self.note(pinyin[i], 4)),
                                    note.appendChild(wordCharacter);
                            }
                            meaningTag.appendChild(self.note(res.meaning, 3));
                            meaningTag.appendChild(self.insertSpace());
                            note.appendChild(meaningTag);
                            index += 1;
                            loop(self);
                        })
                            .catch(function (err) {
                            console.log('error', err);
                        });
                        break;
                    default:
                        break;
                }
            }
            else {
                self.adjustSection();
                return;
            }
        };
        loop(this);
    };
    Section.prototype.adjustSection = function () {
        var children = this.sectionName.childNodes;
        var maxWidth = this.sectionName.offsetWidth;
        // let rows: any = this.sectionName.getElementsByClassName('row')
        var _a = [
            this.sectionName.offsetWidth / 2,
            this.sectionName.getElementsByClassName('title')
        ], charWidth = _a[0], title = _a[1];
        (function loopChild(adjustment, self) {
            for (var i = 0; i < children.length; i++) {
                var missingSpaces = Math.round((maxWidth - children[i].offsetWidth) / charWidth);
                if (adjustment) {
                    for (var k = 0; k < missingSpaces; k++) {
                        if (!children[i].classList.contains('title')) {
                            children[i].appendChild(self.insertTwoSpaces());
                        }
                    }
                }
                else if (children[i].offsetWidth) {
                    if (children[i].classList) {
                        if (children[i].classList.contains('row') &&
                            children[i].offsetWidth > maxWidth) {
                            maxWidth = children[i].offsetWidth;
                        }
                    }
                    if (i + 1 >= children.length) {
                        loopChild(true, self);
                    }
                }
            }
        })(false, this);
        var columnsToFill = Math.ceil(maxWidth / charWidth);
        this.sectionName.style.width =
            (maxWidth + 1).toString() + 'px';
        for (var k = 0; k < columnsToFill; k++) {
            var space = this.createDiv(['square', 'space'], true);
            if (!(k + 1 < columnsToFill)) {
                space.style.borderRight = 'none';
            }
            title[0].appendChild(space);
        }
    };
    Section.prototype.note = function (content, typeNumber) {
        var type = '';
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
    Section.prototype.insertSpace = function () {
        var space = this.createDiv(['square', 'space'], true);
        return space;
    };
    Section.prototype.insertTwoSpaces = function () {
        var twoSpaces = this.createDiv(['word-character-note'], true);
        twoSpaces.appendChild(this.insertSpace());
        twoSpaces.appendChild(this.insertSpace());
        return twoSpaces;
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
    Section.prototype.insertLine = function () {
        this.setRow();
        for (var i = 0; i < this.sectionName.offsetWidth / this.characterWidth; i++) {
            var space = this.insertSpace();
            this.row.appendChild(space);
        }
    };
    return Section;
})();
document.addEventListener('DOMContentLoaded', function () {
    var pagesList = document.createElement('ul');
    pagesList.id = 'pages';
    var pages = document.getElementsByClassName('page');
    for (var i = pages.length; i > 0; i--) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(getNumberInMandarin(i)));
        pagesList.appendChild(li);
        li.onclick = function () {
            showPage(i);
        };
    }
    document.body.appendChild(pagesList);
    showPage(1);
}, false);
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
    return '';
}
var getCharacterData = function (character) {
    var URL = 'https://pinyin-meaning-api.herokuapp.com/api';
    return new Promise(function (resolve, reject) {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hanzi: character
            })
        })
            .then(function (response) {
            resolve(response.json());
        })
            .catch(function (error) {
            reject(new Error(error));
        });
    });
};
