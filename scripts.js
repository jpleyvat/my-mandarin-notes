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
    Section.prototype.createNote = function (noteData, classes) {
        if (noteData.length === 1) {
            if (classes) {
                this.formatNote(noteData[0], classes);
            }
            else {
                this.formatNote(noteData[0]);
            }
        }
        else {
            var wordBody = this.createDiv();
            wordBody.classList.add('word-note');
            this.sectionName.appendChild(wordBody);
            for (var i = 0; i < noteData.length; i++) {
                if (classes) {
                    this.formatNote(noteData[i], wordBody, classes);
                }
                else {
                    this.formatNote(noteData[i], wordBody);
                }
            }
        }
    };
    Section.prototype.formatNote = function (noteData, wordBody, classes) {
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
    Section.prototype.insertSpace = function () {
        this.createNote([
            {
                character: '',
                meaning: '',
                pronunciation: ''
            }
        ]);
    };
    return Section;
}());
// document.addEventListener('DOMContentLoaded', function getWidths() {
// 	let sections: any = document.getElementsByClassName('section');
// 	for (let i = 0; i < sections.length; i++) {
// 		let children: any = sections[i].childNodes;
// 		for (let j = 0; j < children.length; j++) {
// 			if (children[j].offsetWidth) {
// 				if (
// 					children[j].offsetWidth > sections[i].offsetWidth
// 				) {
// 					let charWidth = sections[i].offsetWidth / 2;
// 					let tittle: any = sections[
// 						i
// 					].getElementsByClassName('tittle');
// 					for (
// 						let k =
// 							children[j].offsetWidth -
// 							sections[i].offsetWidth;
// 						Math.floor(k) > 0;
// 						k -= Math.ceil(charWidth)
// 					) {
// 						let divSquareLine = squareWithLine();
// 						tittle[0].appendChild(divSquareLine);
// 					}
// 					console.log(tittle);
// 					sections[i].style.width =
// 						(children[j].offsetWidth + 1).toString() +
// 						'px';
// 					sections[i].style.flexDirection = 'row';
// 				}
// 			}
// 		}
// 	}
// });
function squareWithLine() {
    var div = document.createElement('div');
    div.classList.add('square');
    var line = document.createElement('div');
    line.classList.add('line');
    div.appendChild(line);
    return div;
}
