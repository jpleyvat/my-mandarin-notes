interface MandarinNote {
	character: string;
	meaning: string;
	pronunciation: string;
}

class Section {
	constructor(private sectionName) {
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

	createDiv() {
		return document.createElement('div');
	}

	createNote(noteData: MandarinNote[]) {
		if (noteData.length === 1) {
			// let noteBody = this.createDiv();
			// noteBody.classList.add('character-note');
			// this.sectionName.appendChild(noteBody);
			this.formatNote(noteData[0]);
		} else {
			let wordBody = this.createDiv();
			wordBody.classList.add('word-note');
			this.sectionName.appendChild(wordBody);
			for (let i = 0; i < noteData.length; i++) {
				this.formatNote(noteData[i], wordBody);
			}
		}
	}

	formatNote(noteData: MandarinNote, wordBody?: any) {
		let noteBody = this.createDiv();
		noteBody.classList.add('character-note');
		this.sectionName.appendChild(noteBody);
		let note = [
			{
				element: document.createElement('p'),
				elementClass: 'character'
			},
			{
				element: document.createTextNode(noteData.meaning),
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
	}

	appendElement(parent, text, classToAdd) {
		let div = document.createElement('div');
		div.classList.add('square');
		let line = document.createElement('div');
		line.classList.add('line');
		div.appendChild(line);
		if (text) {
			div.appendChild(text);
		}
		if (classToAdd) {
			div.classList.add(classToAdd);
		}
		parent.appendChild(div);
	}

	inserSpace() {
		this.createNote([
			{
				character: null,
				meaning: null,
				pronunciation: null
			}
		]);
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
					sections[i].style.width =
						(children[j].offsetWidth + 1).toString() +
						'px';
					sections[i].style.flexDirection = 'row';
				}
			}
		}
	}
});
