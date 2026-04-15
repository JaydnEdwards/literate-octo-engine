import { Plugin, parseYaml } from 'obsidian';
import { DEFAULT_SETTINGS, SampleSettingTab } from './settings';
import type { MyPluginSettings } from './settings';
import type { StatBlock } from './types';
import { mount } from 'svelte';
import StatBlockComponent from './components/StatBlock.svelte';

export default class DrakonymStatBlocks extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor('rbs', (source, el, ctx) => {
			try {
				const data = parseYaml(source) as StatBlock;
				if (!data || typeof data !== 'object') {
					el.createEl('div', { 
						text: 'Invalid YAML: Empty or invalid stat block', 
						cls: 'statblock-error' 
					});
					return;
				}
				mount(StatBlockComponent, {
					target: el,
					props: { data }
				});
			} catch (e) {
				el.createEl('div', { 
					text: 'Invalid YAML: ' + (e instanceof Error ? e.message : String(e)), 
					cls: 'statblock-error' 
				});
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
