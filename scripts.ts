interface MandarinNote {
	character: string;
	meaning?: string;
	pronunciation: string;
}

class Section {
	sectionName: HTMLElement;
	keepRow: boolean = false;
	row: any;
	constructor(private spaces?: number) {
		this.sectionName =
			document.scripts[
				document.scripts.length - 1
			].parentElement;
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
				document.createTextNode(
					this.sectionName.id.toUpperCase()
				)
			),
			divTittle.appendChild(div),
			divTittle.appendChild(tittle),
			divTittle.appendChild(div2),
			this.sectionName.appendChild(divTittle);
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
					let columnsToFill =
						(children[j].offsetWidth -
							sections[i].offsetWidth) /
						charWidth;

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

function prueba() {
	let request = new Request(
		// 'https://www.googleapis.com/language/translate/v2/?target=es&q=%E6%88%91&key=AIzaSyBmSLZ2bu7xgdwzz7lEVDwHikyaLXQJYNA'
		// 'https://cors-anywhere.herokuapp.com/https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=%E6%88%91&format=json'
		'https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=%E6%88%91&format=json'
	);
	fetch(request)
		.then(response => {
			return response.text();
		})
		.then(text => {
			console.log(JSON.parse(text));
		})
		.catch(error => {
			console.log(error);
		});
}
prueba();
