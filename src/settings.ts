
import * as fs from 'fs';
import * as path from 'path';

export type WindowState = 'normal' | 'maximize' | 'minimize' | 'fullScreen';

export interface IWindowPosition {
	state: WindowState,
	x: number;
	y: number;
	height: number;
	width: number;
}

/**
 * The settings form the application
 */
export interface ISettings {

	/**
	 * The position of the main windows.
	 */
	position: IWindowPosition;

	/**
	 * Settings from the frontend.
	 */
	frontend: any;
}

export interface ISettingOptions {
	path: string;
	file: string;
}

export const DEFAULT: ISettings = {
	position: {
		state: 'normal',
		x: -1,
		y: -1,
		height: 480,
		width: 600
	},
	frontend: {

	}
}

export const ENCODING: string = 'utf8';

/**
 * Load the settings.
 *
 * @param options the path- and filename
 * @return {Promise<ISettings>} Returns the settings
 */
export const loadSettings = (options: ISettingOptions): Promise<ISettings> => {
	return new Promise<ISettings>((resolve) => {
		const filename: string = path.join(options.path, options.file);
		fs.readFile(filename, ENCODING, (err, data: string) => {
			if (err) {
				return resolve(DEFAULT);
			}
			try {
				resolve(JSON.parse(data) as ISettings);
			} catch (e) {
				resolve(DEFAULT);
			}
		});
	});
};

/**
 * Save the settings
 *
 * @param options the path- and filename
 * @param settings the changed settings
 * @return {Promise<void>}
 */
export const saveSettings = (options: ISettingOptions, settings: ISettings): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const filename: string = path.join(options.path, options.file);
		fs.writeFile(filename, JSON.stringify(settings, null, 2), ENCODING, (err) => {
			if (err) {
				return reject(err);
			}
			return resolve(null);
		});
	});
};

