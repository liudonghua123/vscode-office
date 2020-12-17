import * as vscode from 'vscode';
import { OfficeEditorProvider } from './provider/officeEditorProvider';
import { OfficeViewerProvider } from './provider/officeViewerProvider';
import { HtmlService } from './service/htmlService';
import { MarkdownService } from './service/markdownService';


export function activate(context: vscode.ExtensionContext) {

	require('./bundle/http').activateHttp(context)

	const viewOption = { webviewOptions: { retainContextWhenHidden: true, enableFindWidget: true } };
	const markdownService = new MarkdownService(context);
	context.subscriptions.push(
		vscode.commands.registerCommand('office.markdown.paste', () => { markdownService.loadClipboardImage() }),
		vscode.commands.registerCommand('office.html.preview', HtmlService.previewHtml),
		vscode.window.registerCustomEditorProvider("cweijan.officeViewer", new OfficeViewerProvider(context), viewOption),
		vscode.window.registerCustomEditorProvider("cweijan.htmlViewer", new OfficeViewerProvider(context), viewOption),
		vscode.window.registerCustomEditorProvider("cweijan.markdownViewer", new OfficeEditorProvider(context), viewOption)
	);

}

export function deactivate() { }