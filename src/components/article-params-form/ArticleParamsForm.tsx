import { useRef, useEffect, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	data: typeof defaultArticleState;
	onToggle: () => void;
	onSubmit: (data: typeof defaultArticleState) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLDivElement | null>(null);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);

	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);

	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor);

	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	useEffect(() => {
		if (!isOpen || !containerRef.current) return;

		const handleClick = (e: MouseEvent) => {
			const target = e.target as Node;

			if (buttonRef.current?.contains(target)) return;

			if (containerRef.current?.contains(target)) return;

			onToggle();
		};

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [isOpen, onToggle]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onSubmit({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	const handleReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		setSelectedFontSize(defaultArticleState.fontSizeOption);

		onReset();
	};

	return (
		<>
			<ArrowButton ref={buttonRef} isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, isOpen && styles['container_open'])}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						title='шрифт'
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={setSelectedFont}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={selectedFontColor}
						options={fontColors}
						onChange={setSelectedFontColor}
					/>
					<Select
						title='цвет фона'
						selected={selectedBackgroundColor}
						options={backgroundColors}
						onChange={setSelectedBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={selectedContentWidth}
						options={contentWidthArr}
						onChange={setSelectedContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
