interface MandarinNote {
	character: string;
	meaning?: string;
	pronunciation: string;
}

class Section {
	sectionName: HTMLElement;
	keepRow: boolean = false;
	row: any;
	constructor(private spaces?: number, content?: any[][]) {
		this.sectionName =
			document.scripts[
				document.scripts.length - 1
			].parentElement;
		// Global constants
		this.row = this.createDiv();
		this.row.classList.add('row');
		this.indent();

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
		divTittle.classList.add('tittle'),
			div.classList.add('square'),
			div2.classList.add('square'),
			line.classList.add('line'),
			line2.classList.add('line');

		// Element nestings
		// div.appendChild(line),
		// 	div2.appendChild(line2),
		tittle.appendChild(
			document.createTextNode(this.sectionName.id.toUpperCase())
		),
			// divTittle.appendChild(div),
			divTittle.appendChild(tittle),
			// divTittle.appendChild(div2),
			this.sectionName.appendChild(divTittle);

		if (content) {
			for (let i = 0; i < content.length; i++) {
				if (content[i][1] === 'same') this.sameRow();
				this.setRow();
				if (content[i][0] === 'character') {
					let note = this.createDiv(['character-note']);
					this.row.appendChild(note);
					for (let j = 2; j < content[i].length; j++) {
						note.appendChild(this.note(content[i][j], j));
					}
					let space = this.createDiv(
						['square', 'space'],
						true
					);
					note.append(space);
				} else if (content[i][0] === 'word') {
					let note = this.createDiv(['word-note']);
					this.row.appendChild(note);
					let pronunciation = content[i][3];
					for (let j = 2; j < content[i].length - 2; j++) {
						if (j != 3) {
							for (
								let k = 0;
								k < content[i][j].length;
								k++
							) {
								let wordCharacter = this.createDiv([
									'word-character-note'
								]);
								wordCharacter.appendChild(
									this.note(content[i][j][k], j)
								);
								wordCharacter.appendChild(
									this.note(content[i][j + 2][k], j)
								);
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

	adjustSection() {
		let children: any = this.sectionName.childNodes;
		let maxWidth: any = this.sectionName.offsetWidth;
		let [charWidth, tittle] = [
			this.sectionName.offsetWidth / 2,
			this.sectionName.getElementsByClassName('tittle')
		];
		for (let i = 0; i < children.length; i++) {
			if (children[i].offsetWidth) {
				if (children[i].offsetWidth > maxWidth) {
					maxWidth = children[i].offsetWidth;
				}
			}
		}

		let columnsToFill = Math.ceil(maxWidth / charWidth);

		this.sectionName.style.width =
			(maxWidth + 1).toString() + 'px';
		for (let k = 0; k < columnsToFill; k++) {
			let space = this.createDiv(['square', 'space'], true);
			tittle[0].appendChild(space);
		}
	}

	note(content, typeNumber): HTMLElement {
		let type: string;
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

	sameRow() {
		this.keepRow = true;
	}

	changeDirection() {
		this.sectionName.style.flexDirection = 'row';
	}

	createDiv(classes?: string[], withLine?: boolean) {
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
			this.appendElement(
				noteBody,
				pronunciationTag,
				'pronunciation'
			);
		if (appendlist.space)
			this.appendElement(noteBody, null, 'space');
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
	insertQuarterSpace(IndentSpace?: boolean) {
		this.setRow();
		let invisible: string;
		if (IndentSpace) invisible = 'indent-space';
		else invisible = invisible = null;
		let wordBody = this.createDiv();
		this.row.appendChild(wordBody);
		wordBody.classList.add('quarter-space'),
			this.row.appendChild(wordBody),
			this.formatNote(
				'quarter-space',
				null,
				wordBody,
				[invisible],
				' '
			),
			this.formatNote(
				'quarter-space',
				null,
				wordBody,
				[invisible],
				' '
			);
	}
}

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

function pages() {
	let pagesList = document.getElementById('pages');
	let pages = document.getElementsByClassName('page');
	for (let i = pages.length; i > 0; i--) {
		let li = document.createElement('li');
		li.appendChild(
			document.createTextNode(getNumberInMandarin(i))
		);
		pagesList.appendChild(li);
		li.onclick = function() {
			showPage(i);
		};
	}
}

function showPage(page: number): any {
	let pages: any = document.getElementsByClassName('page');
	if (page) {
		for (let i = 0; i < pages.length; i++) {
			if (pages[i].id === String(page)) {
				pages[i].style.display = 'flex';
			} else {
				pages[i].style.display = 'none';
			}
		}
	}
}

function getNumberInMandarin(number: number) {
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
