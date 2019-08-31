interface MandarinNote {
	character: string;
	meaning?: string;
	pronunciation: string;
}

class Section {
	keepRow: boolean = false;
	row: any;
	constructor(private sectionName, private spaces?: number) {
		// Global constants
		this.row = this.createDiv();
		this.row.classList.add('row');
		// Elements asignment
		let [divTittle, div, div2, line, line2, tittle] = [
			this.createDiv(),
			this.createDiv(),
			this.createDiv(),
			this.createDiv(),
			this.createDiv(),
			document.createElement('h1')
		];

		// Class asignments
		divTittle.classList.add('square', 'tittle'),
			div.classList.add('square'),
			div2.classList.add('square'),
			line.classList.add('line'),
			line2.classList.add('line');

		// Element nestings
		div.appendChild(line),
			div2.appendChild(line2),
			tittle.appendChild(
				document.createTextNode(sectionName.id.toUpperCase())
			),
			divTittle.appendChild(div),
			divTittle.appendChild(tittle),
			divTittle.appendChild(div2),
			sectionName.appendChild(divTittle);
	}

	charNote(noteData: MandarinNote, classes?: string[]) {
		this.setRow();
		if (classes) {
			this.formatNote('character', noteData, classes);
		} else {
			this.formatNote('character', noteData);
		}
	}

	wordNote(
		noteData: MandarinNote[],
		wordMeaning: string,
		classes?: string[]
	) {
		this.setRow();
		let wordBody = this.createDiv();
		wordBody.classList.add('word-note');
		this.row.appendChild(wordBody);
		for (let i = 0; i < noteData.length; i++) {
			if (classes) {
				this.formatNote(
					'word',
					noteData[i],
					wordBody,
					classes
				);
			} else {
				this.formatNote('word', noteData[i], wordBody);
			}
		}
		this.formatNote(
			'word-meaning',
			null,
			wordBody,
			null,
			wordMeaning
		);
	}

	formatNote(
		type: string,
		noteData?: MandarinNote,
		wordBody?: any,
		classes?: string[],
		wordMeaning?: string
	) {
		let noteBody = this.createDiv();
		this.row.appendChild(noteBody);

		let note: any;
		switch (type) {
			case 'character':
				noteBody.classList.add('character-note');
				note = [
					{
						element: document.createElement('p'),
						elementClass: 'character'
					},
					{
						element: document.createTextNode(
							noteData.meaning
						),
						elementClass: 'meaning'
					},
					{
						element: document.createTextNode(
							noteData.pronunciation
						),
						elementClass: 'pronunciation'
					},
					{ element: null, elementClass: 'space' }
				];
				note[0].element.appendChild(
					document.createTextNode(noteData.character)
				);

				for (let i = 0; i < note.length; i++) {
					this.appendElement(
						noteBody,
						note[i].element,
						note[i].elementClass
					);
				}
				if (wordBody) {
					wordBody.appendChild(noteBody);
				}
				break;
			case 'word':
				noteBody.classList.add('word-character-note');

				let characterTag = document.createElement('p');
				let pronunciationTag = document.createElement('p');

				characterTag.appendChild(
					document.createTextNode(noteData.character)
				);
				pronunciationTag.appendChild(
					document.createTextNode(noteData.pronunciation)
				);

				this.appendElement(
					noteBody,
					characterTag,
					'character'
				);
				this.appendElement(
					noteBody,
					pronunciationTag,
					'pronunciation'
				);

				wordBody.appendChild(noteBody);

				break;
			case 'word-meaning':
				noteBody.classList.add('word-character-note');
				let meaningTag = document.createElement('p');
				meaningTag.appendChild(
					document.createTextNode(wordMeaning)
				);
				this.appendElement(noteBody, meaningTag, 'meaning');
				wordBody.appendChild(noteBody);
				this.appendElement(noteBody, null, 'space');
				break;
		}
	}

	appendElement(parent: any, elementToAdd: any, classToAdd: any) {
		let div = document.createElement('div');
		div.classList.add('square');
		let line = document.createElement('div');
		line.classList.add('line');
		div.appendChild(line);
		if (elementToAdd) {
			div.appendChild(elementToAdd);
		}
		if (classToAdd) {
			div.classList.add(classToAdd);
		}
		parent.appendChild(div);
	}

	setRow() {
		if (this.keepRow) {
			this.sectionName.appendChild(this.row);
			this.keepRow = false;
		} else {
			let newRow = this.createDiv();
			newRow.classList.add('row');
			this.row = newRow;
			this.sectionName.appendChild(this.row);
		}
	}

	insertSpace() {
		this.charNote({
			character: '',
			meaning: '',
			pronunciation: ''
		});
	}
	insertHalfSpace() {
		let wordBody = this.createDiv();
		wordBody.classList.add('word-note');
		this.row.appendChild(wordBody);
		this.formatNote('word-meaning', null, wordBody, null, ' ');
	}

	sameRow() {
		this.keepRow = true;
	}

	changeDirection() {
		this.sectionName.style.flexDirection = 'row';
	}

	createDiv() {
		return document.createElement('div');
	}

	indent() {
		for (let i = 0; i < this.spaces; i++) {
			this.insertSpace();
			this.sameRow();
		}
		// this.keepRow = false;
	}
}

document.addEventListener('DOMContentLoaded', function getWidths() {
	let sections: any = document.getElementsByClassName('section');
	for (let i = 0; i < sections.length; i++) {
		let children: any = sections[i].childNodes;
		for (let j = 0; j < children.length; j++) {
			if (children[j].offsetWidth) {
				if (
					children[j].offsetWidth > sections[i].offsetWidth
				) {
					let charWidth = sections[i].offsetWidth / 2;
					let tittle: any = sections[
						i
					].getElementsByClassName('tittle');
					for (
						let k = 0;
						k <
						Math.floor(
							(children[j].offsetWidth -
								sections[i].offsetWidth) /
								charWidth
						);
						k++
					) {
						let divSquareLine = squareWithLine();
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
	let div = document.createElement('div');
	div.classList.add('square');
	let line = document.createElement('div');
	line.classList.add('line');
	div.appendChild(line);
	return div;
}
