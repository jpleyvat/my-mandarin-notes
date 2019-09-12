"use strict";
const numberOfPages = 2;
class Section {
    constructor(content, horizontalSpaces, verticalSpaces) {
        this.horizontalSpaces = horizontalSpaces;
        this.verticalSpaces = verticalSpaces;
        this.keepRow = false;
        // this.hidePage();
        this.sectionName =
            document.scripts[document.scripts.length - 1].parentElement;
        // Global constants
        this.content = content;
        this.characterWidth = this.sectionName.offsetWidth / 2;
        this.row = this.createDiv();
        this.row.classList.add('row');
        this.indent();
        // Title
        let [divTitle, title] = [
            this.createDiv(['title']),
            document.createElement('h1')
        ];
        title.appendChild(document.createTextNode(this.sectionName.title.toUpperCase())),
            divTitle.appendChild(title),
            this.sectionName.appendChild(divTitle);
        this.showContent();
    }
    showContent() {
        let index = 0;
        let lines = 0;
        let loop = function (self) {
            if (index < self.content.length) {
                let element = self.content[index];
                if (element[1] === 'same')
                    self.sameRow();
                self.setRow();
                switch (element[0]) {
                    case 'character':
                        getCharacterData(self.content[index][2])
                            .then((res) => {
                            let note = self.createDiv([
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
                            .catch((err) => {
                            console.log('error', err);
                        });
                        break;
                    case 'word':
                        getCharacterData(self.content[index][2])
                            .then((res) => {
                            let [note, meaningTag] = [
                                self.createDiv(['word-note']),
                                self.createDiv([
                                    'word-character-note'
                                ])
                            ];
                            self.row.appendChild(note);
                            let pinyin = res.pinyin.split(' ');
                            for (let i = 0; i < res.hanzi.length; i++) {
                                let wordCharacter = self.createDiv(['word-character-note']);
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
                            .catch((err) => {
                            console.log('error', err);
                        });
                        break;
                    case 'line':
                        lines += 1;
                        index += 1;
                        loop(self);
                        break;
                    default:
                        self.insertSpaces(element[0], self.row);
                        index += 1;
                        loop(self);
                        break;
                }
            }
            else {
                let sectionNumber = document.getElementsByClassName('section')
                    .length - 1;
                let currentSection = document.getElementsByClassName('section')[sectionNumber];
                if (self.sectionName.title === currentSection.title) {
                    self.showPage();
                }
                self.adjustSection();
                for (let i = 0; i < lines; i++) {
                    self.insertLine();
                }
                return;
            }
        };
        loop(this);
    }
    adjustSection() {
        let children = this.sectionName.childNodes;
        let maxWidth = this.sectionName.offsetWidth;
        // let rows: any = this.sectionName.getElementsByClassName('row')
        let [charWidth, title] = [
            this.sectionName.offsetWidth / 2,
            this.sectionName.getElementsByClassName('title')
        ];
        (function loopChild(adjustment, self) {
            for (let i = 0; i < children.length; i++) {
                let missingSpaces = Math.round((maxWidth - children[i].offsetWidth) / charWidth);
                if (adjustment) {
                    for (let k = 0; k < missingSpaces; k++) {
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
        let columnsToFill = Math.ceil(maxWidth / charWidth);
        this.sectionName.style.width =
            (maxWidth + 1).toString() + 'px';
        for (let k = 0; k < columnsToFill; k++) {
            let space = this.createDiv(['square', 'space'], true);
            if (!(k + 1 < columnsToFill)) {
                space.style.borderRight = 'none';
            }
            title[0].appendChild(space);
        }
    }
    note(content, typeNumber) {
        let type = '';
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
        let element = this.createDiv(['square', type], true);
        let innerTag = document.createElement('p');
        innerTag.appendChild(document.createTextNode(content));
        element.appendChild(innerTag);
        return element;
    }
    appendElement(parent, elementToAdd, classToAdd) {
        let [div, line] = [
            document.createElement('div'),
            document.createElement('div')
        ];
        div.classList.add('square'),
            line.classList.add('line'),
            div.appendChild(line);
        if (elementToAdd)
            div.appendChild(elementToAdd);
        if (classToAdd)
            div.classList.add(classToAdd);
        parent.appendChild(div);
    }
    setRow() {
        if (this.keepRow) {
            this.sectionName.appendChild(this.row),
                (this.keepRow = false);
        }
        else {
            let newRow = this.createDiv();
            newRow.classList.add('row'),
                (this.row = newRow),
                this.sectionName.appendChild(this.row);
        }
    }
    sameRow() {
        this.keepRow = true;
    }
    createDiv(classes, withLine) {
        let div = document.createElement('div');
        if (withLine) {
            let line = document.createElement('div');
            line.classList.add('line');
            div.appendChild(line);
        }
        if (classes)
            for (let i = 0; i < classes.length; i++) {
                div.classList.add(classes[i]);
            }
        return div;
    }
    insertSpaces(type, row) {
        switch (type) {
            case 'fourSpaces':
                let space = this.createDiv(['character-note']);
                row.appendChild(space);
                for (let i = 0; i < 4; i++) {
                    space.appendChild(this.insertSpace());
                }
                break;
            case 'twoSpaces':
                let twoSpaces = this.insertTwoSpaces();
                row.appendChild(twoSpaces);
                break;
            default:
                break;
        }
    }
    insertSpace() {
        let space = this.createDiv(['square', 'space'], true);
        return space;
    }
    insertTwoSpaces() {
        let twoSpaces = this.createDiv(['word-character-note'], true);
        twoSpaces.appendChild(this.insertSpace());
        twoSpaces.appendChild(this.insertSpace());
        return twoSpaces;
    }
    indent() {
        let charWidth;
        charWidth = Number(window
            .getComputedStyle(document.body)
            .getPropertyValue('font-size')
            .replace('px', ''));
        if (this.horizontalSpaces) {
            for (let i = 0; i < this.horizontalSpaces; i++) {
                let marginLeft = this.sectionName.style
                    .marginLeft;
                let marginNumber = Number(marginLeft.replace('px', ''));
                (marginNumber += charWidth),
                    (this.sectionName.style.marginLeft =
                        String(marginNumber) + 'px');
            }
        }
        if (this.verticalSpaces) {
            for (let i = 0; i < this.verticalSpaces; i++) {
                let marginTop = this.sectionName.style
                    .marginTop;
                let marginNumber = Number(marginTop.replace('px', ''));
                (marginNumber += charWidth),
                    (this.sectionName.style.marginTop =
                        String(marginNumber) + 'px');
            }
        }
    }
    insertLine() {
        this.setRow();
        for (let i = 1; i < this.sectionName.offsetWidth / this.characterWidth; i++) {
            let space = this.insertSpace();
            this.row.appendChild(space);
        }
    }
    showPage() {
        let page = document.getElementsByClassName('page')[0];
        page.style.opacity = 1;
    }
    hidePage() {
        let page = document.getElementsByClassName('page')[0];
        page.style.opacity = 0;
    }
}
(() => {
    let pagesList = document.createElement('ul');
    pagesList.id = 'pages';
    for (let i = numberOfPages; i > 0; i--) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        let number = document.createTextNode(getNumberInMandarin(i));
        if (i != 1)
            a.href = 'page' + i + '.html';
        else
            a.href = 'index.html';
        li.appendChild(number);
        a.appendChild(li);
        pagesList.appendChild(a);
        document.body.appendChild(pagesList);
    }
})();
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
        default:
            return '';
    }
}
const getCharacterData = function (character) {
    const URL = 'https://pinyin-meaning-api.herokuapp.com/api';
    return new Promise((resolve, reject) => {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hanzi: character
            })
        })
            .then((response) => {
            resolve(response.json());
        })
            .catch((error) => {
            reject(new Error(error));
        });
    });
};
