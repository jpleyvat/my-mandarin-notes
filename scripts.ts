interface MandarinNote {
	character: string;
	meaning?: string;
	pronunciation: string;
}

class Section {
	keepRow: boolean = false;
	row: any;
	constructor(
		private sectionName: HTMLElement,
		private spaces?: number
	) {
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
		if (classes) this.formatNote('character', noteData, classes);
		else this.formatNote('character', noteData);
	}

	wordNote(
		noteData: MandarinNote[],
		wordMeaning: string,
		classes?: string[]
	) {
		this.setRow();
		let wordBody = this.createDiv();
		wordBody.classList.add('word-note'),
			this.row.appendChild(wordBody);
		for (let i = 0; i < noteData.length; i++) {
			if (classes)
				this.formatNote(
					'word',
					noteData[i],
					wordBody,
					classes
				);
			else this.formatNote('word', noteData[i], wordBody);
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
		let [
			noteBody,
			characterTag,
			pronunciationTag,
			meaningTag,
			appendlist
		] = [
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
		];
		if (classes) {
			for (let i = 0; i < classes.length; i++) {
				noteBody.classList.add(classes[i]);
			}
		}
		this.row.appendChild(noteBody);

		if (noteData) {
			characterTag.appendChild(
				document.createTextNode(noteData.character)
			),
				pronunciationTag.appendChild(
					document.createTextNode(noteData.pronunciation)
				);
			if (noteData.meaning)
				meaningTag.appendChild(
					document.createTextNode(noteData.meaning)
				);
		}
		if (wordMeaning)
			meaningTag.appendChild(
				document.createTextNode(wordMeaning)
			);

		switch (type) {
			case 'character':
				noteBody.classList.add('character-note'),
					(appendlist = {
						character: true,
						meaning: true,
						pronunciation: true,
						space: true
					});
				if (wordBody) wordBody.appendChild(noteBody);
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
		}

		if (appendlist.character)
			this.appendElement(noteBody, characterTag, 'character');
		if (appendlist.meaning)
			this.appendElement(noteBody, meaningTag, 'meaning');
		if (appendlist.pronunciation)
			this.appendElement(
				noteBody,
				pronunciationTag,
				'pronunciation'
			);
		if (appendlist.space)
			this.appendElement(noteBody, null, 'space');
	}

	appendElement(parent: any, elementToAdd: any, classToAdd: any) {
		let [div, line] = [
			document.createElement('div'),
			document.createElement('div')
		];
		div.classList.add('square'),
			line.classList.add('line'),
			div.appendChild(line);
		if (elementToAdd) div.appendChild(elementToAdd);

		if (classToAdd) div.classList.add(classToAdd);

		parent.appendChild(div);
	}

	setRow() {
		if (this.keepRow) {
			this.sectionName.appendChild(this.row),
				(this.keepRow = false);
		} else {
			let newRow = this.createDiv();
			newRow.classList.add('row'),
				(this.row = newRow),
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

	insertHalfSpace(IndentSpace?: boolean) {
		let invisible;
		if (IndentSpace) invisible = 'indent-space';
		else invisible = invisible = null;
		let wordBody = this.createDiv();
		wordBody.classList.add('word-note'),
			this.row.appendChild(wordBody),
			this.formatNote(
				'word-meaning',
				null,
				wordBody,
				[invisible],
				' '
			);
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
		let charWidth = Number(
			window
				.getComputedStyle(document.body)
				.getPropertyValue('font-size')
				.match(/\d+/)[0]
		);
		for (let i = 0; i < this.spaces; i++) {
			let margin: string = this.sectionName.style.marginLeft;
			let marginNumber: number = Number(
				margin.replace('px', '')
			);
			(marginNumber += charWidth),
				(this.sectionName.style.marginLeft =
					String(marginNumber) + 'px');
		}
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
					let [charWidth, tittle] = [
						sections[i].offsetWidth / 2,
						sections[i].getElementsByClassName('tittle')
					];
					let columnsToFill = Math.floor(
						(children[j].offsetWidth -
							sections[i].offsetWidth) /
							charWidth
					);

					for (let k = 0; k < columnsToFill; k++) {
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
	let [div, line] = [
		document.createElement('div'),
		document.createElement('div')
	];
	div.classList.add('square'),
		line.classList.add('line'),
		div.appendChild(line);
	return div;
}
