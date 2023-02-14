const myHtml = document.getElementsByTagName('html');
const myBody = document.getElementsByTagName('body');
const moduleName = 'no-tooltips';
let isPressed = false;
let keyCode;

function updateSettings(settings) {
	const {
		toggleKey
	} = settings;
}

class noTooltipSettings {
	static get settings() {
		return mergeObject(
			this.defaultSettings, game.settings.get(moduleName, 'settings')
		);
	}

	static get defaultSettings() {
		return {
			toggleKey: 17
		};
	}
}

Hooks.once('init', () => {
	myBody[0].classList.add('-no-tooltips');

	game.settings.register(moduleName, 'settings', {
		name: game.i18n.localize('no-tooltips.module-name'),
		scope: 'world',
		default: noTooltipSettings.defaultSettings,
		type: Object,
		config: false
	});
});

Hooks.once('ready', () => {
	updateSettings(game.settings.get(moduleName, 'settings'));

	game.settings.register(moduleName, 'toggleKey', {
		name: game.i18n.localize('no-tooltips.toggle-key.label'),
		hint: game.i18n.localize('no-tooltips.toggle-key.hint'),
		scope: 'user',
		config: true,
		default: 17,
		type: String,
		choices: {
			16: game.i18n.localize('no-tooltips.toggle-key.option.shift'),
			17: game.i18n.localize('no-tooltips.toggle-key.option.ctrl'),
			18: game.i18n.localize('no-tooltips.toggle-key.option.alt')
		}
	});
	const toggleKey = game.settings.get(moduleName, 'toggleKey');
	keyCode = toggleKey;

	console.log('%cErnie\'s No Tooltips', 'color: #ff0055;');
});

window.addEventListener('keydown', function (e) {
	if (!e.repeat) {
		if(e.keyCode == keyCode) {
			isPressed = true;
			myHtml[0].classList.add('-show-tooltips');
		}
	}
}, false);

window.addEventListener('keyup', function (e) {
	if(isPressed) {
		isPressed = false;
		myHtml[0].classList.remove('-show-tooltips');
	}
}, false);
