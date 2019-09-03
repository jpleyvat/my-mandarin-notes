interface MandarinNote {
	character: string;
	meaning?: string;
	pronunciation: string;
}

class Section {
	content: any[][];
	sectionName: HTMLElement;
	keepRow: boolean = false;
	row: any;
	constructor(private spaces?: number, content?: any[][]) {
		this.sectionName =
			document.scripts[
				document.scripts.length - 1
			].parentElement;
		// Global constants
		this.content = content;
		this.row = this.createDiv();
		this.row.classList.add('row');
		this.indent();

		// Title
		let [divTitle, title] = [
			this.createDiv(['title']),
			document.createElement('h1')
		];
		title.appendChild(
			document.createTextNode(
				this.sectionName.title.toUpperCase()
			)
		),
			divTitle.appendChild(title),
			this.sectionName.appendChild(divTitle);
		this.showContent();
		this.adjustSection();
	}

	showContent() {
		for (let i = 0; i < this.content.length; i++) {
			let element = this.content[i];
			if (element[1] === 'same') this.sameRow();
			this.setRow();
			if (element[0] === 'character') {
				let note = this.createDiv(['character-note']);
				this.row.appendChild(note);
				for (let j = 2; j < element.length; j++) {
					note.appendChild(this.note(element[j], j));
				}
				note.append(this.insertSpace());
			} else if (element[0] === 'word') {
				let [note, meaning, meaningTag] = [
					this.createDiv(['word-note']),
					element[3],
					this.createDiv(['word-character-note'])
				];
				this.row.appendChild(note);
				for (let j = 2; j < element.length - 2; j++) {
					if (j != 3) {
						for (let k = 0; k < element[j].length; k++) {
							let wordCharacter = this.createDiv([
								'word-character-note'
							]);
							wordCharacter.appendChild(
								this.note(element[j][k], j)
							),
								wordCharacter.appendChild(
									this.note(element[j + 2][k], 4)
								),
								note.appendChild(wordCharacter);
						}
					}
				}
				meaningTag.appendChild(this.note(meaning, 3));
				meaningTag.appendChild(this.insertSpace());
				note.appendChild(meaningTag);
			}
		}
	}

	adjustSection() {
		let children: any = this.sectionName.childNodes;
		let maxWidth: any = this.sectionName.offsetWidth;
		// let rows: any = this.sectionName.getElementsByClassName('row')
		let [charWidth, title] = [
			this.sectionName.offsetWidth / 2,
			this.sectionName.getElementsByClassName('title')
		];
		(function loopChild(adjustment: boolean, self) {
			for (let i = 0; i < children.length; i++) {
				let missingSpaces =
					(maxWidth - children[i].offsetWidth) / charWidth;
				if (adjustment) {
					for (let k = 0; k < missingSpaces; k++) {
						if (
							!children[i].classList.contains('title')
						) {
							children[i].appendChild(
								self.insertTwoSpaces()
							);
						}
					}
				} else if (children[i].offsetWidth) {
					if (children[i].classList) {
						if (
							children[i].classList.contains('row') &&
							children[i].offsetWidth > maxWidth
						) {
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
